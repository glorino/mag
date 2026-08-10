"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="section-padding bg-white" id="contact">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Get in Touch</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
            Contact GZK
          </h2>
          <div className="divider mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: "Location",
              lines: ["35 Eric Moore Close,", "Off Eric Moore Road,", "Surulere, Lagos."],
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
              title: "Contact",
              lines: ["08184118997", "08033449004", "info@gzknigeria.net"],
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Hours",
              lines: ["M - F: 8am - 5pm", "Sat: 11am - 6pm", "Sun: Closed"],
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-8 border border-border"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-warm-gray flex items-center justify-center text-charcoal">
                {item.icon}
              </div>
              <h3 className="font-semibold text-charcoal text-[14px] mb-3">{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line} className="text-[13px] text-text leading-relaxed">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq" className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">FAQ</p>
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">Frequently Asked Questions</h3>
            <div className="divider mx-auto" />
          </div>

          <div className="space-y-4">
            {[
              { q: "How do I make payments?", a: "You can pay via bank transfer, ATM card online, or cash at our store. GZK CONCEPT DIAMOND BANK ACCOUNT NUMBER 0045114433." },
              { q: "How long is delivery?", a: "Delivery takes between 3-7 working days after full payment has been confirmed. Orders are dispatched within 48 hours of payment confirmation." },
              { q: "Do you deliver nationwide?", a: "We deliver to all cities and towns in Nigeria. Pay on delivery is available for customers within Lagos only." },
              { q: "What is your return policy?", a: "All returns should be made within 7 days upon delivery. Your item must be unused and in the same condition that you received it." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="border border-border p-6"
              >
                <h4 className="font-semibold text-charcoal text-[14px] mb-2">{faq.q}</h4>
                <p className="text-[13px] text-text leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
