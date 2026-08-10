"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Oyin Wrap Set",
    price: "₦42,500",
    category: "Tops & Sets",
    badge: "Bestseller",
    pattern: "linear-gradient(135deg, #92400e 0%, #78350f 100%)",
  },
  {
    id: 2,
    name: "Ada Cullottes Set",
    price: "₦38,000",
    category: "Tops & Sets",
    badge: "New",
    pattern: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
  },
  {
    id: 3,
    name: "Oliha Kaftan",
    price: "₦86,500",
    category: "Kaftans",
    badge: null,
    pattern: "linear-gradient(135deg, #3730a3 0%, #312e81 100%)",
  },
  {
    id: 4,
    name: "Sally Ankara Dress",
    price: "₦45,000",
    category: "Dresses",
    badge: "Bestseller",
    pattern: "linear-gradient(135deg, #9f1239 0%, #881337 100%)",
  },
  {
    id: 5,
    name: "Anni Co-ord Set",
    price: "₦52,000",
    category: "Tops & Sets",
    badge: "New",
    pattern: "linear-gradient(135deg, #5b21b6 0%, #4c1d95 100%)",
  },
  {
    id: 6,
    name: "Kele Wrap Top",
    price: "₦28,500",
    category: "Tops",
    badge: null,
    pattern: "linear-gradient(135deg, #115e59 0%, #134e4a 100%)",
  },
  {
    id: 7,
    name: "Kimono Jacket",
    price: "₦35,000",
    category: "Tops & Jackets",
    badge: null,
    pattern: "linear-gradient(135deg, #9a3412 0%, #7c2d12 100%)",
  },
  {
    id: 8,
    name: "Amadi Kaftan",
    price: "₦86,500",
    category: "Kaftans",
    badge: "Premium",
    pattern: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-3 font-medium">Featured</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              Bestsellers
            </h2>
            <div className="w-16 h-[2px] bg-accent" />
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 text-[13px] font-semibold text-charcoal hover:text-accent transition-colors flex items-center gap-2 group"
          >
            View All
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
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
                    product.badge === "Bestseller" ? "bg-accent text-black" : 
                    product.badge === "New" ? "bg-white text-black" : 
                    "bg-black text-accent border border-accent/30"
                  }`}>
                    {product.badge}
                  </span>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 bg-accent py-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10">
                  <span className="text-[12px] font-bold text-black tracking-wider uppercase">Add to Cart</span>
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
      </div>
    </section>
  );
}
