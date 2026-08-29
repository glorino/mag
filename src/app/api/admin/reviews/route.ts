import { NextResponse } from "next/server";
import getSql from "@/lib/database";
import { requireAdmin } from "@/lib/auth";

async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      user_id INT REFERENCES users(id) ON DELETE SET NULL,
      customer_name VARCHAR(255) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      is_approved BOOLEAN DEFAULT false,
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
    const [countResult] = await sql`SELECT COUNT(*) as count FROM reviews`;
    const total = Number(countResult?.count || 0);
    const reviews = await sql`
      SELECT r.*, p.name as product_name
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      ORDER BY r.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return NextResponse.json({ data: reviews, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("Get reviews error:", err);
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 }, { status: 500 });
  }
}
