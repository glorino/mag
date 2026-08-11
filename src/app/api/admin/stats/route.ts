import { NextResponse } from "next/server";
import getSql from "@/lib/database";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sql = getSql();

    const productsResult = await sql`SELECT COUNT(*)::int AS count FROM products`;
    const ordersResult = await sql`SELECT COUNT(*)::int AS count FROM orders`;
    const revenueResult = await sql`SELECT COALESCE(SUM(total), 0)::numeric AS total FROM orders`;
    const usersResult = await sql`SELECT COUNT(*)::int AS count FROM users`;

    const recentOrders = await sql`
      SELECT id, customer_name, email, total, status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 5
    `;

    return NextResponse.json({
      totalProducts: productsResult[0]?.count ?? 0,
      totalOrders: ordersResult[0]?.count ?? 0,
      totalRevenue: Number(revenueResult[0]?.total ?? 0),
      totalUsers: usersResult[0]?.count ?? 0,
      recentOrders,
    });
  } catch {
    return NextResponse.json({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalUsers: 0,
      recentOrders: [],
    });
  }
}
