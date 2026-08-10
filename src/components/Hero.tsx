"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-white pt-[72px]">
      {/* Top bar */}
      <div className="bg-charcoal text-white text-center py-2">
        <p className="text-[12px] tracking-wider">
          Free delivery within Lagos on orders above ₦50,000
        </p>
      </div>

      {/* Banner */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-r from-cream to-warm-gray overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[12px] tracking-[0.3em] uppercase text-text-light mb-4"
            >
              New Collection 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-7xl font-serif font-bold text-charcoal mb-6 leading-tight"
            >
              Elegant African<br />Fashion
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-text text-[15px] mb-8 max-w-md mx-auto"
            >
              Discover our curated collection of ankara, adire, and contemporary African wear for the modern woman.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-4 justify-center"
            >
              <a href="#shop" className="btn-primary">
                Shop Now
              </a>
              <a href="#about" className="btn-outline">
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
