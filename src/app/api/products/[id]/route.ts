import { NextResponse } from "next/server";
import { getProductById, getAllProducts } from "@/lib/queries";

interface RelatedProduct {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  badge: string | null;
  image: string;
  description: string;
  sizes: string[];
  details: string[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductById(Number(id));
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const allProducts = await getAllProducts();
    const related: RelatedProduct[] = allProducts
      .filter(
        (p: Record<string, unknown>) =>
          p.category_id === product.category_id && p.id !== product.id
      )
      .slice(0, 4)
      .map((p: Record<string, unknown>) => ({
        id: p.id as number,
        name: String(p.name || ""),
        price: `₦${Number(p.price).toLocaleString()}`,
        priceNum: Number(p.price),
        category: String(p.category_name || "Uncategorized"),
        badge: p.badge ? String(p.badge) : null,
        image: String(p.image_url || ""),
        description: String(p.description || ""),
        sizes: (p.sizes as string[]) || ["S", "M", "L", "XL"],
        details: p.description ? [String(p.description)] : [],
      }));

    return NextResponse.json({
      id: product.id,
      name: String(product.name || ""),
      price: `₦${Number(product.price).toLocaleString()}`,
      priceNum: Number(product.price),
      category: String(product.category_name || "Uncategorized"),
      badge: product.badge ? String(product.badge) : null,
      image: String(product.image_url || ""),
      description: String(product.description || ""),
      sizes: (product.sizes as string[]) || ["S", "M", "L", "XL"],
      details: product.description ? [String(product.description)] : [],
      related,
    });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}
