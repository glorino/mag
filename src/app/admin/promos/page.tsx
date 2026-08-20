"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Promo {
  id: number;
  code: string;
  discount_percent: number;
  min_order_amount: number;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: "", discount_percent: 10, min_order_amount: 0, max_uses: "", expires_at: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchPromos = async () => {
    try {
      const res = await fetch("/api/admin/promos", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setPromos(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          code: form.code,
          discount_percent: form.discount_percent,
          min_order_amount: form.min_order_amount || 0,
          max_uses: form.max_uses ? Number(form.max_uses) : null,
          expires_at: form.expires_at || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create promo");
        return;
      }
      setForm({ code: "", discount_percent: 10, min_order_amount: 0, max_uses: "", expires_at: "" });
      setShowForm(false);
      fetchPromos();
    } catch {
      setError("Failed to create promo code");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: number, currentActive: boolean) => {
    try {
      const sql = (await import("@/lib/database")).default;
      // Simple toggle via re-creating with same data
      const promo = promos.find((p) => p.id === id);
      if (!promo) return;
      await fetch(`/api/admin/promos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...promo, is_active: !currentActive }),
      });
      fetchPromos();
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">Promo Codes</h1>
          <p className="text-text-light text-[13px] mt-1">Manage discount codes for your store</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-accent text-black px-5 py-3 text-[12px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300"
        >
          {showForm ? "Cancel" : "+ New Promo"}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-border p-6 mb-8">
          <h3 className="font-bold text-charcoal mb-4">Create Promo Code</h3>
          {error && <p className="text-red-500 text-[13px] mb-4">{error}</p>}
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-text-light mb-1.5 uppercase tracking-wider">Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                required
                className="w-full border border-border px-4 py-3 text-[13px] focus:outline-none focus:border-accent"
                placeholder="e.g. SUMMER20"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-text-light mb-1.5 uppercase tracking-wider">Discount %</label>
              <input
                type="number"
                min={1}
                max={100}
                value={form.discount_percent}
                onChange={(e) => setForm({ ...form, discount_percent: Number(e.target.value) })}
                required
                className="w-full border border-border px-4 py-3 text-[13px] focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-text-light mb-1.5 uppercase tracking-wider">Min Order Amount (₦)</label>
              <input
                type="number"
                min={0}
                value={form.min_order_amount}
                onChange={(e) => setForm({ ...form, min_order_amount: Number(e.target.value) })}
                className="w-full border border-border px-4 py-3 text-[13px] focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-text-light mb-1.5 uppercase tracking-wider">Max Uses (blank = unlimited)</label>
              <input
                type="number"
                min={1}
                value={form.max_uses}
                onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                className="w-full border border-border px-4 py-3 text-[13px] focus:outline-none focus:border-accent"
                placeholder="Unlimited"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-text-light mb-1.5 uppercase tracking-wider">Expires At</label>
              <input
                type="datetime-local"
                value={form.expires_at}
                onChange={(e) => setForm({ ...form, expires_at: e.target.value })}
                className="w-full border border-border px-4 py-3 text-[13px] focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-accent text-black px-6 py-3 text-[12px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Promo"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {loading ? (
        <p className="text-text-light text-[13px]">Loading...</p>
      ) : promos.length === 0 ? (
        <p className="text-text-light text-[13px]">No promo codes yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-charcoal">Code</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal">Discount</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal">Min Order</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal">Uses</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal">Expires</th>
                <th className="text-left py-3 px-4 font-semibold text-charcoal">Status</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id} className="border-b border-border/50 hover:bg-warm-gray">
                  <td className="py-3 px-4 font-mono font-bold text-charcoal">{promo.code}</td>
                  <td className="py-3 px-4 text-text">{promo.discount_percent}%</td>
                  <td className="py-3 px-4 text-text">{promo.min_order_amount ? `₦${Number(promo.min_order_amount).toLocaleString()}` : "—"}</td>
                  <td className="py-3 px-4 text-text">{promo.used_count}{promo.max_uses ? ` / ${promo.max_uses}` : " / ∞"}</td>
                  <td className="py-3 px-4 text-text">{promo.expires_at ? new Date(promo.expires_at).toLocaleDateString() : "Never"}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleActive(promo.id, promo.is_active)}
                      className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                        promo.is_active ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      {promo.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
