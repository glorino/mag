import { NextRequest, NextResponse } from "next/server";
import { createOrder, decrementStock, getProductById } from "@/lib/queries";
import getSql from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get("transaction_id");

    if (!transactionId) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    const flutterwaveSecret = process.env.FLWSECK;
    if (!flutterwaveSecret) {
      return NextResponse.json({ error: "Payment system not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${flutterwaveSecret}`,
        },
      }
    );

    const data = await response.json();

    if (data.status !== "success" || data.data.status !== "successful") {
      return NextResponse.json({
        success: false,
        message: "Payment not successful",
        status: data.data?.status || "failed",
      });
    }

    const txData = data.data;

    // Check for duplicate order using payment_ref
    const sql = getSql();
    const existing = await sql`SELECT id FROM orders WHERE payment_ref = ${transactionId} LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        orderId: existing[0].id,
        message: "Order already exists",
      });
    }

    // Parse items from meta
    let items = [];
    let address = "";
    let userId: number | undefined;
    try {
      items = JSON.parse(txData.meta?.items || "[]");
      address = txData.meta?.address || "";
      const uid = txData.meta?.user_id;
      if (uid) userId = parseInt(uid);
    } catch {
      items = [];
    }

    // Re-validate item prices from database
    let validatedTotal = 0;
    const validatedItems = [];
    for (const item of items) {
      const product = await getProductById(item.id);
      if (product) {
        const qty = item.quantity || 1;
        validatedTotal += Number(product.price) * qty;
        validatedItems.push({
          ...item,
          price: Number(product.price),
        });
      } else {
        validatedItems.push(item);
      }
    }

    if (validatedTotal > 0 && validatedTotal !== txData.amount) {
      console.warn(`Verify price mismatch: expected ${validatedTotal}, got ${txData.amount} for tx ${transactionId}`);
    }

    const order = await createOrder({
      user_id: userId,
      customer_name: txData.customer?.name || "",
      email: txData.customer?.email || "",
      phone: txData.customer?.phonenumber || "",
      address,
      items: validatedItems,
      total: txData.amount,
      payment_ref: transactionId,
      payment_status: "paid",
    });

    // Decrement stock
    interface StockItem { id: number; quantity: number; }
    await decrementStock(items.map((item: StockItem) => ({ id: item.id, quantity: item.quantity })));

    return NextResponse.json({
      success: true,
      orderId: order[0].id,
      order: order[0],
    });
  } catch {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
