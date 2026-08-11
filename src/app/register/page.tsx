"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px]"
      >
        <div className="bg-[#111] border border-white/10 p-10">
          <div className="flex flex-col items-center mb-8">
            <Image src="/logo.jpeg" alt="MAGRE" width={50} height={50} className="mb-4 object-contain" />
            <h1 className="text-2xl font-bold text-white tracking-[0.15em]">MAGRE</h1>
            <p className="text-white/40 text-[13px] mt-2">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="Repeat your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-black py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-white/40 text-[13px] mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:text-accent-dark transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
