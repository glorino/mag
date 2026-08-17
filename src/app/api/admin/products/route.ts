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
    const contentType = request.headers.get("content-type") || "";

    let name: string;
    let price: string;
    let category_id: string;
    let description: string;
    let sizes: string[];
    let badge: string;
    let image_url: string;
    let stock: string;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name") as string;
      price = formData.get("price") as string;
      category_id = formData.get("category_id") as string;
      description = (formData.get("description") as string) || "";
      sizes = JSON.parse((formData.get("sizes") as string) || "[]");
      badge = (formData.get("badge") as string) || "";
      stock = (formData.get("stock") as string) || "0";

      const file = formData.get("image") as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        image_url = `data:${file.type};base64,${base64}`;
      } else {
        image_url = (formData.get("image_url") as string) || "";
      }
    } else {
      const body = await request.json();
      name = body.name;
      price = body.price;
      category_id = body.category_id;
      description = body.description || "";
      sizes = body.sizes || [];
      badge = body.badge || "";
      image_url = body.image_url || "";
      stock = body.stock || "0";
    }

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
      image_url: image_url || "",
      stock: parseInt(stock) || 0,
    });
    return NextResponse.json({ success: true, product: result[0] });
  } catch (err) {
    console.error("Create product error:", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
