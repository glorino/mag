"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
                  <p><strong>MAGRE Concept</strong></p>
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
