"use client";

import { Suspense, Fragment, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Order {
  id: number;
  customer_name: string;
  email: string;
  phone?: string;
  address?: string;
  items: { name: string; size: string; color?: string; quantity: number; price: number }[];
  total: number;
  status: string;
  payment_status?: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

function OrdersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userFilter = searchParams.get("user") || "";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch orders");
        setOrders([]);
        setLoading(false);
        return;
      }

      setOrders(data);
      setError(null);
    } catch {
      setError("Failed to fetch orders");
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = orders
    .filter((o) => !userFilter || o.email === userFilter)
    .filter((o) => filter === "all" || o.status === filter);

  const updateStatus = async (orderId: number, status: string) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      alert("Failed to update order status");
      return;
    }
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const parseItems = (items: unknown): { name: string; size: string; color?: string; quantity: number; price: number }[] => {
    if (Array.isArray(items)) return items;
    if (typeof items === "string") {
      try {
        return JSON.parse(items);
      } catch {
        return [];
      }
    }
    return [];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-white/40 text-sm mt-1">
            {userFilter ? `Orders for ${userFilter}` : "Manage customer orders"}
          </p>
        </div>
        <div className="flex gap-2">
          {userFilter && (
            <button
              onClick={() => router.push("/admin/orders")}
              className="px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10"
            >
              Clear Filter
            </button>
          )}
          <button
            onClick={() => window.open("/api/admin/export?type=orders", "_blank")}
            className="px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Export CSV
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            filter === "all"
              ? "bg-accent text-black border-accent"
              : "bg-transparent text-white/50 border-white/10 hover:border-white/20"
          }`}
        >
          All ({orders.length})
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors capitalize ${
              filter === s
                ? "bg-accent text-black border-accent"
                : "bg-transparent text-white/50 border-white/10 hover:border-white/20"
            }`}
          >
            {s} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] px-4 py-3 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider hidden md:table-cell">
                  Items
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="h-8 bg-white/5 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-white/30">
                    No orders found
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <Fragment key={order.id}>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-mono">#{order.id}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-white">{order.customer_name}</p>
                        <p className="text-xs text-white/40">{order.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60 hidden md:table-cell">
                        {parseItems(order.items).length} item(s)
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
                      <td className="px-6 py-4 text-sm text-white/40 hidden lg:table-cell">
                        {new Date(order.created_at).toLocaleDateString("en-NG", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                            className="bg-black border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-accent/50 transition-colors capitalize"
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                            className="p-1.5 text-white/40 hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform ${expandedId === order.id ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === order.id && (
                      <tr key={`${order.id}-details`}>
                        <td colSpan={7} className="px-6 py-4 bg-black/30">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                                  Shipping Address
                                </p>
                                <p className="text-sm text-white">{order.address || "No address provided"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                                  Phone
                                </p>
                                <p className="text-sm text-white">{order.phone || "No phone provided"}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                                Order Items
                              </p>
                              <div className="space-y-2">
                                {parseItems(order.items).map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2.5"
                                  >
                                    <div>
                                      <span className="text-sm text-white font-medium">{item.name}</span>
                                      <span className="text-xs text-white/40 ml-2">Size: {item.size}</span>
                                      {item.color && <span className="text-xs text-white/40 ml-2">Colour: {item.color}</span>}
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs text-white/40">Qty: {item.quantity}</span>
                                      <span className="text-sm text-accent ml-2 font-semibold">
                                        ₦{Number(item.price).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="text-white/40 p-10">Loading orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
