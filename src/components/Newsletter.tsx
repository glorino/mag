"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
    } catch {
      setError(true);
      setLoading(false);
      return;
    }
    setSubmitted(true);
    setEmail("");
    setLoading(false);
  };

  return (
    <section style={{ padding: "80px 0", background: "#f9f7f5" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>
          Stay Connected
        </p>
        <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#000", marginBottom: "16px", fontFamily: "var(--font-playfair), serif" }}>
          Join the MAGRE Family
        </h2>
        <div style={{ width: "60px", height: "2px", background: "#00e5ff", margin: "0 auto 24px" }} />
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "32px", lineHeight: 1.7 }}>
          Be the first to know about new collections, exclusive offers, and styling tips.
        </p>

        {error && (
          <p style={{ color: "#ff4444", fontSize: "13px", marginBottom: "16px" }}>
            Something went wrong. Please try again.
          </p>
        )}

        {submitted ? (
          <div style={{ background: "#fff", padding: "32px", border: "1px solid #eee" }}>
            <div style={{
              width: "56px", height: "56px", margin: "0 auto 16px",
              background: "#00e5ff", color: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ fontWeight: 700, color: "#000", fontSize: "15px" }}>Welcome to the family!</p>
            <p style={{ fontSize: "13px", color: "#aaa", marginTop: "8px" }}>Check your inbox for your discount code.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: "480px", margin: "0 auto" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: 1,
                padding: "16px 20px",
                border: "1px solid #eee",
                borderRight: "none",
                background: "#fff",
                color: "#000",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#ccc" : "#00e5ff",
                color: "#000",
                padding: "16px 32px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
