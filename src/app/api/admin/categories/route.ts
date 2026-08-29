import { NextResponse } from "next/server";
import { createCategory } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";
import getSql from "@/lib/database";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const offset = (page - 1) * limit;

    const sql = getSql();
    const [countResult] = await sql`SELECT COUNT(*) as count FROM categories`;
    const total = Number(countResult?.count || 0);
    const data = await sql`SELECT * FROM categories ORDER BY sort_order ASC, name ASC LIMIT ${limit} OFFSET ${offset}`;
    return NextResponse.json({ data, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const { name, description, image_url } = body;
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const result = await createCategory({
      name,
      slug,
      description,
      image_url,
      sort_order: 999,
    });
    return NextResponse.json({ success: true, category: result[0] });
  } catch {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
