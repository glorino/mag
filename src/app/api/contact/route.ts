import { NextResponse } from "next/server";
import getSql from "@/lib/database";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, type, message } = await request.json();

    if (!firstName || !lastName || !email || !type || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const sql = getSql();

    // Create messages table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        type VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO messages (first_name, last_name, email, phone, type, message)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone || ""}, ${type}, ${message})
    `;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
