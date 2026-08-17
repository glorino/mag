import getSql from "./database";

import { products as staticProducts } from "./products";

export async function initDatabase() {
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
      payment_ref VARCHAR(255) UNIQUE,
      payment_status VARCHAR(50) DEFAULT 'pending',
      tracking_number VARCHAR(255),
      notes TEXT,
      shipping_cost DECIMAL(10, 2) DEFAULT 0,
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
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token VARCHAR(255) UNIQUE NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      used BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS carts (
      id SERIAL PRIMARY KEY,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      items JSONB NOT NULL DEFAULT '[]',
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;
}

// ─── Seed Data ─────────────────────────────────────────

export async function seedCategories() {
  const sql = getSql();
  const categories = ["Shirt", "Trouser", "Nicker"];
  const results = await Promise.all(
    categories.map((name) =>
      sql`
        INSERT INTO categories (name, slug, description, is_active, sort_order)
        VALUES (${name}, ${name.toLowerCase()}, ${name + " collection"}, true, 0)
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING id, name
      `
    )
  );
  return results.flat();
}

export async function seedProducts() {
  const sql = getSql();

  const cats = await sql`SELECT id, name FROM categories`;
  const catMap: Record<string, number> = {};
  cats.forEach((c) => {
    catMap[String(c.name)] = Number(c.id);
  });

  await sql`SELECT COUNT(*) as count FROM products`;

  await Promise.all(
    staticProducts.map((p) =>
      sql`
        INSERT INTO products (id, name, price, category_id, description, sizes, colors, badge, image_url, stock, is_active)
        VALUES (
          ${p.id},
          ${p.name},
          ${p.priceNum},
          ${catMap[p.category] || null},
          ${p.description},
          ${p.sizes},
          ${["N/A"]},
          ${p.badge || ""},
          ${p.image},
          ${50},
          true
        )
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return { count: staticProducts.length };
}

export async function seedAdmin() {
  const sql = getSql();
  const bcrypt = (await import("bcryptjs")).default;
  const password_hash = await bcrypt.hash("admin123", 12);
  await sql`
    INSERT INTO users (name, email, password_hash, phone, role, address)
    VALUES ('Admin', 'admin@magre.ng', ${password_hash}, '', 'admin', '')
    ON CONFLICT (email) DO UPDATE SET role = 'admin', password_hash = ${password_hash}
  `;
}

export async function seedCustomer() {
  const sql = getSql();
  const bcrypt = (await import("bcryptjs")).default;
  const password_hash = await bcrypt.hash("customer123", 12);
  await sql`
    INSERT INTO users (name, email, password_hash, phone, role, address)
    VALUES ('Customer', 'customer@magre.ng', ${password_hash}, '', 'user', '')
    ON CONFLICT (email) DO UPDATE SET password_hash = ${password_hash}
  `;
}

// ─── Users ─────────────────────────────────────────────

export async function findUserByEmail(email: string) {
  const sql = getSql();
  const results = await sql`SELECT * FROM users WHERE email = ${email}`;
  return results[0] || null;
}

export async function findUserById(id: number) {
  const sql = getSql();
  const results = await sql`SELECT * FROM users WHERE id = ${id}`;
  return results[0] || null;
}

export async function createUser(user: {
  name: string;
  email: string;
  password_hash: string;
  phone?: string;
}) {
  const sql = getSql();
  return sql`
    INSERT INTO users (name, email, password_hash, phone)
    VALUES (${user.name}, ${user.email}, ${user.password_hash}, ${user.phone || ""})
    RETURNING id, name, email, phone, role, address, created_at
  `;
}

export async function getAllUsers() {
  const sql = getSql();
  return sql`SELECT id, name, email, phone, role, address, created_at FROM users ORDER BY created_at DESC`;
}

export async function updateUserRole(id: number, role: string) {
  const sql = getSql();
  return sql`
    UPDATE users SET role = ${role} WHERE id = ${id}
    RETURNING id, name, email, phone, role, address, created_at
  `;
}

export async function updateUser(
  id: number,
  data: { name?: string; email?: string; phone?: string; address?: string }
) {
  const sql = getSql();
  return sql`
    UPDATE users
    SET name = COALESCE(${data.name || ""}, name),
        email = COALESCE(${data.email || ""}, email),
        phone = COALESCE(${data.phone || ""}, phone),
        address = COALESCE(${data.address || ""}, address)
    WHERE id = ${id}
    RETURNING id, name, email, phone, role, address, created_at
  `;
}

export async function updateUserPassword(id: number, password_hash: string) {
  const sql = getSql();
  return sql`
    UPDATE users SET password_hash = ${password_hash} WHERE id = ${id}
    RETURNING id, name, email
  `;
}

// ─── Categories ────────────────────────────────────────

export async function getAllCategories() {
  const sql = getSql();
  return sql`SELECT * FROM categories ORDER BY sort_order ASC, name ASC`;
}

export async function getCategoryBySlug(slug: string) {
  const sql = getSql();
  const results = await sql`SELECT * FROM categories WHERE slug = ${slug}`;
  return results[0] || null;
}

export async function createCategory(category: {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  sort_order?: number;
}) {
  const sql = getSql();
  return sql`
    INSERT INTO categories (name, slug, description, image_url, sort_order)
    VALUES (${category.name}, ${category.slug}, ${category.description || ""}, ${category.image_url || ""}, ${category.sort_order || 0})
    RETURNING *
  `;
}

export async function updateCategory(
  id: number,
  category: { name: string; slug: string; description?: string; image_url?: string; sort_order?: number }
) {
  const sql = getSql();
  return sql`
    UPDATE categories
    SET name = ${category.name}, slug = ${category.slug}, description = ${category.description || ""}, image_url = ${category.image_url || ""}, sort_order = ${category.sort_order || 0}
    WHERE id = ${id}
    RETURNING *
  `;
}

export async function deleteCategory(id: number) {
  const sql = getSql();
  return sql`DELETE FROM categories WHERE id = ${id} RETURNING *`;
}

export async function toggleCategoryActive(id: number) {
  const sql = getSql();
  return sql`
    UPDATE categories SET is_active = NOT is_active WHERE id = ${id} RETURNING *
  `;
}

// ─── Products ──────────────────────────────────────────

export async function getAllProducts() {
  const sql = getSql();
  return sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `;
}

export async function getProductById(id: number) {
  const sql = getSql();
  const results = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${id}
  `;
  return results[0] || null;
}

export async function getProductsByCategory(categoryId: number) {
  const sql = getSql();
  return sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = ${categoryId}
    ORDER BY p.created_at DESC
  `;
}

export async function createProduct(product: {
  name: string;
  price: number;
  category_id?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
  image_url?: string;
  stock?: number;
}) {
  const sql = getSql();
  return sql`
    INSERT INTO products (name, price, category_id, description, sizes, colors, badge, image_url, stock)
    VALUES (
      ${product.name},
      ${product.price},
      ${product.category_id || null},
      ${product.description || ""},
      ${product.sizes || ["S", "M", "L", "XL"]},
      ${product.colors || []},
      ${product.badge || ""},
      ${product.image_url || ""},
      ${product.stock || 0}
    )
    RETURNING *
  `;
}

export async function updateProduct(
  id: number,
  product: {
    name: string;
    price: number;
    category_id?: number;
    description?: string;
    sizes?: string[];
    colors?: string[];
    badge?: string;
    image_url?: string;
    stock?: number;
    is_active?: boolean;
  }
) {
  const sql = getSql();
  return sql`
    UPDATE products
    SET
      name = ${product.name},
      price = ${product.price},
      category_id = ${product.category_id || null},
      description = ${product.description || ""},
      sizes = ${product.sizes || ["S", "M", "L", "XL"]},
      colors = ${product.colors || []},
      badge = ${product.badge || ""},
      image_url = ${product.image_url || ""},
      stock = ${product.stock || 0},
      is_active = ${product.is_active ?? true}
    WHERE id = ${id}
    RETURNING *
  `;
}

export async function deleteProduct(id: number) {
  const sql = getSql();
  return sql`DELETE FROM products WHERE id = ${id} RETURNING *`;
}

export async function toggleProductActive(id: number) {
  const sql = getSql();
  return sql`UPDATE products SET is_active = NOT is_active WHERE id = ${id} RETURNING *`;
}

export async function searchProducts(query: string) {
  const sql = getSql();
  return sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.name ILIKE ${"%" + query + "%"} OR p.description ILIKE ${"%" + query + "%"}
    ORDER BY p.created_at DESC
  `;
}

// ─── Orders ────────────────────────────────────────────

export async function getAllOrders() {
  const sql = getSql();
  return sql`SELECT * FROM orders ORDER BY created_at DESC`;
}

export async function getOrderById(id: number) {
  const sql = getSql();
  const results = await sql`SELECT * FROM orders WHERE id = ${id}`;
  return results[0] || null;
}

export async function getOrdersByUser(userId: number) {
  const sql = getSql();
  return sql`SELECT * FROM orders WHERE user_id = ${userId} ORDER BY created_at DESC`;
}

export async function createOrder(order: {
  user_id?: number;
  customer_name: string;
  email: string;
  phone?: string;
  address: string;
  items: unknown;
  total: number;
  payment_ref?: string;
  payment_status?: string;
}) {
  const sql = getSql();
  return sql`
    INSERT INTO orders (user_id, customer_name, email, phone, address, items, total, payment_ref, payment_status)
    VALUES (
      ${order.user_id || null},
      ${order.customer_name},
      ${order.email},
      ${order.phone || ""},
      ${order.address},
      ${JSON.stringify(order.items)}::jsonb,
      ${order.total},
      ${order.payment_ref || ""},
      ${order.payment_status || "pending"}
    )
    RETURNING *
  `;
}

export async function updateOrderStatus(id: number, status: string) {
  const sql = getSql();
  return sql`
    UPDATE orders SET status = ${status}, updated_at = NOW() WHERE id = ${id} RETURNING *
  `;
}

// ─── Subscribers ───────────────────────────────────────

export async function subscribe(email: string) {
  const sql = getSql();
  return sql`
    INSERT INTO subscribers (email)
    VALUES (${email})
    ON CONFLICT (email) DO NOTHING
    RETURNING *
  `;
}

// ─── Messages ────────────────────────────────────────

export async function getAllMessages() {
  const sql = getSql();
  return sql`SELECT * FROM messages ORDER BY created_at DESC`;
}

export async function getMessageById(id: number) {
  const sql = getSql();
  const results = await sql`SELECT * FROM messages WHERE id = ${id}`;
  return results[0] || null;
}

export async function markMessageRead(id: number) {
  const sql = getSql();
  return sql`UPDATE messages SET is_read = true WHERE id = ${id} RETURNING *`;
}

export async function deleteMessage(id: number) {
  const sql = getSql();
  return sql`DELETE FROM messages WHERE id = ${id} RETURNING *`;
}

export async function getUnreadMessageCount() {
  const sql = getSql();
  const results = await sql`SELECT COUNT(*) as count FROM messages WHERE is_read = false`;
  return Number(results[0]?.count || 0);
}

// ─── Carts ────────────────────────────────────────────

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  quantity: number;
  size?: string;
}

export async function getUserCart(userId: number): Promise<CartItem[]> {
  const sql = getSql();
  const results = await sql`SELECT items FROM carts WHERE user_id = ${userId}`;
  return (results[0]?.items as CartItem[]) || [];
}

export async function saveUserCart(userId: number, items: CartItem[]): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO carts (user_id, items, updated_at)
    VALUES (${userId}, ${JSON.stringify(items)}::jsonb, NOW())
    ON CONFLICT (user_id) DO UPDATE SET items = EXCLUDED.items, updated_at = NOW()
  `;
}

export async function clearUserCart(userId: number) {
  const sql = getSql();
  await sql`DELETE FROM carts WHERE user_id = ${userId}`;
}

export async function decrementStock(items: { id: number; quantity: number }[]): Promise<void> {
  const sql = getSql();
  for (const item of items) {
    await sql`
      UPDATE products 
      SET stock = GREATEST(stock - ${item.quantity}, 0)
      WHERE id = ${item.id}
    `;
  }
}

// ─── Password Reset Tokens ────────────────────────────

export async function createPasswordResetToken(userId: number): Promise<string> {
  const sql = getSql();
  const crypto = await import("crypto");
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour

  await sql`
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (${userId}, ${token}, ${expiresAt.toISOString()})
    ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at, used = false
  `;
  return token;
}

export async function getPasswordResetToken(token: string) {
  const sql = getSql();
  const results = await sql`
    SELECT * FROM password_reset_tokens 
    WHERE token = ${token} AND used = false AND expires_at > NOW()
  `;
  return results[0] || null;
}

export async function markPasswordResetTokenUsed(token: string) {
  const sql = getSql();
  await sql`
    UPDATE password_reset_tokens SET used = true WHERE token = ${token}
  `;
}

export async function cleanExpiredPasswordResetTokens(): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM password_reset_tokens WHERE expires_at < NOW() OR used = true`;
}
