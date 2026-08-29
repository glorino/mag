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

    if (body.code !== undefined || body.discount_percent !== undefined) {
      await sql`
        UPDATE promo_codes SET
          code = COALESCE(${body.code || ""}, code),
          discount_percent = COALESCE(${body.discount_percent}, discount_percent),
          min_order_amount = COALESCE(${body.min_order_amount}, min_order_amount),
          max_uses = ${body.max_uses || null},
          expires_at = ${body.expires_at || null}::timestamp
        WHERE id = ${parseInt(id)}
      `;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  } catch {
    console.error("Update promo error:");
    return NextResponse.json({ error: "Failed to update promo" }, { status: 500 });
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
  } catch {
    console.error("Delete promo error:");
    return NextResponse.json({ error: "Failed to delete promo" }, { status: 500 });
  }
}
