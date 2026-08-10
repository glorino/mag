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
          <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-3 font-medium">Stay Connected</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
            Join the MAGRE Family
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
          <p className="text-text text-[14px] mb-8 leading-relaxed">
            Be the first to know about new collections, exclusive offers, and styling tips.
          </p>

          {submitted ? (
            <div className="bg-white p-8 border border-border">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent text-black flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold text-charcoal text-[15px]">Welcome to the family!</p>
              <p className="text-[13px] text-text-light mt-2">Check your inbox for your discount code.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 border border-border border-r-0 bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
              />
              <button 
                type="submit" 
                className="bg-accent text-black px-8 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 border-none cursor-pointer shrink-0"
              >
                Submit
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
