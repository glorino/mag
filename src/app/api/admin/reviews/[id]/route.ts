import { NextRequest, NextResponse } from "next/server";
import getSql from "@/lib/database";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const sql = getSql();

    if (body.is_approved !== undefined) {
      await sql`UPDATE reviews SET is_approved = ${body.is_approved} WHERE id = ${parseInt(id)}`;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Update review error:", err);
    return NextResponse.json({ error: `Failed to update review: ${message}` }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const sql = getSql();
    await sql`DELETE FROM reviews WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Delete review error:", err);
    return NextResponse.json({ error: `Failed to delete review: ${message}` }, { status: 500 });
  }
}
