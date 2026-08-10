"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            Legal
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-white/30 mx-auto"
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
            className="prose prose-charcoal max-w-none"
          >
            <p className="text-text-light text-[12px] mb-8">Last updated: January 2026</p>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">1. Information We Collect</h2>
                <p className="text-text leading-relaxed">
                  When you visit our website, place an order, or contact us, we may collect personal information including your name, email address, phone number, shipping address, and payment details. We also collect non-personal information such as browser type, device information, and browsing behavior to improve our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">2. How We Use Your Information</h2>
                <ul className="text-text leading-relaxed space-y-2 list-disc list-inside">
                  <li>To process and fulfill your orders</li>
                  <li>To communicate with you about your orders, products, and promotions</li>
                  <li>To improve our website and customer experience</li>
                  <li>To send periodic emails about new products, offers, or other information we think you may find interesting</li>
                  <li>To respond to your customer service requests and support needs</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">3. Data Protection</h2>
                <p className="text-text leading-relaxed">
                  We implement a variety of security measures to maintain the safety of your personal information. Your personal data is stored in secured networks and is only accessible by a limited number of authorized personnel who have special access rights and are required to keep the information confidential.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">4. Cookies</h2>
                <p className="text-text leading-relaxed">
                  Our website uses cookies to enhance your browsing experience. Cookies are small files that a site transfers to your computer&apos;s hard drive through your web browser. You can choose to disable cookies through your browser settings, though some features of our site may not function properly as a result.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">5. Third-Party Services</h2>
                <p className="text-text leading-relaxed">
                  We may employ third-party companies and individuals to facilitate our services, provide service on our behalf, or perform service-related activities. These third parties have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">6. Your Rights</h2>
                <p className="text-text leading-relaxed">
                  You have the right to access, correct, or delete your personal information at any time. You may also opt out of receiving marketing communications from us by following the unsubscribe link in our emails or contacting us directly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-charcoal mb-3">7. Contact Us</h2>
                <p className="text-text leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-3 text-text">
                  <p><strong>GZK Concept</strong></p>
                  <p>35 Eric Moore Close, Off Eric Moore Road, Surulere, Lagos</p>
                  <p>Email: info@gzknigeria.net</p>
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
