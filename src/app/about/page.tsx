"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <main className="pt-[120px]">
      {/* Hero */}
      <section className="relative py-20 bg-charcoal text-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3"
          >
            About Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-white/30 mx-auto"
          />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
                A Legacy of African Elegance
              </h2>
              <div className="divider mb-6" />
              <div className="space-y-4 text-text leading-relaxed">
                <p>
                  GZK is a premium Nigerian fashion brand rooted in the rich traditions of West African textile artistry. Founded in Lagos, we create ready-to-wear pieces that seamlessly blend traditional African prints with modern silhouettes.
                </p>
                <p>
                  Every garment is thoughtfully designed and handcrafted using premium fabrics sourced from across West Africa. From vibrant ankara to indigo adire, we honor the artisans and cultures that inspire our collections.
                </p>
                <p>
                  We believe fashion is a form of self-expression, and our mission is to empower women across Africa and beyond with clothing that celebrates heritage, culture, and contemporary style.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-warm-gray to-cream border border-border flex items-center justify-center">
                <div className="text-center text-text-light">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-[12px] tracking-widest uppercase">Our Story</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-charcoal text-white p-6 max-w-[180px]">
                <span className="block text-3xl font-bold font-serif">8+</span>
                <span className="text-[12px] text-white/70">Years of fashion excellence</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                text: "To celebrate African heritage through fashion by creating high-quality, contemporary clothing that empowers women to express their cultural identity with confidence and pride. We aim to make premium African fashion accessible to women across the globe.",
              },
              {
                title: "Our Vision",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                text: "To become the leading African fashion brand recognized worldwide for quality, innovation, and cultural authenticity. We envision a future where African fashion sits at the forefront of global style, telling stories of heritage through every stitch and pattern.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white p-10 border border-border"
              >
                <div className="w-16 h-16 bg-charcoal/5 flex items-center justify-center text-charcoal mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">{item.title}</h3>
                <div className="divider mb-4" />
                <p className="text-text leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">
              The GZK Difference
            </h2>
            <div className="divider mx-auto" />
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Premium Quality",
                desc: "Every piece is crafted with the finest African fabrics, ensuring durability, comfort, and timeless elegance that lasts beyond seasons.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Inclusive Sizing",
                desc: "We design for every body. Our extended size range ensures every woman can find her perfect fit and feel confident in GZK.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                ),
                title: "Authentically African",
                desc: "Our fabrics are sourced directly from skilled artisans across West Africa, supporting local economies and preserving traditional craftsmanship.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Fast Delivery",
                desc: "Orders are dispatched within 48 hours. Enjoy 3-7 day delivery across Nigeria, with same-day delivery available in Lagos.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                title: "Easy Returns",
                desc: "Not satisfied? Return within 7 days for a full refund. Your satisfaction is our priority, no questions asked.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Expert Support",
                desc: "Our dedicated team is available via phone, email, or WhatsApp to help with sizing, styling, and any questions you may have.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="p-8 border border-border hover:border-charcoal/30 transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-charcoal/5 flex items-center justify-center text-charcoal mb-5">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-charcoal text-[15px] mb-3">{item.title}</h3>
                <p className="text-[13px] text-text leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="section-padding bg-charcoal text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-2">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
              What We Stand For
            </h2>
            <div className="divider mx-auto bg-white/30" />
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { num: "01", title: "Heritage", desc: "We honor African textile traditions and the artisans who keep them alive." },
              { num: "02", title: "Quality", desc: "Premium fabrics and meticulous craftsmanship in every single piece." },
              { num: "03", title: "Innovation", desc: "Blending traditional prints with contemporary design for the modern woman." },
              { num: "04", title: "Empowerment", desc: "Fashion that makes women feel confident, beautiful, and connected to their roots." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="text-center p-8 border border-white/10 hover:border-white/30 transition-colors duration-300"
              >
                <span className="text-4xl font-serif font-bold text-white/20">{item.num}</span>
                <h3 className="text-xl font-serif font-bold mt-4 mb-3">{item.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-cream">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
              Ready to Experience GZK?
            </h2>
            <p className="text-text mb-8">
              Explore our collection and discover pieces that celebrate your unique style and African heritage.
            </p>
            <Link
              href="/shop"
              className="btn-primary inline-flex"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
