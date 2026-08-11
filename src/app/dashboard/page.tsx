"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: number; name: string; email: string; phone?: string; address?: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setForm({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
          });
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Profile updated successfully");
      } else {
        setMessage(data.error || "Failed to update profile");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
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
        <h1 className="text-2xl font-bold text-white">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-white/40 text-[13px] mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile summary */}
      <div className="bg-[#111] border border-white/10 p-6 mb-8">
        <h2 className="text-[13px] font-bold text-white/60 tracking-wider uppercase mb-4">Profile Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Name</p>
            <p className="text-white text-[14px]">{user.name}</p>
          </div>
          <div>
            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Email</p>
            <p className="text-white text-[14px]">{user.email}</p>
          </div>
          <div>
            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Phone</p>
            <p className="text-white text-[14px]">{user.phone || "Not set"}</p>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-[#111] border border-white/10 p-6">
        <h2 className="text-[13px] font-bold text-white/60 tracking-wider uppercase mb-6">Edit Profile</h2>

        {message && (
          <div
            className={`text-[13px] px-4 py-3 mb-6 ${
              message.includes("success")
                ? "bg-accent/10 border border-accent/30 text-accent"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-accent text-black px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
