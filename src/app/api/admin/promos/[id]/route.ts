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

    if (body.is_active !== undefined) {
      await sql`UPDATE promo_codes SET is_active = ${body.is_active} WHERE id = ${parseInt(id)}`;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Update promo error:", err);
    return NextResponse.json({ error: `Failed to update promo: ${message}` }, { status: 500 });
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
    await sql`DELETE FROM promo_codes WHERE id = ${parseInt(id)}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Delete promo error:", err);
    return NextResponse.json({ error: `Failed to delete promo: ${message}` }, { status: 500 });
  }
}
