"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-brand text-sm font-semibold tracking-[0.3em] uppercase">
          Stay Connected
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
          Join the MAG Family
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          Be the first to know about new collections, exclusive offers, and
          styling tips. Subscribe for 10% off your first order.
        </p>

        {submitted ? (
          <div className="bg-brand/10 text-brand rounded-2xl p-8 max-w-md mx-auto">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="font-semibold text-lg">Welcome to the family!</p>
            <p className="text-sm text-brand/70 mt-1">
              Check your inbox for your 10% discount code.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 bg-white text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 mt-6">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
