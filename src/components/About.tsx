"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-warm-gray to-cream flex items-center justify-center border border-border">
              <div className="text-center text-text-light">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-[12px] tracking-widest uppercase">Our Story</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">About GZK</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
                Where Heritage<br />Meets Modern
              </h2>
              <div className="divider" />
            </div>

            <div className="space-y-4 text-text leading-relaxed">
              <p>
                GZK is a clothing brand located in Lagos Nigeria. We produce ready to wear dresses, blouses, shirts, jackets and tunics for women of all sizes. We make clothes women will love and feel comfortable in.
              </p>
              <p>
                From vibrant ankara to indigo adire, we honor the artisans and cultures that inspire our collections. Every garment is thoughtfully designed and handcrafted using premium fabrics sourced from across West Africa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { num: "500+", label: "Happy Clients" },
                { num: "200+", label: "Unique Designs" },
                { num: "100%", label: "African Made" },
                { num: "8+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-2xl font-bold text-charcoal font-serif">{stat.num}</span>
                  <span className="text-[12px] text-text-light">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
