"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
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
            <p className="text-white/40 text-[13px] mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-white/60 mb-2 tracking-wide uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors placeholder:text-white/25"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-black py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-white/40 text-[13px] mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-accent hover:text-accent-dark transition-colors font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
