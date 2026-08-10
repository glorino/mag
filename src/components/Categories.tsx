"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Ankara", desc: "Bold prints, timeless style" },
  { name: "Adire", desc: "Indigo heritage" },
  { name: "Kaftans", desc: "Flowing elegance" },
  { name: "Dresses", desc: "Ready-to-wear luxury" },
  { name: "Tops & Sets", desc: "Mix & match perfection" },
  { name: "Trousers", desc: "Comfortable sophistication" },
];

export default function Categories() {
  return (
    <section className="section-padding bg-white" id="shop">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Collections</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
            Shop by Category
          </h2>
          <div className="divider mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group cursor-pointer text-center p-5 border border-border hover:border-charcoal transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-warm-gray group-hover:bg-charcoal/5 flex items-center justify-center transition-all duration-300">
                <svg className="w-7 h-7 text-text-light group-hover:text-charcoal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-semibold text-charcoal text-[13px] mb-1">{cat.name}</h3>
              <p className="text-[12px] text-text-light">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
