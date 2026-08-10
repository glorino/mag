"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1578905326519-3aa98aa6a728?w=1920&h=1080&fit=crop&auto=format"
          alt="African Fashion Collection"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
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
              className="text-[12px] tracking-[0.3em] uppercase text-white/80 mb-4"
            >
              New Collection 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Elegant African<br />Fashion
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/90 text-[15px] mb-8 max-w-md mx-auto"
            >
              Discover our curated collection of ankara, adire, and contemporary African wear for the modern woman.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-4 justify-center"
            >
              <a href="#shop" className="bg-white text-charcoal px-8 py-3 text-[13px] font-semibold tracking-wider uppercase hover:bg-charcoal hover:text-white transition-all duration-300">
                Shop Now
              </a>
              <a href="#about" className="border border-white text-white px-8 py-3 text-[13px] font-semibold tracking-wider uppercase hover:bg-white hover:text-charcoal transition-all duration-300">
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
