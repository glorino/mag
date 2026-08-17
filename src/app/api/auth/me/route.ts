import { NextResponse } from "next/server";
import { findUserById, updateUser, updateUserPassword } from "@/lib/queries";
import { getUserFromRequest, comparePassword, hashPassword } from "@/lib/auth";

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
      success: true,
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
      success: true,
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

export async function PATCH(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    const user = await findUserById(authPayload.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await comparePassword(currentPassword, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const password_hash = await hashPassword(newPassword);
    await updateUserPassword(authPayload.userId, password_hash);

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
