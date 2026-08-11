import { NextResponse } from "next/server";
import { updateUserRole } from "@/lib/queries";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.role) {
      await updateUserRole(parseInt(id), body.role);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
