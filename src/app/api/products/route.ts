import { NextResponse } from "next/server";
import { getAllProducts, searchProducts, getProductsByCategory, getAllCategories } from "@/lib/queries";

interface TransformedProduct {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  badge: string | null;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  details: string[];
  category_id: number | null;
  is_active: boolean;
  stock: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const color = searchParams.get("color");

    let products;

    if (query) {
      products = await searchProducts(query);
    } else if (category && category !== "All") {
      const cats = await getAllCategories();
      const cat = cats.find((c: Record<string, unknown>) => String(c.name) === category);
      if (cat) {
        products = await getProductsByCategory(cat.id as number);
      } else {
        products = await getAllProducts();
      }
    } else {
      products = await getAllProducts();
    }

    const transformed: TransformedProduct[] = products.map((p: Record<string, unknown>) => ({
      id: p.id as number,
      name: String(p.name || ""),
      price: `₦${Number(p.price).toLocaleString()}`,
      priceNum: Number(p.price),
      category: String(p.category_name || "Uncategorized"),
      badge: p.badge ? String(p.badge) : null,
      image: String(p.image_url || ""),
      description: String(p.description || ""),
      sizes: (p.sizes as string[]) || ["S", "M", "L", "XL"],
      colors: (p.colors as string[]) || [],
      details: p.description ? [String(p.description)] : [],
      category_id: p.category_id as number | null,
      is_active: p.is_active as boolean,
      stock: p.stock as number,
    }));

    if (sort === "price-low") transformed.sort((a, b) => a.priceNum - b.priceNum);
    if (sort === "price-high") transformed.sort((a, b) => b.priceNum - a.priceNum);
    if (sort === "name") transformed.sort((a, b) => a.name.localeCompare(b.name));

    const filtered = color
      ? transformed.filter((p) => p.colors.some((c) => c.toLowerCase() === color.toLowerCase()))
      : transformed;

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([]);
  }
}
