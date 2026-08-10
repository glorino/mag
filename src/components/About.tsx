"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l4 3.5-4 3zm0-7V11h20V9H20V7l-4 3.5 4 3z' fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/90 to-charcoal/70" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 border-2 border-white/30 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-[12px] tracking-widest uppercase opacity-70">GZK Fashion</p>
                </div>
              </div>
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 shadow-xl">
              <span className="block text-3xl font-bold font-serif">8+</span>
              <span className="text-[12px] text-white/80">Years of Excellence</span>
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
              <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-3 font-medium">About GZK</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4 leading-tight">
                Where Heritage<br />Meets Modern
              </h2>
              <div className="w-16 h-[2px] bg-charcoal" />
            </div>

            <div className="space-y-4 text-text leading-relaxed">
              <p>
                GZK is a clothing brand located in Lagos Nigeria. We produce ready to wear dresses, blouses, shirts, jackets and tunics for women of all sizes. We make clothes women will love and feel comfortable in.
              </p>
              <p>
                From vibrant ankara to indigo adire, we honor the artisans and cultures that inspire our collections. Every garment is thoughtfully designed and handcrafted using premium fabrics sourced from across West Africa.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border">
              {[
                { num: "500+", label: "Happy Clients" },
                { num: "200+", label: "Unique Designs" },
                { num: "100%", label: "African Made" },
                { num: "8+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="block text-3xl font-bold text-charcoal font-serif mb-1">{stat.num}</span>
                  <span className="text-[12px] text-text-light tracking-wide">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3.5 text-[13px] font-semibold tracking-wider uppercase hover:bg-charcoal/90 transition-all duration-300"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
