import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Orders must be created through payment verification" }, { status: 403 });
}
