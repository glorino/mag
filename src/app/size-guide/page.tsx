"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const dressSizes = [
  { size: "S", bust: "34-35", waist: "26-27", hip: "36-37" },
  { size: "M", bust: "36-37", waist: "28-29", hip: "38-39" },
  { size: "L", bust: "38-39", waist: "30-31", hip: "40-41" },
  { size: "XL", bust: "40-41", waist: "32-33", hip: "42-43" },
  { size: "XXL", bust: "42-44", waist: "34-36", hip: "44-46" },
  { size: "3XL", bust: "45-47", waist: "37-39", hip: "47-49" },
];

const topSizes = [
  { size: "S", bust: "34-35", waist: "26-28", length: "24" },
  { size: "M", bust: "36-37", waist: "29-30", length: "25" },
  { size: "L", bust: "38-39", waist: "31-32", length: "26" },
  { size: "XL", bust: "40-41", waist: "33-34", length: "27" },
  { size: "XXL", bust: "42-44", waist: "35-37", length: "28" },
];

const bottomSizes = [
  { size: "S", waist: "26-27", hip: "36-37", inseam: "30" },
  { size: "M", waist: "28-29", hip: "38-39", inseam: "30" },
  { size: "L", waist: "30-31", hip: "40-41", inseam: "30" },
  { size: "XL", waist: "32-33", hip: "42-43", inseam: "30" },
  { size: "XXL", waist: "34-36", hip: "44-46", inseam: "30" },
];

function HowToMeasure() {
  return (
    <motion.div {...fadeIn} className="bg-cream p-8 border border-border">
      <h3 className="text-xl font-serif font-bold text-charcoal mb-4">How to Measure</h3>
      <div className="space-y-4 text-text text-[13px] leading-relaxed">
        <div>
          <p className="font-semibold text-charcoal mb-1">Bust</p>
          <p>Measure around the fullest part of your bust, keeping the tape horizontal.</p>
        </div>
        <div>
          <p className="font-semibold text-charcoal mb-1">Waist</p>
          <p>Measure around the narrowest part of your natural waistline, just above the navel.</p>
        </div>
        <div>
          <p className="font-semibold text-charcoal mb-1">Hip</p>
          <p>Measure around the fullest part of your hips and buttocks.</p>
        </div>
        <div>
          <p className="font-semibold text-charcoal mb-1">Inseam</p>
          <p>Measure from the crotch to the bottom of the inner leg.</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SizeGuidePage() {
  return (
    <main className="pt-[120px]">
      {/* Hero */}
      <section className="relative py-20 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3"
          >
            Customer Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Size Guide
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-white/30 mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/60 mt-4 text-[13px]"
          >
            All measurements are in inches. Find your perfect fit.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Dress Sizes */}
            <motion.div {...fadeIn}>
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Dresses & Jumpsuits</h2>
              <div className="divider mb-4" />
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-3 py-2 text-left font-medium">Size</th>
                      <th className="px-3 py-2 text-left font-medium">Bust</th>
                      <th className="px-3 py-2 text-left font-medium">Waist</th>
                      <th className="px-3 py-2 text-left font-medium">Hip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dressSizes.map((s, i) => (
                      <tr key={s.size} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                        <td className="px-3 py-2 font-semibold text-charcoal">{s.size}</td>
                        <td className="px-3 py-2 text-text">{s.bust}</td>
                        <td className="px-3 py-2 text-text">{s.waist}</td>
                        <td className="px-3 py-2 text-text">{s.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Top Sizes */}
            <motion.div {...fadeIn} transition={{ delay: 0.1, duration: 0.5 }}>
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Tops & Blouses</h2>
              <div className="divider mb-4" />
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-3 py-2 text-left font-medium">Size</th>
                      <th className="px-3 py-2 text-left font-medium">Bust</th>
                      <th className="px-3 py-2 text-left font-medium">Waist</th>
                      <th className="px-3 py-2 text-left font-medium">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSizes.map((s, i) => (
                      <tr key={s.size} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                        <td className="px-3 py-2 font-semibold text-charcoal">{s.size}</td>
                        <td className="px-3 py-2 text-text">{s.bust}</td>
                        <td className="px-3 py-2 text-text">{s.waist}</td>
                        <td className="px-3 py-2 text-text">{s.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Bottom Sizes */}
            <motion.div {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }}>
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Trousers & Skirts</h2>
              <div className="divider mb-4" />
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="px-3 py-2 text-left font-medium">Size</th>
                      <th className="px-3 py-2 text-left font-medium">Waist</th>
                      <th className="px-3 py-2 text-left font-medium">Hip</th>
                      <th className="px-3 py-2 text-left font-medium">Inseam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bottomSizes.map((s, i) => (
                      <tr key={s.size} className={i % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
                        <td className="px-3 py-2 font-semibold text-charcoal">{s.size}</td>
                        <td className="px-3 py-2 text-text">{s.waist}</td>
                        <td className="px-3 py-2 text-text">{s.hip}</td>
                        <td className="px-3 py-2 text-text">{s.inseam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* How to Measure */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <HowToMeasure />

            <motion.div {...fadeIn} transition={{ delay: 0.2, duration: 0.5 }} className="bg-cream p-8 border border-border">
              <h3 className="text-xl font-serif font-bold text-charcoal mb-4">Need Help?</h3>
              <p className="text-text text-[13px] leading-relaxed mb-6">
                If you&apos;re between sizes or unsure about which size to order, we&apos;re here to help! Our team can provide personalised sizing recommendations based on your measurements.
              </p>
              <div className="space-y-2 text-[13px] text-text">
                <p><strong>WhatsApp:</strong> 08184118997</p>
                <p><strong>Email:</strong> info@magre.ng</p>
                <p><strong>Hours:</strong> Mon - Sat, 9am - 6pm</p>
              </div>
              <div className="mt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-transparent text-black px-8 py-3 text-[12px] font-bold tracking-wider uppercase hover:bg-accent hover:text-black transition-all duration-300 border border-black cursor-pointer">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop" className="inline-flex items-center gap-2 bg-accent text-black px-8 py-3 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 border-none cursor-pointer">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
