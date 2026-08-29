import { NextResponse } from "next/server";
import { markMessageRead, deleteMessage } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";
import getSql from "@/lib/database";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const offset = (page - 1) * limit;

    const sql = getSql();
    const [countResult] = await sql`SELECT COUNT(*) as count FROM messages`;
    const total = Number(countResult?.count || 0);
    const data = await sql`SELECT * FROM messages ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
    return NextResponse.json({ data, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 });
  }
}

export async function PUT(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    await markMessageRead(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    await deleteMessage(Number(id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
