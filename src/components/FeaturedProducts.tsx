"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  badge?: string;
  image: string;
  description: string;
  sizes: string[];
}

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setFeatured(data.filter((p) => p.badge).slice(0, 8));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-3 font-medium">Featured</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Bestsellers</h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-8" />
          <Link
            href="/shop"
            className="text-[13px] font-semibold text-charcoal hover:text-accent transition-colors inline-flex items-center gap-2 group"
          >
            View All Products
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group"
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider z-10 ${
                      product.badge === "Bestseller" ? "bg-accent text-black" : product.badge === "New" ? "bg-white text-black" : "bg-black text-accent border border-accent/30"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 text-[12px] font-bold tracking-wider uppercase">View Details</span>
                  </div>
                </div>
              </Link>
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] text-text-light tracking-wider uppercase mb-1 font-medium">{product.category}</p>
                  <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-accent transition-colors mb-1.5 truncate">{product.name}</h3>
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
                  className="mt-1 w-9 h-9 border border-border hover:border-accent hover:bg-accent hover:text-black text-text flex items-center justify-center transition-all duration-300 flex-shrink-0"
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
