import { NextResponse } from "next/server";
import { subscribe } from "@/lib/queries";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await subscribe(email);
    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
