"use client";

import { motion } from "framer-motion";

const categories = ["All", "New", "Ankara", "Adire", "Kaftans", "Dresses", "Tops & Sets", "Trousers"];

const products = [
  { id: 1, name: "Oyin Wrap Set", price: "₦42,500", category: "Tops & Sets", badge: "Bestseller", pattern: "linear-gradient(135deg, #92400e 0%, #78350f 100%)" },
  { id: 2, name: "Ada Cullottes Set", price: "₦38,000", category: "Tops & Sets", badge: "New", pattern: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)" },
  { id: 3, name: "Oliha Kaftan", price: "₦86,500", category: "Kaftans", badge: null, pattern: "linear-gradient(135deg, #3730a3 0%, #312e81 100%)" },
  { id: 4, name: "Sally Ankara Dress", price: "₦45,000", category: "Dresses", badge: "Bestseller", pattern: "linear-gradient(135deg, #9f1239 0%, #881337 100%)" },
  { id: 5, name: "Anni Co-ord Set", price: "₦52,000", category: "Tops & Sets", badge: "New", pattern: "linear-gradient(135deg, #5b21b6 0%, #4c1d95 100%)" },
  { id: 6, name: "Kele Wrap Top", price: "₦28,500", category: "Tops", badge: null, pattern: "linear-gradient(135deg, #115e59 0%, #134e4a 100%)" },
  { id: 7, name: "Kimono Jacket", price: "₦35,000", category: "Tops & Jackets", badge: null, pattern: "linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)" },
  { id: 8, name: "Amadi Kaftan", price: "₦86,500", category: "Kaftans", badge: "Premium", pattern: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" },
  { id: 9, name: "Zainab Ankara Gown", price: "₦55,000", category: "Dresses", badge: null, pattern: "linear-gradient(135deg, #be185d 0%, #9d174d 100%)" },
  { id: 10, name: "Nneka Palazzo Set", price: "₦48,000", category: "Tops & Sets", badge: "New", pattern: "linear-gradient(135deg, #0e7490 0%, #155e75 100%)" },
  { id: 11, name: "Adire Indigo Dress", price: "₦42,000", category: "Adire", badge: null, pattern: "linear-gradient(135deg, #4338ca 0%, #3730a3 100%)" },
  { id: 12, name: "Funke Wide Leg Trousers", price: "₦32,000", category: "Trousers", badge: null, pattern: "linear-gradient(135deg, #b45309 0%, #92400e 100%)" },
];

export default function ShopPage() {
  return (
    <main className="pt-[120px]">
      {/* Hero */}
      <section className="relative py-20 bg-charcoal text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3 font-medium"
          >
            Shop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Collection
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-white/30 mx-auto"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 text-[12px] font-semibold tracking-wider uppercase border transition-all duration-300 ${
                  cat === "All"
                    ? "bg-charcoal text-white border-charcoal"
                    : "bg-white text-text border-border hover:border-charcoal hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <p className="text-[13px] text-text font-medium">Showing {products.length} products</p>
            <select className="px-4 py-2.5 border border-border text-[13px] text-charcoal bg-white focus:outline-none focus:border-charcoal transition-colors">
              <option>Sort by: Latest</option>
              <option>Sort by: Price Low to High</option>
              <option>Sort by: Price High to Low</option>
              <option>Sort by: Name A-Z</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-charcoal border border-border">
                  <div 
                    className="absolute inset-0 opacity-80"
                    style={{ background: product.pattern }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/80">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="text-[11px] tracking-wider uppercase opacity-60">{product.category}</span>
                    </div>
                  </div>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
                      product.badge === "Bestseller" ? "bg-white text-charcoal" : product.badge === "New" ? "bg-accent text-white" : "bg-charcoal text-white border border-white/30"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10">
                    <span className="text-[12px] font-bold text-charcoal tracking-wider uppercase">Add to Cart</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-text-light tracking-wider uppercase mb-1 font-medium">{product.category}</p>
                  <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-accent transition-colors mb-1">{product.name}</h3>
                  <p className="text-[15px] font-bold text-charcoal">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-10 h-10 bg-charcoal text-white text-[13px] font-medium">1</button>
            <button className="w-10 h-10 border border-border text-text text-[13px] font-medium hover:border-charcoal hover:text-charcoal transition-colors">2</button>
            <button className="w-10 h-10 border border-border text-text text-[13px] font-medium hover:border-charcoal hover:text-charcoal transition-colors">
              <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
