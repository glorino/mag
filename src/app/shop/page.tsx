"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = ["All", "New", "Ankara", "Adire", "Kaftans", "Dresses", "Tops & Sets", "Trousers"];

const products = [
  { id: 1, name: "Oyin Wrap Set", price: "₦42,500", category: "Tops & Sets", badge: "Bestseller", image: "https://images.unsplash.com/photo-1664151099736-1ac6365a25aa?w=600&h=800&fit=crop&auto=format" },
  { id: 2, name: "Ada Cullottes Set", price: "₦38,000", category: "Tops & Sets", badge: "New", image: "https://images.unsplash.com/photo-1664151099399-d41ed991a10d?w=600&h=800&fit=crop&auto=format" },
  { id: 3, name: "Oliha Kaftan", price: "₦86,500", category: "Kaftans", badge: null, image: "https://images.unsplash.com/photo-1611853904829-6d0f4034ce2f?w=600&h=800&fit=crop&auto=format" },
  { id: 4, name: "Sally Ankara Dress", price: "₦45,000", category: "Dresses", badge: "Bestseller", image: "https://images.unsplash.com/photo-1664151100713-e8833417b95e?w=600&h=800&fit=crop&auto=format" },
  { id: 5, name: "Anni Co-ord Set", price: "₦52,000", category: "Tops & Sets", badge: "New", image: "https://images.unsplash.com/photo-1687052093309-7a14efa58ecb?w=600&h=800&fit=crop&auto=format" },
  { id: 6, name: "Kele Wrap Top", price: "₦28,500", category: "Tops", badge: null, image: "https://images.unsplash.com/photo-1702384927013-3df149c1bd44?w=600&h=800&fit=crop&auto=format" },
  { id: 7, name: "Kimono Jacket", price: "₦35,000", category: "Tops & Sets", badge: null, image: "https://images.unsplash.com/photo-1768212565424-efa3a3852b81?w=600&h=800&fit=crop&auto=format" },
  { id: 8, name: "Amadi Kaftan", price: "₦86,500", category: "Kaftans", badge: "Premium", image: "https://images.unsplash.com/photo-1768212565426-58b089b6386d?w=600&h=800&fit=crop&auto=format" },
  { id: 9, name: "Zainab Ankara Gown", price: "₦55,000", category: "Dresses", badge: null, image: "https://images.unsplash.com/photo-1598803784361-730f89de86c7?w=600&h=800&fit=crop&auto=format" },
  { id: 10, name: "Nneka Palazzo Set", price: "₦48,000", category: "Tops & Sets", badge: "New", image: "https://images.unsplash.com/photo-1673219063344-8d1b5d64109a?w=600&h=800&fit=crop&auto=format" },
  { id: 11, name: "Adire Indigo Dress", price: "₦42,000", category: "Adire", badge: null, image: "https://images.unsplash.com/photo-1578905326519-3aa98aa6a728?w=600&h=800&fit=crop&auto=format" },
  { id: 12, name: "Funke Wide Leg Trousers", price: "₦32,000", category: "Trousers", badge: null, image: "https://images.unsplash.com/photo-1766107349403-673a73ad5cb3?w=600&h=800&fit=crop&auto=format" },
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
            className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3"
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
                className={`px-5 py-2 text-[12px] font-medium tracking-wider uppercase border transition-all duration-300 ${
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
      <section className="section-padding bg-warm-gray">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[13px] text-text">Showing {products.length} products</p>
            <select className="px-4 py-2 border border-border text-[13px] text-charcoal bg-white focus:outline-none">
              <option>Sort by: Latest</option>
              <option>Sort by: Price Low to High</option>
              <option>Sort by: Price High to Low</option>
              <option>Sort by: Name A-Z</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="product-card group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-white border border-border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="product-image object-cover"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider z-10 ${
                      product.badge === "Bestseller" ? "bg-charcoal text-white" : product.badge === "New" ? "bg-accent text-white" : "bg-white text-charcoal border border-charcoal"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-2.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10">
                    <span className="text-[12px] font-semibold text-charcoal tracking-wider uppercase">Add to Cart</span>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] text-text-light tracking-wider uppercase mb-1">{product.category}</p>
                  <h3 className="text-[14px] font-medium text-charcoal group-hover:text-accent transition-colors mb-1">{product.name}</h3>
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
