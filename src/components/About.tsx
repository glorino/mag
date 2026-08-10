"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
            <div className="relative aspect-[4/5] overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1578905326519-3aa98aa6a728?w=800&h=1000&fit=crop&auto=format"
                alt="African fashion"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
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
