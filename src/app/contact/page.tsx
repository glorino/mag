"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="pt-[120px]">
      {/* Hero */}
      <section className="relative py-20 bg-charcoal text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-white/30 mx-auto"
          />
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Reach Out</p>
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-3">
                  We&apos;d Love to Hear From You
                </h2>
                <div className="divider mb-6" />
                <p className="text-text leading-relaxed">
                  Have a question about our products, need help with sizing, or want to place a custom order? Reach out and we&apos;ll respond within 24 hours.
                </p>
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
                    lines: ["info@gzknigeria.net"],
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    title: "Business Hours",
                    lines: ["Mon - Fri: 8am - 5pm", "Saturday: 11am - 6pm", "Sunday: Closed"],
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-warm-gray flex items-center justify-center text-charcoal shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal text-[14px] mb-1">{item.title}</h4>
                      {item.lines.map((line) => (
                        <p key={line} className="text-[13px] text-text">{line}</p>
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
              className="bg-cream/50 p-8 md:p-10"
            >
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">Send a Message</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-charcoal transition-colors" />
                  <input type="text" placeholder="Last Name" className="px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-charcoal transition-colors" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-charcoal transition-colors" />
                <input type="tel" placeholder="Phone Number" className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-charcoal transition-colors" />
                <select className="w-full px-5 py-3.5 border border-border bg-white text-text-light text-[13px] focus:outline-none focus:border-charcoal transition-colors">
                  <option value="">Select Inquiry Type</option>
                  <option value="order">Order Inquiry</option>
                  <option value="custom">Custom Order</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="other">Other</option>
                </select>
                <textarea placeholder="Your Message" rows={4} className="w-full px-5 py-3.5 border border-border bg-white text-charcoal text-[13px] placeholder:text-text-light focus:outline-none focus:border-charcoal transition-colors resize-none" />
                <button type="submit" className="w-full justify-center bg-charcoal text-white px-8 py-3 text-[13px] font-medium tracking-wider uppercase hover:bg-brand-dark transition-all duration-300 border-none cursor-pointer inline-flex items-center gap-2">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-[300px] bg-warm-gray flex items-center justify-center">
        <p className="text-text-light text-[13px]">35 Eric Moore Close, Off Eric Moore Road, Surulere, Lagos</p>
      </section>
    </main>
  );
}
