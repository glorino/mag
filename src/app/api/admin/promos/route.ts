import { NextResponse } from "next/server";
import getSql from "@/lib/database";
import { requireAdmin } from "@/lib/auth";

async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS promo_codes (
      id SERIAL PRIMARY KEY,
      code VARCHAR(50) UNIQUE NOT NULL,
      discount_percent INT NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
      min_order_amount DECIMAL(10, 2) DEFAULT 0,
      max_uses INT DEFAULT NULL,
      used_count INT DEFAULT 0,
      expires_at TIMESTAMP,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await ensureTable();
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const offset = (page - 1) * limit;

    const sql = getSql();
    const [countResult] = await sql`SELECT COUNT(*) as count FROM promo_codes`;
    const total = Number(countResult?.count || 0);
    const promos = await sql`SELECT * FROM promo_codes ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
    return NextResponse.json({ data: promos, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("Get promos error:", err);
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { code, discount_percent, min_order_amount, max_uses, expires_at } = await request.json();

    if (!code || !discount_percent) {
      return NextResponse.json({ error: "Code and discount percent are required" }, { status: 400 });
    }

    const sql = getSql();
    await ensureTable();
    const [promo] = await sql`
      INSERT INTO promo_codes (code, discount_percent, min_order_amount, max_uses, expires_at)
      VALUES (${code.toUpperCase()}, ${discount_percent}, ${min_order_amount || 0}, ${max_uses || null}, ${expires_at || null}::timestamp)
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
