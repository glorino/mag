import { NextResponse } from "next/server";
import { findUserById, updateUser } from "@/lib/queries";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await findUserById(authPayload.userId);
    const user = users;
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Failed to get user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, phone, address } = await request.json();
    const updated = await updateUser(authPayload.userId, { name, email, phone, address });

    return NextResponse.json({
      user: {
        id: updated[0].id,
        name: updated[0].name,
        email: updated[0].email,
        phone: updated[0].phone,
        role: updated[0].role,
        address: updated[0].address,
        created_at: updated[0].created_at,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
