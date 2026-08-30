"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: {
    id: number;
    customer_name: string;
    email: string;
    total: number;
    status: string;
    created_at: string;
  }[];
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    fetch("/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Revenue", value: `₦${(stats?.totalRevenue ?? 0).toLocaleString()}`, icon: "💰", color: "from-green-500/20 to-green-500/5", change: "+12% this month" },
        { label: "Total Orders", value: stats?.totalOrders ?? 0, icon: "📋", color: "from-blue-500/20 to-blue-500/5", change: "+8% this month" },
        { label: "Total Products", value: stats?.totalProducts ?? 0, icon: "📦", color: "from-purple-500/20 to-purple-500/5", change: `${stats?.totalProducts ?? 0} active` },
        { label: "Total Users", value: stats?.totalUsers ?? 0, icon: "👥", color: "from-accent/20 to-accent/5", change: `${stats?.totalUsers ?? 0} registered` },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Welcome back, Admin. Here&apos;s your store overview.</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/analytics"
            className="px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Analytics
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2.5 bg-accent text-black text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors flex items-center gap-2"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-white/5 rounded w-24 mb-4" />
              <div className="h-8 bg-white/5 rounded w-16" />
            </div>
          ))
          : statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/40 text-sm font-medium">{card.label}</span>
                <span className="text-2xl">{card.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white group-hover:text-accent transition-colors">{card.value}</p>
              <p className="text-xs text-green-400 mt-2">{card.change}</p>
            </motion.div>
          ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Add Product", href: "/admin/products", icon: "📦" },
          { label: "Manage Categories", href: "/admin/categories", icon: "🏷️" },
          { label: "View Orders", href: "/admin/orders", icon: "📋" },
          { label: "View Users", href: "/admin/users", icon: "👥" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="bg-[#111] border border-white/10 rounded-xl p-5 hover:border-accent/30 hover:bg-white/5 transition-all duration-300 text-center group"
          >
            <span className="text-2xl block mb-2">{action.icon}</span>
            <span className="text-sm text-white/60 group-hover:text-accent transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-accent hover:text-accent-dark transition-colors">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Order ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Total</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
                      </td>
                    </tr>
                  ))
                : stats?.recentOrders.length === 0
                  ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-white/30">
                        No orders yet. Orders will appear here once customers start purchasing.
                      </td>
                    </tr>
                  )
                  : stats?.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm text-white font-mono">#{order.id}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-white">{order.customer_name}</p>
                          <p className="text-xs text-white/40">{order.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-accent font-semibold">
                          ₦{Number(order.total).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border capitalize ${
                              statusColors[order.status] || "bg-white/10 text-white/60 border-white/10"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/40">
                          {new Date(order.created_at).toLocaleDateString("en-NG", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
