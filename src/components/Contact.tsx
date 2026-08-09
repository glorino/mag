export default function Contact() {
  return (
    <section className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <span className="text-brand text-sm font-semibold tracking-[0.3em] uppercase">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3">
                We&apos;d Love to
                <span className="block text-brand">Hear From You</span>
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Have a question about our products, need help with sizing, or want
              to place a custom order? Reach out to us and we&apos;ll respond
              within 24 hours.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Visit Us</h4>
                  <p className="text-gray-500 text-sm">
                    35 Eric Moore Close, Off Eric Moore Road,
                    <br />
                    Surulere, Lagos, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Call Us</h4>
                  <p className="text-gray-500 text-sm">
                    0818 411 8997
                    <br />
                    0803 344 9004
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-500 text-sm">info@mag.ng</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">
                    Business Hours
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Mon - Fri: 8am - 5pm
                    <br />
                    Saturday: 11am - 6pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-cream/50 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">
              Send a Message
            </h3>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
              />
              <select className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm">
                <option value="">Select Inquiry Type</option>
                <option value="order">Order Inquiry</option>
                <option value="custom">Custom Order</option>
                <option value="returns">Returns & Exchanges</option>
                <option value="wholesale">Wholesale</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-charcoal placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm resize-none"
              />
              <button type="submit" className="btn-primary w-full justify-center">
                Send Message
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
