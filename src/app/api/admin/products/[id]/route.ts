import { NextResponse } from "next/server";
import { updateProduct, deleteProduct, toggleProductActive } from "@/lib/queries";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const productId = parseInt(id);

    if (body.is_active !== undefined) {
      await toggleProductActive(productId);
      return NextResponse.json({ success: true });
    }

    if (body.name !== undefined && body.price !== undefined) {
      await updateProduct(productId, {
        name: body.name,
        price: parseFloat(body.price),
        category_id: body.category_id ? parseInt(body.category_id) : undefined,
        description: body.description,
        sizes: body.sizes,
        badge: body.badge,
        image_url: body.image_url,
        stock: body.stock !== undefined ? parseInt(body.stock) : undefined,
        is_active: body.is_active,
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProduct(parseInt(id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
