"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            Terms & Conditions
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
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">1. General</h2>
                <p className="text-text leading-relaxed">
                  By accessing and using the MAGRE website (magre.ng), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">2. Products & Pricing</h2>
                <p className="text-text leading-relaxed">
                  All products displayed on our website are subject to availability. We reserve the right to modify or discontinue any product at any time without prior notice. Prices for our products are subject to change without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of a product.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">3. Orders</h2>
                <p className="text-text leading-relaxed">
                  By placing an order, you represent that all information provided is accurate and complete. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available, inaccuracies in product or pricing information, or errors identified by our fraud detection system.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">4. Payment</h2>
                <p className="text-text leading-relaxed">
                  Payment must be received in full before an order is processed. We accept payments through our secure payment partners. All payment information is encrypted and securely processed. MAGRE Concept does not store your credit card details.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">5. Shipping & Delivery</h2>
                <p className="text-text leading-relaxed">
                  We aim to dispatch all orders within 48 hours of confirmation. Delivery times vary depending on your location and selected shipping method. Estimated delivery within Lagos is 1-3 business days, while other states within Nigeria may take 3-7 business days. We are not responsible for delays caused by courier services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">6. Intellectual Property</h2>
                <p className="text-text leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of MAGRE Concept and is protected by Nigerian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">7. Limitation of Liability</h2>
                <p className="text-text leading-relaxed">
                  MAGRE Concept shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or products. Our total liability shall not exceed the total amount paid by you for the product(s) in question.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">8. Governing Law</h2>
                <p className="text-text leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of Nigerian courts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">9. Changes to Terms</h2>
                <p className="text-text leading-relaxed">
                  We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">10. Contact Us</h2>
                <p className="text-text leading-relaxed">
                  For questions regarding these Terms and Conditions, please contact us at:
                </p>
                <div className="mt-3 text-text">
                  <p><strong>MAGRE Concept</strong></p>
                  <p>35 Eric Moore Close, Off Eric Moore Road, Surulere, Lagos</p>
                  <p>Email: info@magre.ng</p>
                  <p>Phone: 08184118997</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
