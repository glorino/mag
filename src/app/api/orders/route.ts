import { NextResponse } from "next/server";
import { createOrder } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_name, email, phone, address, items, total } = body;
    if (!customer_name || !email || !address || !items || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const order = await createOrder({ customer_name, email, phone, address, items, total });
    return NextResponse.json({ success: true, order: order[0] });
  } catch {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
