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
    <section className="py-20 bg-[#f9f7f5]">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">Stay Connected</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
          Join the MAGRE Family
        </h2>
        <div className="w-16 h-[2px] bg-[#00e5ff] mx-auto mb-6" />
        <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
          Be the first to know about new collections, exclusive offers, and styling tips.
        </p>

        {submitted ? (
          <div className="bg-white p-8 border border-gray-200">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#00e5ff] text-black flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-bold text-black text-[15px]">Welcome to the family!</p>
            <p className="text-[13px] text-gray-400 mt-2">Check your inbox for your discount code.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-[500px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-4 border border-gray-200 border-r-0 bg-white text-black text-[13px] placeholder:text-gray-400 focus:outline-none focus:border-[#00e5ff] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#00e5ff] text-black px-8 py-4 text-[12px] font-bold tracking-wider uppercase hover:bg-[#00b8d4] transition-all duration-300 cursor-pointer shrink-0"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
