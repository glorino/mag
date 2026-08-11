import { NextResponse } from "next/server";
import getSql from "@/lib/database";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getSql();

    const totalProducts = await sql`SELECT COUNT(*)::int AS count FROM products`;
    const totalOrders = await sql`SELECT COUNT(*)::int AS count FROM orders`;
    const totalRevenue = await sql`SELECT COALESCE(SUM(total), 0)::numeric AS total FROM orders`;
    const totalUsers = await sql`SELECT COUNT(*)::int AS count FROM users`;
    const activeProducts = await sql`SELECT COUNT(*)::int AS count FROM products WHERE is_active = true`;

    const ordersByStatus = await sql`
      SELECT status, COUNT(*)::int AS count FROM orders GROUP BY status ORDER BY count DESC
    `;

    const recentOrders = await sql`
      SELECT id, customer_name, email, total, status, created_at
      FROM orders ORDER BY created_at DESC LIMIT 10
    `;

    const topProducts = await sql`
      SELECT p.name, COUNT(o.id)::int AS order_count, COALESCE(SUM(o.total), 0)::numeric AS revenue
      FROM products p
      LEFT JOIN orders o ON o.items::text ILIKE '%' || p.name || '%'
      GROUP BY p.name
      ORDER BY revenue DESC
      LIMIT 5
    `;

    const ordersPerDay = await sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM-DD') AS date,
        COUNT(*)::int AS count,
        COALESCE(SUM(total), 0)::numeric AS revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY date
      ORDER BY date ASC
    `;

    const revenuePerMonth = await sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM') AS month,
        COUNT(*)::int AS orders,
        COALESCE(SUM(total), 0)::numeric AS revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY month
      ORDER BY month ASC
    `;

    const categoryPerformance = await sql`
      SELECT c.name AS category, COUNT(p.id)::int AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.name
      ORDER BY product_count DESC
    `;

    return NextResponse.json({
      totalProducts: totalProducts[0]?.count ?? 0,
      activeProducts: activeProducts[0]?.count ?? 0,
      totalOrders: totalOrders[0]?.count ?? 0,
      totalRevenue: Number(totalRevenue[0]?.total ?? 0),
      totalUsers: totalUsers[0]?.count ?? 0,
      ordersByStatus,
      recentOrders,
      topProducts,
      ordersPerDay,
      revenuePerMonth,
      categoryPerformance,
    });
  } catch {
    return NextResponse.json({
      totalProducts: 0,
      activeProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalUsers: 0,
      ordersByStatus: [],
      recentOrders: [],
      topProducts: [],
      ordersPerDay: [],
      revenuePerMonth: [],
      categoryPerformance: [],
    });
  }
}
