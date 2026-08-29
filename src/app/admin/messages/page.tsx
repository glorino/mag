"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminPagination from "@/components/AdminPagination";

interface Message {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const typeColors: Record<string, string> = {
  inquiry: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  support: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  feedback: "bg-green-500/10 text-green-400 border-green-500/20",
  order: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  other: "bg-white/10 text-white/50 border-white/10",
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 20;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const fetchMessages = async (pageNum = page) => {
    try {
      const res = await fetch(`/api/admin/messages?page=${pageNum}&limit=${LIMIT}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setMessages(Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : []);
      if (result.total !== undefined) {
        setTotalItems(result.total);
        setTotalPages(result.totalPages || 1);
      }
    } catch {
      setMessages([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRead = async (id: number) => {
    const res = await fetch("/api/admin/messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      alert("Failed to mark message as read");
      return;
    }
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/messages?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      alert("Failed to delete message");
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const filtered = filter === "unread"
    ? messages.filter((m) => !m.is_read)
    : messages;

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages</h1>
          <p className="text-white/40 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}` : "All messages read"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            filter === "all"
              ? "bg-accent text-black border-accent"
              : "bg-transparent text-white/50 border-white/10 hover:border-white/20"
          }`}
        >
          All ({messages.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            filter === "unread"
              ? "bg-accent text-black border-accent"
              : "bg-transparent text-white/50 border-white/10 hover:border-white/20"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Messages List */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-white/50 text-[15px] font-medium">No messages</p>
            <p className="text-white/25 text-[13px] mt-2">
              {filter === "unread" ? "All messages have been read" : "Contact form submissions will appear here"}
            </p>
          </div>
        ) : (
          <div>
            {filtered.map((msg) => (
              <div
                key={msg.id}
                className={`border-b border-white/5 last:border-b-0 ${
                  !msg.is_read ? "bg-accent/[0.03]" : ""
                }`}
              >
                <button
                  onClick={() => {
                    const newId = expandedId === msg.id ? null : msg.id;
                    setExpandedId(newId);
                    if (newId && !msg.is_read) markRead(msg.id);
                  }}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  {/* Unread dot */}
                  <div className="w-2 h-2 rounded-full flex-shrink-0">
                    {!msg.is_read && <div className="w-2 h-2 rounded-full bg-accent" />}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white/60">
                      {msg.first_name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-[14px] truncate ${!msg.is_read ? "text-white font-semibold" : "text-white/70"}`}>
                        {msg.first_name} {msg.last_name}
                      </p>
                      <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${
                        typeColors[msg.type] || typeColors.other
                      }`}>
                        {msg.type}
                      </span>
                    </div>
                    <p className="text-white/40 text-[12px] truncate">{msg.email} — {msg.message.substring(0, 80)}...</p>
                  </div>

                  {/* Date + Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <p className="text-white/30 text-[11px] hidden sm:block">
                      {new Date(msg.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                      className="p-1.5 text-white/20 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <svg
                      className={`w-4 h-4 text-white/30 transition-transform ${expandedId === msg.id ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Detail */}
                <AnimatePresence>
                  {expandedId === msg.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/10 overflow-hidden"
                    >
                      <div className="p-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">From</p>
                            <p className="text-white text-[14px]">{msg.first_name} {msg.last_name}</p>
                          </div>
                          <div>
                            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Email</p>
                            <a href={`mailto:${msg.email}`} className="text-accent text-[14px] hover:underline">{msg.email}</a>
                          </div>
                          <div>
                            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Phone</p>
                            <p className="text-white text-[14px]">{msg.phone || "—"}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Message</p>
                          <p className="text-white/70 text-[14px] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Received</p>
                          <p className="text-white/50 text-[13px]">
                            {new Date(msg.created_at).toLocaleDateString("en-NG", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
      <AdminPagination page={page} totalPages={totalPages} total={totalItems} limit={LIMIT} onPageChange={(p) => { setPage(p); fetchMessages(p); }} />
    </div>
  );
}
