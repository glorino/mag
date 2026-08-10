"use client";

import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Oyin Wrap Set", price: "₦42,500", category: "Tops & Sets", badge: "Bestseller", gradient: "from-rose-100 to-rose-50" },
  { id: 2, name: "Ada Cullottes Set", price: "₦38,000", category: "Tops & Sets", badge: "New", gradient: "from-emerald-100 to-emerald-50" },
  { id: 3, name: "Oliha Kaftan", price: "₦86,500", category: "Kaftans", badge: null, gradient: "from-amber-50 to-orange-50" },
  { id: 4, name: "Sally Ankara Dress", price: "₦45,000", category: "Dresses", badge: "Bestseller", gradient: "from-blue-100 to-blue-50" },
  { id: 5, name: "Anni Co-ord Set", price: "₦52,000", category: "Tops & Sets", badge: "New", gradient: "from-yellow-100 to-amber-50" },
  { id: 6, name: "Kele Wrap Top", price: "₦28,500", category: "Tops", badge: null, gradient: "from-gray-100 to-gray-50" },
  { id: 7, name: "Kimono Jacket", price: "₦35,000", category: "Tops & Jackets", badge: null, gradient: "from-green-100 to-green-50" },
  { id: 8, name: "Amadi Kaftan", price: "₦86,500", category: "Kaftans", badge: "Premium", gradient: "from-stone-100 to-stone-50" },
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-warm-gray">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Featured</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
              Bestsellers
            </h2>
            <div className="divider" />
          </div>
          <a href="#shop" className="mt-4 md:mt-0 text-[13px] font-medium text-charcoal hover:text-accent transition-colors flex items-center gap-2">
            View More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="product-card group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-white border border-border">
                <div className={`product-image w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                  <svg className="w-14 h-14 text-text-light/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    product.badge === "Bestseller" ? "bg-charcoal text-white" : product.badge === "New" ? "bg-accent text-white" : "bg-white text-charcoal border border-charcoal"
                  }`}>
                    {product.badge}
                  </span>
                )}
                {/* Quick add */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-2.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
                  <span className="text-[12px] font-semibold text-charcoal tracking-wider uppercase">Add to Cart</span>
                </div>
              </div>

              {/* Info */}
              <div>
                <p className="text-[11px] text-text-light tracking-wider uppercase mb-1">{product.category}</p>
                <h3 className="text-[14px] font-medium text-charcoal group-hover:text-accent transition-colors mb-1">{product.name}</h3>
                <p className="text-[15px] font-bold text-charcoal">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
