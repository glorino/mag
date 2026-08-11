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
    <div style={{ border: "1px solid #e5e5e5" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          textAlign: "left",
          background: open ? "#fafafa" : "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "14px", color: open ? "#00e5ff" : "#000", paddingRight: "16px" }}>
          {q}
        </span>
        <span
          style={{
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: open ? "#00e5ff" : "#f0f0f0",
            color: open ? "#000" : "#999",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.3s",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0, overflow: "hidden", transition: "all 0.3s" }}>
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{ width: "40px", height: "2px", background: "#00e5ff", marginBottom: "12px" }} />
          <p style={{ fontSize: "13px", color: "#333", lineHeight: 1.7 }}>{a}</p>
        </div>
      </div>
    </div>
  );
}

const contactCards = [
  {
    title: "Location",
    lines: ["35 Eric Moore Close,", "Off Eric Moore Road,", "Surulere, Lagos."],
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Contact",
    lines: ["08184118997", "08033449004", "info@magre.ng"],
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    title: "Hours",
    lines: ["Mon - Fri: 8am - 5pm", "Sat: 11am - 6pm", "Sun: Closed"],
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export default function Contact() {
  return (
    <>
      {/* Contact Section */}
      <section style={{ padding: "80px 0", background: "#f9f7f5" }} id="contact">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>
              Get in Touch
            </p>
            <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#000", marginBottom: "16px", fontFamily: "var(--font-playfair), serif" }}>
              Contact MAGRE
            </h2>
            <div style={{ width: "60px", height: "2px", background: "#00e5ff", margin: "0 auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {contactCards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#fff",
                  textAlign: "center",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ background: "#000", padding: "32px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{
                    width: "56px", height: "56px",
                    border: "1px solid rgba(0,229,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#00e5ff",
                  }}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                    </svg>
                  </div>
                </div>
                <div style={{ padding: "32px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "15px", color: "#000", marginBottom: "12px" }}>{card.title}</h3>
                  <div>
                    {card.lines.map((line) => (
                      <p key={line} style={{ fontSize: "13px", color: "#888", lineHeight: 1.7 }}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "80px 0", background: "#fff" }} id="faq">
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>
              FAQ
            </p>
            <h3 style={{ fontSize: "30px", fontWeight: 700, color: "#000", marginBottom: "16px", fontFamily: "var(--font-playfair), serif" }}>
              Frequently Asked Questions
            </h3>
            <div style={{ width: "60px", height: "2px", background: "#00e5ff", margin: "0 auto" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
