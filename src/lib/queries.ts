import getSql from "./database";

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
