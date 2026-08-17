import { NextResponse } from "next/server";
import { getUserCart, saveUserCart, clearUserCart } from "@/lib/queries";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cart = await getUserCart(authPayload.userId);
    return NextResponse.json({ success: true, items: cart });
  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items must be an array" }, { status: 400 });
    }

    await saveUserCart(authPayload.userId, items);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save cart error:", error);
    return NextResponse.json(
      { error: "Failed to save cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await clearUserCart(authPayload.userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Clear cart error:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}