import { NextRequest, NextResponse } from "next/server";
import { updateProduct, deleteProduct, toggleProductActive } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const name = formData.get("name") as string;
      const price = formData.get("price") as string;

      if (name !== undefined && price !== undefined) {
        const file = formData.get("image") as File | null;
        let image_url = (formData.get("image_url") as string) || "";
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const base64 = buffer.toString("base64");
          image_url = `data:${file.type};base64,${base64}`;
        }

        await updateProduct(productId, {
          name,
          price: parseFloat(price),
          category_id: formData.get("category_id") ? parseInt(formData.get("category_id") as string) : undefined,
          description: (formData.get("description") as string) || "",
          sizes: JSON.parse((formData.get("sizes") as string) || "[]"),
          badge: (formData.get("badge") as string) || "",
          image_url,
          stock: formData.get("stock") !== undefined ? parseInt(formData.get("stock") as string) : undefined,
        });
        return NextResponse.json({ success: true });
      }
    }

    const body = await request.json();

    if (body.is_active !== undefined && body.name === undefined) {
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
  } catch (err) {
    console.error("Update product error:", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await deleteProduct(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
