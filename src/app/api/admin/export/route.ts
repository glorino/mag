import { NextRequest, NextResponse } from "next/server";
import getSql from "@/lib/database";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "orders";

    if (type === "orders") {
      const orders = await sql`
        SELECT id, customer_name, email, phone, address, items, total, status, payment_status, created_at
        FROM orders ORDER BY created_at DESC
      `;
      const csv = [
        "Order ID,Customer Name,Email,Phone,Address,Items,Total,Status,Payment Status,Date",
        ...orders.map((o: Record<string, unknown>) =>
          `"${o.id}","${(o.customer_name as string || "").replace(/"/g, '""')}","${(o.email as string || "").replace(/"/g, '""')}","${(o.phone as string || "").replace(/"/g, '""')}","${(o.address as string || "").replace(/"/g, '""')}","${JSON.stringify(o.items).replace(/"/g, '""')}",${o.total},"${o.status}","${o.payment_status || ""}","${o.created_at}"`
        ),
      ].join("\n");
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="magre-orders-${new Date().toISOString().slice(0, 10)}.csv"` },
      });
    }

    if (type === "products") {
      const products = await sql`
        SELECT p.id, p.name, p.price, c.name AS category, p.stock, p.is_active, p.created_at
        FROM products p LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.created_at DESC
      `;
      const csv = [
        "Product ID,Name,Price,Category,Stock,Status,Date Created",
        ...products.map((p: Record<string, unknown>) =>
          `"${p.id}","${(p.name as string || "").replace(/"/g, '""')}",${p.price},"${(p.category as string || "").replace(/"/g, '""')}",${p.stock ?? 0},${p.is_active ? "Active" : "Inactive"},"${p.created_at}"`
        ),
      ].join("\n");
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="magre-products-${new Date().toISOString().slice(0, 10)}.csv"` },
      });
    }

    if (type === "users") {
      const users = await sql`
        SELECT id, name, email, phone, role, created_at
        FROM users ORDER BY created_at DESC
      `;
      const csv = [
        "User ID,Name,Email,Phone,Role,Date Joined",
        ...users.map((u: Record<string, unknown>) =>
          `"${u.id}","${(u.name as string || "").replace(/"/g, '""')}","${(u.email as string || "").replace(/"/g, '""')}","${(u.phone as string || "").replace(/"/g, '""')}","${u.role}","${u.created_at}"`
        ),
      ].join("\n");
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="magre-users-${new Date().toISOString().slice(0, 10)}.csv"` },
      });
    }

    if (type === "report") {
      const totalOrders = await sql`SELECT COUNT(*)::int AS count FROM orders`;
      const totalRevenue = await sql`SELECT COALESCE(SUM(total), 0)::numeric AS total FROM orders`;
      const totalProducts = await sql`SELECT COUNT(*)::int AS count FROM products`;
      const totalUsers = await sql`SELECT COUNT(*)::int AS count FROM users`;
      const ordersByStatus = await sql`SELECT status, COUNT(*)::int AS count FROM orders GROUP BY status`;
      const topProducts = await sql`
        SELECT p.name, COUNT(o.id)::int AS order_count, COALESCE(SUM(o.total), 0)::numeric AS revenue
        FROM products p LEFT JOIN orders o ON o.items::text ILIKE '%' || p.name || '%'
        GROUP BY p.name ORDER BY revenue DESC LIMIT 10
      `;
      const monthlyRevenue = await sql`
        SELECT TO_CHAR(created_at, 'YYYY-MM') AS month, COUNT(*)::int AS orders, COALESCE(SUM(total), 0)::numeric AS revenue
        FROM orders WHERE created_at >= NOW() - INTERVAL '12 months'
        GROUP BY month ORDER BY month ASC
      `;

      const csv = [
        "MAGRE Business Report",
        `Generated: ${new Date().toLocaleDateString("en-NG")}`,
        "",
        "Summary",
        `Total Orders,${totalOrders[0]?.count ?? 0}`,
        `Total Revenue,₦${Number(totalRevenue[0]?.total ?? 0).toLocaleString()}`,
        `Total Products,${totalProducts[0]?.count ?? 0}`,
        `Total Users,${totalUsers[0]?.count ?? 0}`,
        "",
        "Orders by Status",
        "Status,Count",
        ...ordersByStatus.map((s: Record<string, unknown>) => `"${s.status}",${s.count}`),
        "",
        "Top Products",
        "Product,Orders,Revenue",
        ...topProducts.map((p: Record<string, unknown>) => `"${(p.name as string || "").replace(/"/g, '""')}",${p.order_count},"₦${Number(p.revenue).toLocaleString()}"`),
        "",
        "Monthly Revenue",
        "Month,Orders,Revenue",
        ...monthlyRevenue.map((m: Record<string, unknown>) => `"${m.month}",${m.orders},"₦${Number(m.revenue).toLocaleString()}"`),
      ].join("\n");
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": `attachment; filename="magre-report-${new Date().toISOString().slice(0, 10)}.csv"` },
      });
    }

    return NextResponse.json({ error: "Invalid export type" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
