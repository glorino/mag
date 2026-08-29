"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/subscribers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch {
      setSubscribers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this subscriber?")) return;
    const res = await fetch(`/api/admin/subscribers?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscribers</h1>
          <p className="text-white/50 text-sm mt-1">
            {subscribers.length} total subscriber{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/40 text-lg">No subscribers yet</p>
        </div>
      ) : (
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Subscribed</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, i) => (
                  <motion.tr
                    key={subscriber.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-medium">{subscriber.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/50">
                        {new Date(subscriber.created_at).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
