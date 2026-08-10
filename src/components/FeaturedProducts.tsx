"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Oyin Wrap Set",
    price: "₦42,500",
    category: "Tops & Sets",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1664151099736-1ac6365a25aa?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Ada Cullottes Set",
    price: "₦38,000",
    category: "Tops & Sets",
    badge: "New",
    image: "https://images.unsplash.com/photo-1664151099399-d41ed991a10d?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Oliha Kaftan",
    price: "₦86,500",
    category: "Kaftans",
    badge: null,
    image: "https://images.unsplash.com/photo-1611853904829-6d0f4034ce2f?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Sally Ankara Dress",
    price: "₦45,000",
    category: "Dresses",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1664151100713-e8833417b95e?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Anni Co-ord Set",
    price: "₦52,000",
    category: "Tops & Sets",
    badge: "New",
    image: "https://images.unsplash.com/photo-1687052093309-7a14efa58ecb?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Kele Wrap Top",
    price: "₦28,500",
    category: "Tops",
    badge: null,
    image: "https://images.unsplash.com/photo-1702384927013-3df149c1bd44?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 7,
    name: "Kimono Jacket",
    price: "₦35,000",
    category: "Tops & Jackets",
    badge: null,
    image: "https://images.unsplash.com/photo-1768212565424-efa3a3852b81?w=600&h=800&fit=crop&auto=format",
  },
  {
    id: 8,
    name: "Amadi Kaftan",
    price: "₦86,500",
    category: "Kaftans",
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1768212565426-58b089b6386d?w=600&h=800&fit=crop&auto=format",
  },
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
                {/* Quick add */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 py-2.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10">
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
