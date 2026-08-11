import { NextResponse } from "next/server";
import getSql from "@/lib/database";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const sql = getSql();

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(20) DEFAULT 'user',
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category_id INT REFERENCES categories(id) ON DELETE SET NULL,
        description TEXT,
        sizes TEXT[] DEFAULT '{S,M,L,XL}',
        colors TEXT[],
        badge VARCHAR(50),
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        stock INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE SET NULL,
        customer_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        address TEXT NOT NULL,
        items JSONB NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_ref VARCHAR(255),
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    const bcrypt = await import("bcryptjs");
    const adminHash = await bcrypt.hash("admin123", 12);

    await sql`
      INSERT INTO users (name, email, password_hash, phone, role)
      VALUES ('Admin', 'admin@magre.ng', ${adminHash}, '08184118997', 'admin')
      ON CONFLICT (email) DO NOTHING
    `;

    await sql`
      INSERT INTO categories (name, slug, description, sort_order)
      VALUES ('Shirt', 'shirt', 'Elegant tops & blouses', 1)
      ON CONFLICT (name) DO NOTHING
    `;
    await sql`
      INSERT INTO categories (name, slug, description, sort_order)
      VALUES ('Trouser', 'trouser', 'Stylish bottoms', 2)
      ON CONFLICT (name) DO NOTHING
    `;
    await sql`
      INSERT INTO categories (name, slug, description, sort_order)
      VALUES ('Nicker', 'nicker', 'Comfortable undergarments', 3)
      ON CONFLICT (name) DO NOTHING
    `;

    return NextResponse.json({ success: true, message: "Database initialized" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
