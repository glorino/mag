"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
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
            className="text-[11px] tracking-[0.4em] uppercase text-accent mb-4 font-medium"
          >
            Customer Service
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Returns Policy
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-accent mx-auto mb-6"
          />
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-text-light text-[12px] mb-8">Last updated: January 2026</p>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Return Window</h2>
                <p className="text-text leading-relaxed">
                  We want you to love your MAGRE purchase. If for any reason you are not completely satisfied, you may return your item(s) within <strong>7 days</strong> of receiving your order for a full refund or exchange.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Eligibility</h2>
                <p className="text-text leading-relaxed">To be eligible for a return, your item must be:</p>
                <ul className="text-text leading-relaxed space-y-2 list-disc list-inside mt-2">
                  <li>Unused and in the same condition that you received it</li>
                  <li>In its original packaging with all tags still attached</li>
                  <li>Accompanied by the original receipt or proof of purchase</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Non-Returnable Items</h2>
                <p className="text-text leading-relaxed">The following items cannot be returned:</p>
                <ul className="text-text leading-relaxed space-y-2 list-disc list-inside mt-2">
                  <li>Items that have been worn, washed, or altered</li>
                  <li>Items without original tags or packaging</li>
                  <li>Items purchased on final sale or with a clearance discount</li>
                  <li>Custom-made or tailored orders</li>
                  <li>Accessories (jewelry, scarves, etc.) for hygiene reasons</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">How to Initiate a Return</h2>
                <ol className="text-text leading-relaxed space-y-3 list-decimal list-inside">
                  <li>Contact our customer service team via WhatsApp at <strong>08184118997</strong> or email at <strong>info@magre.ng</strong> with your order number and reason for return.</li>
                  <li>Our team will review your request and provide you with a return authorization and instructions.</li>
                  <li>Pack the item(s) securely in the original packaging.</li>
                  <li>Ship the item(s) to the address provided by our customer service team.</li>
                  <li>Once received and inspected, we will process your refund or exchange within 5-7 business days.</li>
                </ol>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Refund Process</h2>
                <p className="text-text leading-relaxed">
                  Refunds will be credited to the original payment method within 5-7 business days after we receive and inspect the returned item. You will receive an email notification once your refund has been processed. Please note that shipping costs are non-refundable.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Exchanges</h2>
                <p className="text-text leading-relaxed">
                  We are happy to exchange items for a different size or colour, subject to availability. If you need to exchange for a different product, we recommend placing a new order and returning the original item for a refund.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Damaged or Defective Items</h2>
                <p className="text-text leading-relaxed">
                  If you receive a damaged or defective item, please contact us within 48 hours of receiving your order with photos of the damage. We will arrange for a replacement or full refund at no additional cost to you.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Return Shipping</h2>
                <p className="text-text leading-relaxed">
                  Return shipping costs are the responsibility of the customer unless the item is defective or we made an error. We recommend using a trackable shipping service for your protection.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">Contact Us</h2>
                <p className="text-text leading-relaxed">
                  If you have any questions about our Returns Policy, please contact us at:
                </p>
                <div className="mt-3 text-text">
                  <p><strong>MAGRE Concept</strong></p>
                  <p>Phone: 08184118997</p>
                  <p>Email: info@magre.ng</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Link href="/shop" className="inline-flex items-center gap-2 bg-accent text-black px-8 py-3 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 border-none cursor-pointer">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
