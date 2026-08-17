"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface OrderItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  quantity: number;
  size?: string;
  image?: string;
  category?: string;
}

interface Order {
  id: number;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[] | string;
  total: number;
  status: string;
  tracking_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-yellow-500/15", text: "text-yellow-400" },
  processing: { bg: "bg-blue-500/15", text: "text-blue-400" },
  shipped: { bg: "bg-purple-500/15", text: "text-purple-400" },
  delivered: { bg: "bg-green-500/15", text: "text-green-400" },
  cancelled: { bg: "bg-red-500/15", text: "text-red-400" },
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/orders/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router]);

  const parseItems = (items: OrderItem[] | string): OrderItem[] => {
    if (Array.isArray(items)) return items;
    try {
      return JSON.parse(items);
    } catch {
      return [];
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Order History</h1>
        <p className="text-white/40 text-[13px] mt-1">View and track your orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#111] border border-white/10 p-16 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-white/50 text-[15px] font-medium">No orders yet</p>
          <p className="text-white/25 text-[13px] mt-2">Your order history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const items = parseItems(order.items);
            const isExpanded = expandedId === order.id;
            const statusStyle = statusColors[order.status] || statusColors.pending;

            return (
              <div key={order.id} className="bg-[#111] border border-white/10 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                  className="w-full p-5 flex flex-col sm:flex-row sm:items-center gap-3 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-white font-semibold text-[14px]">#{order.id}</span>
                      <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 ${statusStyle.bg} ${statusStyle.text}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-white/35 text-[12px]">{formatDate(order.created_at)}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white/40 text-[11px] uppercase tracking-wider">Items</p>
                      <p className="text-white text-[13px]">{items.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/40 text-[11px] uppercase tracking-wider">Total</p>
                      <p className="text-accent font-bold text-[14px]">₦{order.total.toLocaleString()}</p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-white/30 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                  {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-5 space-y-4">
                      {/* Status Timeline */}
                      <div>
                        <p className="text-[11px] text-white/30 uppercase tracking-wider mb-3">Order Status</p>
                        <div className="flex items-center gap-0">
                          {["pending", "processing", "shipped", "delivered"].map((step, i) => {
                            const statusOrder = ["pending", "processing", "shipped", "delivered"];
                            const currentIdx = statusOrder.indexOf(order.status);
                            const isCompleted = i <= currentIdx;
                            const isCurrent = i === currentIdx;
                            return (
                              <div key={step} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                                    isCompleted
                                      ? "bg-accent text-black border-accent"
                                      : "bg-transparent text-white/30 border-white/15"
                                  } ${isCurrent ? "ring-2 ring-accent/30" : ""}`}>
                                    {isCompleted ? (
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    ) : (
                                      i + 1
                                    )}
                                  </div>
                                  <span className={`text-[10px] mt-1 capitalize ${isCompleted ? "text-accent" : "text-white/30"}`}>
                                    {step}
                                  </span>
                                </div>
                                {i < 3 && (
                                  <div className={`flex-1 h-[2px] mx-1 mt-[-14px] ${i < currentIdx ? "bg-accent" : "bg-white/15"}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tracking Number */}
                      {order.tracking_number && (
                        <div className="bg-accent/5 border border-accent/20 p-3">
                          <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Tracking Number</p>
                          <p className="text-accent text-[14px] font-mono font-bold">{order.tracking_number}</p>
                        </div>
                      )}

                      {/* Items */}
                      <div>
                        <p className="text-[11px] text-white/30 uppercase tracking-wider mb-2">Items</p>
                        <div className="space-y-2">
                          {items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-black/40 p-3">
                              {item.image && (
                                <img src={item.image} alt={item.name} className="w-12 h-14 object-cover" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-[13px] truncate">{item.name}</p>
                                <p className="text-white/35 text-[11px]">
                                  {item.category && `${item.category} • `}Qty: {item.quantity}
                                  {item.size && ` • Size: ${item.size}`}
                                </p>
                              </div>
                              <p className="text-white text-[13px] font-medium whitespace-nowrap">
                                ₦{(item.priceNum * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {order.address && (
                        <div>
                          <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Shipping Address</p>
                          <p className="text-white/60 text-[13px]">{order.address}</p>
                        </div>
                      )}

                      {order.notes && (
                        <div className="bg-white/5 border border-white/10 p-3">
                          <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Admin Notes</p>
                          <p className="text-white/60 text-[13px]">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
