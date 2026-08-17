import { NextResponse } from "next/server";
import { initDatabase, seedCategories, seedProducts } from "@/lib/queries";

export async function POST() {
  try {
    await initDatabase();
    await seedCategories();
    await seedProducts();
    return NextResponse.json({ success: true, message: "Database initialized with seed data" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize database", details: String(error) },
      { status: 500 }
    );
  }
}
