import { NextResponse } from "next/server";
import getSql from "@/lib/database";

export async function GET() {
  try {
    const sql = getSql();
    const promos = await sql`SELECT * FROM promo_codes ORDER BY created_at DESC`;
    return NextResponse.json(promos);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { code, discount_percent, min_order_amount, max_uses, expires_at } = await request.json();

    if (!code || !discount_percent) {
      return NextResponse.json({ error: "Code and discount percent are required" }, { status: 400 });
    }

    const sql = getSql();
    const [promo] = await sql`
      INSERT INTO promo_codes (code, discount_percent, min_order_amount, max_uses, expires_at)
      VALUES (${code.toUpperCase()}, ${discount_percent}, ${min_order_amount || 0}, ${max_uses || null}, ${expires_at || null})
      ON CONFLICT (code) DO UPDATE SET
        discount_percent = EXCLUDED.discount_percent,
        min_order_amount = EXCLUDED.min_order_amount,
        max_uses = EXCLUDED.max_uses,
        expires_at = EXCLUDED.expires_at,
        is_active = true
      RETURNING *
    `;

    return NextResponse.json(promo, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create promo code" }, { status: 500 });
  }
}
