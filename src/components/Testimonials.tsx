"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Adaeze O.",
    location: "Lagos, Nigeria",
    text: "The quality of MAGRE pieces is unmatched. Every time I wear my ankara shirt, I get endless compliments. The fabric is premium and the fit is perfect.",
    rating: 5,
  },
  {
    name: "Fatima B.",
    location: "Abuja, Nigeria",
    text: "I ordered a custom outfit for my sister's wedding and it exceeded my expectations. MAGRE truly understands how to blend African heritage with modern elegance.",
    rating: 5,
  },
  {
    name: "Chidinma E.",
    location: "Port Harcourt, Nigeria",
    text: "Finally a brand that makes clothes I feel confident and comfortable in. The sizing guide was accurate and delivery was fast. Will definitely order again!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3 font-medium">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            What Our Clients Say
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white/5 border border-white/10 p-8 hover:border-accent/30 transition-colors duration-300"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-[14px] leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-[14px]">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-[13px]">{t.name}</p>
                  <p className="text-[11px] text-white/40">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
