"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Stay Connected</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
            Join the GZK Family
          </h2>
          <div className="divider mx-auto mb-6" />
          <p className="text-text text-[14px] mb-8">
            Be the first to know about new collections, exclusive offers, and styling tips.
          </p>

          {submitted ? (
            <div className="bg-white p-8 border border-border">
              <svg className="w-10 h-10 mx-auto mb-3 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-semibold text-charcoal">Welcome to the family!</p>
              <p className="text-[13px] text-text-light mt-1">Check your inbox for your discount code.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 border border-r-0 border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-charcoal transition-colors"
              />
              <button type="submit" className="shrink-0 bg-charcoal text-white px-8 py-3.5 text-[13px] font-medium tracking-wider uppercase hover:bg-brand-dark transition-all duration-300 border-none cursor-pointer inline-flex items-center gap-2">
                Submit
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
