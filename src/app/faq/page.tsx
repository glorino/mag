"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "How do I make payments?",
    a: "You can pay via bank transfer, ATM card online, or cash at our store. GZK CONCEPT DIAMOND BANK ACCOUNT NUMBER 0045114433. You can also pay on delivery for orders within Lagos.",
  },
  {
    q: "How long is delivery?",
    a: "Delivery takes between 3-7 working days after full payment has been confirmed. Orders are dispatched within 48 hours of payment confirmation. We aim to dispatch all orders as quickly as possible.",
  },
  {
    q: "Do you deliver nationwide?",
    a: "We deliver to all cities and towns in Nigeria. Pay on delivery is available for customers within Lagos only. For deliveries outside Lagos, full payment must be made before dispatch.",
  },
  {
    q: "What is your return policy?",
    a: "All returns should be made within 7 days upon delivery. Your item must be unused and in the same condition that you received it. To complete your return, we require a receipt or proof of purchase.",
  },
  {
    q: "How do I place an order?",
    a: "Go to our website www.gzknigeria.net, select your items and make payment via our various payment options: pay on delivery (Lagos only), bank transfer, online payment with ATM card, or walk into our shop and pay cash.",
  },
  {
    q: "What sizes do you offer?",
    a: "We offer sizes from Small to XXL (sizes 8-22). Please refer to our Size Guide for detailed measurements to help you find your perfect fit.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order has been dispatched, you will receive a confirmation message with tracking details. You can also contact us directly for order updates.",
  },
  {
    q: "Do you offer custom orders?",
    a: "Yes, we accept custom orders for special occasions. Please contact us with your requirements and we'll provide a quote and timeline.",
  },
];

export default function FAQPage() {
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
            Help Center
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-white/30 mx-auto"
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="border border-border p-6 hover:border-charcoal/30 transition-colors duration-300"
              >
                <h3 className="font-semibold text-charcoal text-[15px] mb-3">{faq.q}</h3>
                <p className="text-[13px] text-text leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-10 bg-cream"
          >
            <h3 className="text-xl font-serif font-bold text-charcoal mb-3">Still Have Questions?</h3>
            <p className="text-text text-[13px] mb-6">
              Can&apos;t find what you&apos;re looking for? Our team is here to help.
            </p>
            <a href="tel:08184118997" className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 text-[13px] font-medium tracking-wider uppercase hover:bg-brand-dark transition-all duration-300 border-none cursor-pointer">
              Call Us: 08184118997
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
