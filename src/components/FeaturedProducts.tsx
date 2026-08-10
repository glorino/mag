"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const featured = products.slice(0, 8);

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
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group"
            >
              <Link href={`/product/${product.id}`} className="block cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-black border border-border">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
                      product.badge === "Bestseller" ? "bg-accent text-black" : product.badge === "New" ? "bg-white text-black" : "bg-black text-accent border border-accent/30"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-accent py-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10">
                    <span className="text-[12px] font-bold text-black tracking-wider uppercase">View Details</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-text-light tracking-wider uppercase mb-1 font-medium">{product.category}</p>
                  <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-accent transition-colors mb-1">{product.name}</h3>
                  <p className="text-[15px] font-bold text-charcoal">{product.price}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      priceNum: product.priceNum,
                      category: product.category,
                      image: product.image,
                    });
                  }}
                  className="mt-2 p-2 border border-border hover:border-accent hover:bg-accent hover:text-black text-text transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
