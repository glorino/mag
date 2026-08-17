"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { 
    name: "Shirt", 
    desc: "Elegant tops & blouses for every occasion",
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=400&fit=crop",
    count: "24+ styles",
  },
  { 
    name: "Trouser", 
    desc: "Stylish bottoms that define your silhouette",
    image: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&h=400&fit=crop",
    count: "18+ styles",
  },
  { 
    name: "Nicker", 
    desc: "Comfortable undergarments with African flair",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&h=400&fit=crop",
    count: "12+ styles",
  },
];

export default function Categories() {
  return (
    <section className="py-28 bg-white" id="shop">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-3 font-medium">Collections</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
            Shop by Category
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                href="/shop"
                className="group block relative overflow-hidden bg-black aspect-[4/3]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <span className="text-accent text-[11px] font-bold tracking-widest uppercase">{cat.count}</span>
                  <h3 className="text-white text-2xl font-serif font-bold mt-2 mb-2">{cat.name}</h3>
                  <p className="text-white/60 text-[13px] leading-relaxed">{cat.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-accent text-[12px] font-bold tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                    Shop Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
