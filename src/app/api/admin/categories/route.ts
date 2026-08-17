import { NextResponse } from "next/server";
import { getAllCategories, createCategory } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json([]);
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
