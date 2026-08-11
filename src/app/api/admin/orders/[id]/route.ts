import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/queries";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      await updateOrderStatus(parseInt(id), body.status);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
