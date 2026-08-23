import { NextResponse } from "next/server";
import { getOrderByIdAndEmail } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const { orderId, email } = await request.json();
    if (!orderId || !email) {
      return NextResponse.json({ error: "Order ID and email are required" }, { status: 400 });
    }

    const order = await getOrderByIdAndEmail(parseInt(orderId), email);
    if (!order) {
      return NextResponse.json({ error: "Order not found. Please check your Order ID and email." }, { status: 404 });
    }

    return NextResponse.json({
      id: order.id,
      customer_name: order.customer_name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      items: order.items,
      total: order.total,
      status: order.status,
      payment_status: order.payment_status,
      tracking_number: order.tracking_number,
      created_at: order.created_at,
      updated_at: order.updated_at,
    });
  } catch {
    return NextResponse.json({ error: "Failed to track order" }, { status: 500 });
  }
}
