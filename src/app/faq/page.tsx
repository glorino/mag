"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqCategories = [
  {
    category: "Orders & Payment",
    items: [
      {
        q: "How do I make payments?",
        a: "You can pay via bank transfer, ATM card online, or cash at our store. MAGRE CONCEPT DIAMOND BANK ACCOUNT NUMBER 0045114433. You can also pay on delivery for orders placed anywhere in Nigeria.",
      },
      {
        q: "How do I place an order?",
        a: "Go to our website, select your items and make payment via our various payment options: pay on delivery, bank transfer, or online payment with ATM card.",
      },
      {
        q: "Can I track my order?",
        a: "Yes! Once your order has been dispatched, you will receive a confirmation message with tracking details. You can also contact us directly for order updates.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long is delivery?",
        a: "Delivery takes between 3-7 working days after full payment has been confirmed. Orders are dispatched within 48 hours of payment confirmation.",
      },
      {
        q: "Do you deliver nationwide?",
        a: "We deliver to all cities and towns in Nigeria. Pay on delivery is available for customers across Nigeria. For international orders, full payment must be made before dispatch.",
      },
    ],
  },
  {
    category: "Returns & Sizing",
    items: [
      {
        q: "What is your return policy?",
        a: "All returns should be made within 7 days upon delivery. Your item must be unused and in the same condition that you received it. To complete your return, we require a receipt or proof of purchase.",
      },
      {
        q: "What sizes do you offer?",
        a: "We offer sizes from Small to XXL (sizes 8-22). Please refer to our Size Guide for detailed measurements to help you find your perfect fit.",
      },
      {
        q: "Do you offer custom orders?",
        a: "Yes, we accept custom orders for special occasions. Please contact us with your requirements and we'll provide a quote and timeline.",
      },
    ],
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: { q: string; a: string }; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border hover:border-accent/30 transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-8 py-6 text-left"
      >
        <span className={`font-semibold text-[15px] transition-colors duration-300 ${isOpen ? "text-accent" : "text-charcoal"}`}>
          {faq.q}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : "text-text-light"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-6 text-[14px] text-text leading-relaxed border-t border-border/50 pt-5">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

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
            Help Center
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Frequently Asked <span className="text-accent">Questions</span>
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
            Everything you need to know about shopping with MAGRE.
          </motion.p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-28 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="space-y-14">
            {faqCategories.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6 font-medium">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.items.map((faq) => {
                    const key = faq.q;
                    return (
                      <FAQItem
                        key={key}
                        faq={faq}
                        isOpen={openIndex === key}
                        onToggle={() => setOpenIndex(openIndex === key ? null : key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center p-14 bg-black text-white"
          >
            <h3 className="text-2xl font-serif font-bold mb-4">Still Have Questions?</h3>
            <div className="w-[40px] h-[2px] bg-accent mx-auto mb-5" />
            <p className="text-white/50 text-[15px] mb-10 max-w-md mx-auto">
              Can&apos;t find what you&apos;re looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:08184118997" className="inline-flex items-center justify-center gap-2 bg-accent text-black px-10 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us: 08184118997
              </a>
              <a href="mailto:info@magre.ng" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-white/20 transition-all duration-300">
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
