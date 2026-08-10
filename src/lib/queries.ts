import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default sql;

export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT,
      sizes TEXT[] DEFAULT '{S,M,L,XL}',
      colors TEXT[],
      badge VARCHAR(50),
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      address TEXT NOT NULL,
      items JSONB NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

export async function getProducts(category?: string) {
  if (category) {
    return sql`SELECT * FROM products WHERE category = ${category} ORDER BY created_at DESC`;
  }
  return sql`SELECT * FROM products ORDER BY created_at DESC`;
}

export async function getProduct(id: number) {
  const results = await sql`SELECT * FROM products WHERE id = ${id}`;
  return results[0] || null;
}

export async function createOrder(order: {
  customer_name: string;
  email: string;
  phone?: string;
  address: string;
  items: unknown;
  total: number;
}) {
  return sql`
    INSERT INTO orders (customer_name, email, phone, address, items, total)
    VALUES (${order.customer_name}, ${order.email}, ${order.phone || ""}, ${order.address}, ${JSON.stringify(order.items)}::jsonb, ${order.total})
    RETURNING *
  `;
}

export async function subscribe(email: string) {
  return sql`
    INSERT INTO subscribers (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING
    RETURNING *
  `;
}
