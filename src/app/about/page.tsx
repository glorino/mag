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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Born with Heritage, <br className="hidden md:block" />
            <span className="text-accent">Worn Everywhere</span>
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
            className="text-white/50 text-[15px] max-w-[600px] mx-auto leading-relaxed"
          >
            Premium Nigerian fashion celebrating African heritage through contemporary design.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
                A Legacy of African Elegance
              </h2>
              <div className="w-[60px] h-[2px] bg-accent mb-8" />
              <div className="space-y-5 text-text leading-relaxed text-[15px]">
                <p>
                  MAGRE is a premium Nigerian fashion brand rooted in the rich traditions of West African textile artistry. From its origins, we create ready-to-wear pieces that seamlessly blend traditional African prints with modern silhouettes.
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
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1627577279497-4b24bf1021b6?w=600&h=750&fit=crop"
                  alt="MAGRE Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-black text-white p-8 max-w-[200px]">
                <span className="block text-4xl font-bold font-serif text-accent">8+</span>
                <span className="text-[12px] text-white/60 leading-relaxed">Years of fashion excellence across Nigeria</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">What Drives Us</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              Mission & Vision
            </h2>
            <div className="w-[60px] h-[2px] bg-accent mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                text: "To celebrate African heritage through fashion by creating high-quality, contemporary clothing that empowers women to express their cultural identity with confidence and pride.",
              },
              {
                title: "Our Vision",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                text: "To become the leading African fashion brand recognized worldwide for quality, innovation, and cultural authenticity.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white p-10 border border-border group hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">{item.title}</h3>
                <div className="w-[40px] h-[2px] bg-accent mb-5" />
                <p className="text-text leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              The MAGRE Difference
            </h2>
            <div className="w-[60px] h-[2px] bg-accent mx-auto" />
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                num: "01",
                title: "Premium Quality",
                desc: "Every piece is crafted with the finest African fabrics, ensuring durability, comfort, and timeless elegance.",
              },
              {
                num: "02",
                title: "Inclusive Sizing",
                desc: "We design for every body. Our extended size range ensures every woman can find her perfect fit.",
              },
              {
                num: "03",
                title: "Authentically African",
                desc: "Fabrics sourced directly from skilled artisans across West Africa, supporting local economies.",
              },
              {
                num: "04",
                title: "Fast Delivery",
                desc: "Orders dispatched within 48 hours. 3-7 day delivery across Nigeria, 1-3 days for major cities.",
              },
              {
                num: "05",
                title: "Easy Returns",
                desc: "Not satisfied? Return within 7 days for a full refund. Your satisfaction is our priority.",
              },
              {
                num: "06",
                title: "Expert Support",
                desc: "Dedicated team available via phone, email, or WhatsApp for sizing, styling, and questions.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                className="p-8 bg-cream/50 border border-border hover:border-accent/30 hover:bg-white transition-all duration-500 group"
              >
                <span className="text-3xl font-serif font-bold text-accent/30 group-hover:text-accent transition-colors duration-500">{item.num}</span>
                <h3 className="font-bold text-charcoal text-[15px] mt-4 mb-3">{item.title}</h3>
                <p className="text-[13px] text-text leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-28 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-4 font-medium">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              What We Stand For
            </h2>
            <div className="w-[60px] h-[2px] bg-accent mx-auto" />
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
                className="text-center p-8 border border-white/10 hover:border-accent/50 transition-all duration-500 group"
              >
                <span className="text-4xl font-serif font-bold text-accent/40 group-hover:text-accent transition-colors duration-500">{item.num}</span>
                <h3 className="text-xl font-serif font-bold mt-4 mb-3">{item.title}</h3>
                <div className="w-[30px] h-[2px] bg-accent mx-auto mb-4 group-hover:w-[50px] transition-all duration-500" />
                <p className="text-[13px] text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "8+", label: "Years in Business" },
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Unique Designs" },
              { value: "All", label: "Sizes Available" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="block text-3xl md:text-4xl font-serif font-bold text-charcoal">{stat.value}</span>
                <span className="text-[12px] text-text mt-2 block">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-black text-white text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Experience <span className="text-accent">MAGRE</span>?
            </h2>
            <p className="text-white/50 mb-10">
              Explore our collection and discover pieces that celebrate your unique style and African heritage.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-accent text-black px-10 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
