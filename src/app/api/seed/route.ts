import { NextResponse } from "next/server";
import { initDatabase, seedCategories, seedProducts, seedAdmin, seedCustomer } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await initDatabase();
    await seedCategories();
    await seedProducts();
    await seedAdmin();
    await seedCustomer();
    return NextResponse.json({ success: true, message: "Database initialized with seed data" });
  } catch {
    return NextResponse.json(
      { error: "Failed to initialize database" },
      { status: 500 }
    );
  }
}
