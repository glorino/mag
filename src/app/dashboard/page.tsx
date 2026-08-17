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
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMessage, setPwMessage] = useState("");
  const [showPw, setShowPw] = useState(false);

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

      {/* Change Password */}
      <div className="bg-[#111] border border-white/10 p-6 mt-8">
        <h2 className="text-[13px] font-bold text-white/60 tracking-wider uppercase mb-6">Change Password</h2>

        {pwMessage && (
          <div
            className={`text-[13px] px-4 py-3 mb-6 ${
              pwMessage.includes("success")
                ? "bg-accent/10 border border-accent/30 text-accent"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {pwMessage}
          </div>
        )}

        <form onSubmit={async (e) => {
          e.preventDefault();
          setPwSaving(true);
          setPwMessage("");

          if (pwForm.newPassword !== pwForm.confirmPassword) {
            setPwMessage("New passwords do not match");
            setPwSaving(false);
            return;
          }

          if (pwForm.newPassword.length < 6) {
            setPwMessage("New password must be at least 6 characters");
            setPwSaving(false);
            return;
          }

          try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/auth/me", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                currentPassword: pwForm.currentPassword,
                newPassword: pwForm.newPassword,
              }),
            });

            const data = await res.json();
            if (data.success) {
              setPwMessage("Password updated successfully");
              setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
              setPwMessage(data.error || "Failed to change password");
            }
          } catch {
            setPwMessage("Something went wrong");
          } finally {
            setPwSaving(false);
          }
        }} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Current Password</label>
              <input
                type="password"
                value={pwForm.currentPassword}
                onChange={(e) => setPwForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">New Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={pwForm.newPassword}
                  onChange={(e) => setPwForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  required
                  className="w-full bg-black border border-white/15 text-white px-4 py-3.5 pr-12 text-[14px] focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Confirm New Password</label>
              <input
                type="password"
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pwSaving}
            className="bg-white/10 text-white border border-white/15 px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase hover:bg-white/15 transition-all duration-300 disabled:opacity-50"
          >
            {pwSaving ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
