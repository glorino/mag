import { NextRequest, NextResponse } from "next/server";
import { createOrder, decrementStock } from "@/lib/queries";
import getSql from "@/lib/database";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const secret = process.env.FLWSECK;
    const encryptionKey = process.env.FLW_ENCRYPTION_KEY;

    // Verify webhook signature using encryption key (Flutterwave uses encryption key for webhook hash)
    const signature = request.headers.get("verif-hash");
    if (signature && encryptionKey) {
      const hash = crypto.createHmac("sha512", encryptionKey).update(JSON.stringify(body)).digest("hex");
      if (hash !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
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

    const order = await createOrder({
      user_id: userId,
      customer_name: txData.customer?.name || "",
      email: txData.customer?.email || "",
      phone: txData.customer?.phonenumber || "",
      address,
      items,
      total: txData.amount,
      payment_ref: transactionId,
      payment_status: "paid",
    });

    // Decrement stock
    await decrementStock(items.map((item: any) => ({ id: item.id, quantity: item.quantity })));

    return NextResponse.json({ received: true, orderId: order[0].id });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
