"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError(true);
        return;
      }
    } catch {
      setError(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 md:py-36 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/5 rounded-full" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 font-medium"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            We&apos;d Love to <span className="text-accent">Hear From You</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-accent mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-[15px] max-w-[550px] mx-auto leading-relaxed"
          >
            Have a question about our products, need help with sizing, or want to place a custom order? We&apos;ll respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-10"
            >
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Reach Out</p>
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                  Contact Information
                </h2>
                <div className="w-[40px] h-[2px] bg-accent" />
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                    title: "Call Us",
                    lines: ["08184118997"],
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    title: "Email Us",
                    lines: ["info@magre.ng"],
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    title: "Business Hours",
                    lines: ["Mon - Fri: 8am - 5pm", "Saturday: 11am - 6pm", "Sunday: Closed"],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 group">
                    <div className="w-14 h-14 bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-[15px] mb-1.5">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-[14px] text-text leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="bg-cream p-14 text-center">
                  <div className="w-18 h-18 bg-accent/10 flex items-center justify-center mx-auto mb-8 rounded-full">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">Message Sent!</h3>
                  <p className="text-text text-[15px] mb-10 max-w-md mx-auto">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", type: "", message: "" }); }}
                    className="bg-accent text-black px-10 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-cream/50 p-10 md:p-12 border border-border">
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">Send a Message</h3>
                  <div className="w-[40px] h-[2px] bg-accent mb-10" />
                  {error && (
                    <p className="text-red-500 text-[13px] mb-6">Something went wrong. Please try again.</p>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                        className="px-5 py-4 border border-border bg-white text-charcoal text-[14px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                        className="px-5 py-4 border border-border bg-white text-charcoal text-[14px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-5 py-4 border border-border bg-white text-charcoal text-[14px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-5 py-4 border border-border bg-white text-charcoal text-[14px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                    />
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      required
                      className="w-full px-5 py-4 border border-border bg-white text-charcoal text-[14px] focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="" disabled>Select Inquiry Type</option>
                      <option value="order">Order Inquiry</option>
                      <option value="custom">Custom Order</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-5 py-4 border border-border bg-white text-charcoal text-[14px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full justify-center bg-accent text-black px-8 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="h-[200px] bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-[14px] mb-3">Need help? Give us a call</p>
          <a href="tel:08184118997" className="text-accent text-[20px] font-bold hover:text-accent-dark transition-colors">
            08184118997
          </a>
        </div>
      </section>
    </main>
  );
}
