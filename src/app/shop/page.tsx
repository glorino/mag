"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const categories = ["All", "Shirt", "Trouser", "Nicker"];

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

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("latest");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  const updateUrl = useCallback((newCategory?: string, newSort?: string) => {
    const params = new URLSearchParams();
    if (initialQuery) params.set("q", initialQuery);
    if (newCategory && newCategory !== "All") params.set("category", newCategory);
    if (newSort && newSort !== "latest") params.set("sort", newSort);
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }, [initialQuery, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (initialQuery) params.set("q", initialQuery);
        if (activeCategory !== "All") params.set("category", activeCategory);
        if (sortBy !== "latest") params.set("sort", sortBy);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [activeCategory, sortBy, initialQuery]);

  // Client-side sort as fallback
  const filtered = [...products];
  if (sortBy === "price-low") filtered.sort((a, b) => a.priceNum - b.priceNum);
  if (sortBy === "price-high") filtered.sort((a, b) => b.priceNum - a.priceNum);
  if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 md:py-36 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/5 rounded-full" />
        <div className="max-w-[1200px] mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.4em] uppercase text-accent mb-5 font-medium"
          >
            Shop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Our <span className="text-accent">Collection</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-accent mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-[15px] max-w-[500px] mx-auto leading-relaxed"
          >
            {initialQuery ? `Results for "${initialQuery}"` : "Discover our curated selection of premium women's fashion."}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); updateUrl(cat, sortBy); }}
                className={`px-6 py-3 text-[12px] font-semibold tracking-wider uppercase border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent text-black border-accent"
                    : "bg-white text-text border-border hover:border-accent hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-28 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <p className="text-[13px] text-text font-medium">{filtered.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); updateUrl(activeCategory, e.target.value); }}
              className="px-5 py-3 border border-border text-[13px] text-charcoal bg-white focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              <option value="latest">Sort by: Latest</option>
              <option value="price-low">Sort by: Price Low to High</option>
              <option value="price-high">Sort by: Price High to Low</option>
              <option value="name">Sort by: Name A-Z</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-black/5 mb-5" />
                  <div className="h-4 bg-black/5 rounded w-1/3 mb-2" />
                  <div className="h-5 bg-black/5 rounded w-2/3 mb-1" />
                  <div className="h-5 bg-black/5 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="group"
                >
                  <Link href={`/product/${product.id}`} className="block cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-black border border-border">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      {product.badge && (
                        <span className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider z-10 ${
                          product.badge === "Bestseller" ? "bg-accent text-black" : product.badge === "New" ? "bg-white text-black" : "bg-black text-accent border border-accent/30"
                        }`}>
                          {product.badge}
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-accent py-3.5 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10">
                        <span className="text-[12px] font-bold text-black tracking-wider uppercase">View Details</span>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] text-text-light tracking-wider uppercase mb-1.5 font-medium">{product.category}</p>
                      <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-accent transition-colors mb-1.5">{product.name}</h3>
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
                        router.push("/checkout");
                      }}
                      className="mt-2 p-2.5 border border-border hover:border-accent hover:bg-accent hover:text-black text-text transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filtered.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-text font-medium">No products found in this category</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-text">Loading...</div></div>}>
      <ShopContent />
    </Suspense>
  );
}
