"use client";

import { useState } from "react";

const faqs = [
  { q: "How do I make payments?", a: "You can pay via bank transfer, ATM card online, or cash at our store. MAGRE CONCEPT DIAMOND BANK ACCOUNT NUMBER 0045114433." },
  { q: "How long is delivery?", a: "Delivery takes between 3-7 working days after full payment has been confirmed. Orders are dispatched within 48 hours of payment confirmation." },
  { q: "Do you deliver nationwide?", a: "We deliver to all cities and towns in Nigeria. Pay on delivery is available for customers within Lagos only." },
  { q: "What is your return policy?", a: "All returns should be made within 7 days upon delivery. Your item must be unused and in the same condition that you received it." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-5 text-left ${open ? "bg-gray-50" : "bg-white hover:bg-gray-50"}`}
      >
        <span className={`font-semibold text-[14px] pr-4 ${open ? "text-[#00e5ff]" : "text-black"}`}>{q}</span>
        <span className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${open ? "bg-[#00e5ff] text-black rotate-180" : "bg-gray-100 text-gray-500"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pt-1">
          <div className="w-10 h-[2px] bg-[#00e5ff] mb-3" />
          <p className="text-[13px] text-gray-500 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <section className="py-20 bg-[#f9f7f5]" id="contact">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">Contact MAGRE</h2>
            <div className="w-16 h-[2px] bg-[#00e5ff] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Location",
                lines: ["35 Eric Moore Close,", "Off Eric Moore Road,", "Surulere, Lagos."],
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: "Contact",
                lines: ["08184118997", "08033449004", "info@magre.ng"],
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Hours",
                lines: ["Mon - Fri: 8am - 5pm", "Sat: 11am - 6pm", "Sun: Closed"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-black py-8 flex items-center justify-center">
                  <div className="w-14 h-14 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-black text-[15px] mb-3">{item.title}</h3>
                  <div className="space-y-1">
                    {item.lines.map((line) => (
                      <p key={line} className="text-[13px] text-gray-500 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="faq">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-3 font-medium">FAQ</p>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-black mb-4">Frequently Asked Questions</h3>
            <div className="w-16 h-[2px] bg-[#00e5ff] mx-auto" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
