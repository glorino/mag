import { NextResponse } from "next/server";
import { getOrdersByUser } from "@/lib/queries";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const authPayload = await getUserFromRequest(request);
    if (!authPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getOrdersByUser(authPayload.userId);
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
