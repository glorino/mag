"use client";

import { useEffect, useState } from "react";
import AdminPagination from "@/components/AdminPagination";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 20;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const fetchUsers = async (pageNum = page) => {
    try {
      const res = await fetch(`/api/admin/users?page=${pageNum}&limit=${LIMIT}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setUsers(Array.isArray(result.data) ? result.data : Array.isArray(result) ? result : []);
      if (result.total !== undefined) {
        setTotalItems(result.total);
        setTotalPages(result.totalPages || 1);
      }
    } catch {
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const updateRole = async (userId: number, role: string) => {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      alert("Failed to update user role");
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-white/40 text-sm mt-1">Manage registered users</p>
        </div>
        <button
          onClick={() => window.open("/api/admin/export?type=users", "_blank")}
          className="px-4 py-2.5 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/15 transition-colors border border-white/10 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Export CSV
        </button>
      </div>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
        />
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider hidden md:table-cell">
                  Phone
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider hidden lg:table-cell">
                  Joined
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
                      <td colSpan={6} className="px-6 py-4">
                        <div className="h-8 bg-white/5 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-white/30">
                    No users found
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-white/60">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-white/60 hidden md:table-cell">
                      {user.phone || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border focus:outline-none focus:border-accent/50 transition-colors capitalize ${
                          user.role === "admin"
                            ? "bg-accent/10 text-accent border-accent/20"
                            : "bg-white/5 text-white/60 border-white/10"
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40 hidden lg:table-cell">
                      {new Date(user.created_at).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => {
                            window.location.href = `/admin/orders?user=${user.email}`;
                          }}
                          className="p-1.5 text-white/40 hover:text-accent transition-colors rounded-lg hover:bg-white/5"
                          title="View orders"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AdminPagination page={page} totalPages={totalPages} total={totalItems} limit={LIMIT} onPageChange={(p) => { setPage(p); fetchUsers(p); }} />
    </div>
  );
}
