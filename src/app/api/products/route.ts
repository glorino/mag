import { NextResponse } from "next/server";
import { getAllProducts, getProductsByCategory, searchProducts } from "@/lib/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const q = searchParams.get("q");

    let products;
    if (q) {
      products = await searchProducts(q);
    } else if (category) {
      const catId = parseInt(category);
      if (!isNaN(catId)) {
        products = await getProductsByCategory(catId);
      } else {
        products = await getAllProducts();
      }
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
