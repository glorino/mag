import { NextRequest, NextResponse } from "next/server";
import { createProduct } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";
import getSql from "@/lib/database";

async function ensureSchema() {
  const sql = getSql();
  await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'`;
}

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const offset = (page - 1) * limit;

    const sql = getSql();
    const [countResult] = await sql`SELECT COUNT(*) as count FROM products`;
    const total = Number(countResult?.count || 0);
    const data = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return NextResponse.json({ data, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await ensureSchema();
    const formData = await request.formData();
    const name = (formData.get("name") as string) || "";
    const price = (formData.get("price") as string) || "";
    const category_id = (formData.get("category_id") as string) || "";
    const description = (formData.get("description") as string) || "";
    const badge = (formData.get("badge") as string) || "";
    const stock = (formData.get("stock") as string) || "0";
    const image_url = (formData.get("image_url") as string) || "";

    let sizes: string[] = [];
    try {
      sizes = JSON.parse((formData.get("sizes") as string) || "[]");
    } catch {
      sizes = [];
    }

    let colors: string[] = [];
    try {
      colors = JSON.parse((formData.get("colors") as string) || "[]");
    } catch {
      colors = [];
    }

    let images: { url: string; isFeatured: boolean }[] = [];
    try {
      images = JSON.parse((formData.get("images") as string) || "[]");
    } catch {
      images = [];
    }

    if (!name || !price || !category_id) {
      return NextResponse.json({ error: "Name, price, and category are required" }, { status: 400 });
    }

    const featuredImage = images.find((img) => img.isFeatured)?.url || images[0]?.url || image_url || "";

    const result = await createProduct({
      name,
      price: parseFloat(price),
      category_id: parseInt(category_id),
      description,
      sizes,
      colors,
      badge,
      image_url: featuredImage,
      images,
      stock: parseInt(stock) || 0,
    });
    return NextResponse.json({ success: true, product: result[0] });
  } catch (err) {
    console.error("Create product error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
