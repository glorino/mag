import { NextResponse } from "next/server";
import { updateCategory, deleteCategory, toggleCategoryActive } from "@/lib/queries";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const categoryId = parseInt(id);

    if (body.is_active !== undefined) {
      await toggleCategoryActive(categoryId);
      return NextResponse.json({ success: true });
    }

    if (body.name) {
      const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      await updateCategory(categoryId, {
        name: body.name,
        slug,
        description: body.description || "",
        image_url: body.image_url || "",
        sort_order: body.sort_order || 0,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteCategory(parseInt(id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
