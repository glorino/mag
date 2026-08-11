import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/queries";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, category_id, description, sizes, badge, image_url, stock } = body;
    if (!name || !price || !category_id) {
      return NextResponse.json({ error: "Name, price, and category are required" }, { status: 400 });
    }
    const result = await createProduct({
      name,
      price: parseFloat(price),
      category_id: parseInt(category_id),
      description,
      sizes,
      badge,
      image_url,
      stock: parseInt(stock) || 0,
    });
    return NextResponse.json({ success: true, product: result[0] });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
