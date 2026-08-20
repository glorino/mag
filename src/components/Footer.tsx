"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "#000", color: "#fff" }}>
      {/* Main Footer */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <Image src="/logo.jpeg" alt="MAGRE" width={36} height={36} style={{ objectFit: "contain" }} />
              <span style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "0.15em", color: "#fff" }}>MAGRE</span>
            </Link>
            <p style={{ color: "#999", fontSize: "13px", lineHeight: 1.8, marginTop: "16px" }}>
              Premium Nigerian fashion brand. Ready-to-wear blouses, trousers, and loungewear designed exclusively for women of all sizes.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {[
                { label: "F", href: "https://www.facebook.com" },
                { label: "I", href: "https://www.instagram.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 600, color: "#fff",
                    textDecoration: "none",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#00e5ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "20px" }}>Shop</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Shirt", "Trouser", "Nicker"].map((item) => (
                <li key={item}>
                  <Link href={`/shop?category=${item}`} style={{ color: "#aaa", fontSize: "13px", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "20px" }}>Help</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Size Guide", href: "/size-guide" },
                { name: "Shipping Info", href: "/faq" },
                { name: "Returns Policy", href: "/returns" },
                { name: "FAQ", href: "/faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} style={{ color: "#aaa", fontSize: "13px", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#00e5ff", marginBottom: "20px" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <a href={`tel:${BUSINESS.phone}`} style={{ color: "#aaa", fontSize: "13px", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} style={{ color: "#aaa", fontSize: "13px", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ color: "#666", fontSize: "12px", margin: 0 }}>
            &copy; 2026 MAGRE. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms & Conditions", href: "/terms" },
              { name: "Returns Policy", href: "/returns" },
              { name: "Size Guide", href: "/size-guide" },
            ].map((item) => (
              <Link key={item.name} href={item.href} style={{ color: "#666", fontSize: "12px", textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
