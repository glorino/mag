import { NextResponse } from "next/server";
import { getAllOrders } from "@/lib/queries";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([]);
  }
}
