import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
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

    let images: { url: string; isFeatured: boolean }[] = [];
    try {
      images = JSON.parse((formData.get("images") as string) || "[]");
    } catch {
      images = [];
    }

    if (!name || !price || !category_id) {
      return NextResponse.json({ error: "Name, price, and category are required" }, { status: 400 });
    }

    if (images.length < 4) {
      return NextResponse.json({ error: "Minimum 4 product images are required" }, { status: 400 });
    }

    const featuredImage = images.find((img) => img.isFeatured)?.url || images[0]?.url || "";

    const result = await createProduct({
      name,
      price: parseFloat(price),
      category_id: parseInt(category_id),
      description,
      sizes,
      badge,
      image_url: featuredImage,
      images,
      stock: parseInt(stock) || 0,
    });
    return NextResponse.json({ success: true, product: result[0] });
  } catch (err) {
    console.error("Create product error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to create product: ${message}` }, { status: 500 });
  }
}
