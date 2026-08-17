import { NextRequest, NextResponse } from "next/server";
import { createOrder, decrementStock, getProductById } from "@/lib/queries";
import getSql from "@/lib/database";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const encryptionKey = process.env.FLW_ENCRYPTION_KEY;

    const signature = request.headers.get("verif-hash");
    if (!signature || !encryptionKey) {
      return NextResponse.json({ error: "Missing webhook signature or encryption key" }, { status: 400 });
    }
    const hash = crypto.createHmac("sha512", encryptionKey).update(JSON.stringify(body)).digest("hex");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (body.event !== "charge.completed") {
      return NextResponse.json({ received: true });
    }

    const txData = body.data;
    if (!txData || txData.status !== "successful") {
      return NextResponse.json({ received: true });
    }

    const transactionId = txData.id?.toString() || txData.flw_ref;

    // Check for duplicate order
    const sql = getSql();
    const existing = await sql`SELECT id FROM orders WHERE payment_ref = ${transactionId} LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({ received: true, orderId: existing[0].id });
    }

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
      console.warn(`Webhook price mismatch: expected ${validatedTotal}, got ${txData.amount} for tx ${transactionId}`);
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

    return NextResponse.json({ received: true, orderId: order[0].id });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
