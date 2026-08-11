"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
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
            className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4 font-medium"
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
            className="h-[2px] bg-accent mx-auto mb-6"
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
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Reach Out</p>
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                  Contact Information
                </h2>
                <div className="w-[40px] h-[2px] bg-accent mb-6" />
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    title: "Visit Us",
                    lines: ["35 Eric Moore Close,", "Off Eric Moore Road,", "Surulere, Lagos, Nigeria"],
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                    title: "Call Us",
                    lines: ["08184118997", "08033449004"],
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
                  <div key={item.title} className="flex gap-4 group">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-black transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal text-[14px] mb-1">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-[13px] text-text leading-relaxed">{line}</p>
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
                <div className="bg-cream p-12 text-center">
                  <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">Message Sent!</h3>
                  <p className="text-text text-[14px] mb-8">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", type: "", message: "" }); }}
                    className="bg-accent text-black px-8 py-3 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="bg-cream/50 p-8 md:p-10 border border-border">
                  <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">Send a Message</h3>
                  <div className="w-[40px] h-[2px] bg-accent mb-8" />
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        required
                        className="px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        required
                        className="px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors"
                    />
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] focus:outline-none focus:border-accent transition-colors"
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
                      className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-accent transition-colors resize-none"
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

      {/* Map */}
      <section className="h-[300px] bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-[13px] mb-2">35 Eric Moore Close, Off Eric Moore Road</p>
          <p className="text-white text-[14px] font-medium">Surulere, Lagos, Nigeria</p>
        </div>
      </section>
    </main>
  );
}
