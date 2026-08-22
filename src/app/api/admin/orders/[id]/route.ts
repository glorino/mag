import { NextResponse } from "next/server";
import { updateOrderStatus, updateOrderTracking } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      await updateOrderStatus(parseInt(id), body.status);
    }

    if (body.tracking_number !== undefined) {
      await updateOrderTracking(parseInt(id), body.tracking_number);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
