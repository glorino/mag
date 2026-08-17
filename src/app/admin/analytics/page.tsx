"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Analytics {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  ordersByStatus: { status: string; count: number }[];
  recentOrders: { id: number; customer_name: string; email: string; total: number; status: string; created_at: string }[];
  topProducts: { name: string; order_count: number; revenue: number }[];
  ordersPerDay: { date: string; count: number; revenue: number }[];
  revenuePerMonth: { month: string; orders: number; revenue: number }[];
  categoryPerformance: { category: string; product_count: number }[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    fetch("/api/admin/analytics", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token, period]);

  const handleExport = (type: string) => {
    window.open(`/api/admin/export?type=${type}`, "_blank");
  };

  const conversionRate = data && data.totalUsers > 0
    ? ((data.totalOrders / data.totalUsers) * 100).toFixed(1)
    : "0";

  const avgOrderValue = data && data.totalOrders > 0
    ? (data.totalRevenue / data.totalOrders).toFixed(0)
    : "0";

  const maxRevenue = data ? Math.max(...data.revenuePerMonth.map((m) => Number(m.revenue)), 1) : 1;
  const maxDailyOrders = data ? Math.max(...data.ordersPerDay.map((d) => d.count), 1) : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-white/40 text-sm mt-1">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport("report")} className="px-4 py-2.5 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export Report
          </button>
          <button onClick={() => handleExport("orders")} className="px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-24 mb-4" />
              <div className="h-8 bg-white/5 rounded w-16" />
            </div>
          ))
          : [
            { label: "Total Revenue", value: `₦${(data?.totalRevenue ?? 0).toLocaleString()}`, change: "+12%", icon: "💰" },
            { label: "Total Orders", value: data?.totalOrders ?? 0, change: "+8%", icon: "📋" },
            { label: "Avg Order Value", value: `₦${Number(avgOrderValue).toLocaleString()}`, change: "+5%", icon: "📊" },
            { label: "Conversion Rate", value: `${conversionRate}%`, change: "+2%", icon: "🎯" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/40 text-sm font-medium">{card.label}</span>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-green-400 mt-2">{card.change} this month</p>
            </motion.div>
          ))}
      </div>

      {/* Revenue Chart + Status Breakdown */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
            <div className="flex gap-1">
              {(["week", "month", "year"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors capitalize ${
                    period === p ? "bg-accent text-black" : "text-white/40 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-8 bg-white/5 rounded animate-pulse" />
              ))
            ) : data?.revenuePerMonth.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-8">No revenue data yet</p>
            ) : (
              data?.revenuePerMonth.map((month) => (
                <div key={month.month} className="flex items-center gap-4">
                  <span className="text-xs text-white/40 w-16 shrink-0">{month.month}</span>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(Number(month.revenue) / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-lg"
                    />
                    <span className="absolute inset-0 flex items-center px-3 text-xs font-medium text-white">
                      ₦{Number(month.revenue).toLocaleString()} ({month.orders} orders)
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Order Status</h2>
          <div className="space-y-4">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-10 bg-white/5 rounded animate-pulse" />
              ))
            ) : data?.ordersByStatus.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-8">No orders yet</p>
            ) : (
              data?.ordersByStatus.map((s) => {
                const total = data.ordersByStatus.reduce((acc, curr) => acc + curr.count, 0);
                const pct = total > 0 ? ((s.count / total) * 100).toFixed(0) : 0;
                return (
                  <div key={s.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border capitalize ${statusColors[s.status] || "bg-white/10 text-white/60 border-white/10"}`}>
                        {s.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-white/60">{s.count}</span>
                      <span className="text-xs text-white/30 w-10 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Daily Orders Chart + Top Products + Categories */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Daily Orders */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Orders (Last 30 Days)</h2>
          <div className="flex items-end gap-1 h-40">
            {loading ? (
              Array(30).fill(0).map((_, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-t animate-pulse h-full" />
              ))
            ) : data?.ordersPerDay.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-8 w-full">No order data yet</p>
            ) : (
              data?.ordersPerDay.map((day) => (
                <div key={day.date} className="flex-1 group relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.count / maxDailyOrders) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-accent/80 hover:bg-accent rounded-t transition-colors cursor-pointer min-h-[4px]"
                  />
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black border border-white/20 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap z-10">
                    {day.date}: {day.count} orders
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Top Products</h2>
          <div className="space-y-4">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-12 bg-white/5 rounded animate-pulse" />
              ))
            ) : data?.topProducts.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-8">No product data yet</p>
            ) : (
              data?.topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xs text-white/30 w-5">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{p.name}</p>
                    <p className="text-xs text-white/40">{p.order_count} orders</p>
                  </div>
                  <span className="text-sm text-accent font-semibold shrink-0">₦{Number(p.revenue).toLocaleString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Category Performance + Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Category Performance */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Categories</h2>
            <button onClick={() => handleExport("products")} className="text-xs text-accent hover:text-accent-dark transition-colors">
              Export Products
            </button>
          </div>
          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-10 bg-white/5 rounded animate-pulse" />
              ))
            ) : data?.categoryPerformance.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-8">No categories yet</p>
            ) : (
              data?.categoryPerformance.map((cat) => {
                const maxCount = Math.max(...data.categoryPerformance.map((c) => c.product_count), 1);
                return (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">{cat.category}</span>
                      <span className="text-xs text-white/40">{cat.product_count} products</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(cat.product_count / maxCount) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <button onClick={() => handleExport("orders")} className="text-xs text-accent hover:text-accent-dark transition-colors">
              Export Orders
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-12 bg-white/5 rounded animate-pulse" />
              ))
            ) : data?.recentOrders.length === 0 ? (
              <p className="text-white/30 text-sm text-center py-8">No orders yet</p>
            ) : (
              data?.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm text-white font-medium">#{order.id} - {order.customer_name}</p>
                    <p className="text-xs text-white/40">{new Date(order.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-accent font-semibold">₦{Number(order.total).toLocaleString()}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${statusColors[order.status] || "bg-white/10 text-white/60 border-white/10"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
