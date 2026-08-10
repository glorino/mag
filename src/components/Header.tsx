"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const categories = [
  "New", "Adire", "Ankara", "Dresses", "Jumpsuits",
  "Kaftans", "Shorts", "Skirts", "Tops", "Tops & Jackets",
  "Sets", "Trousers",
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ${
        scrolled ? "shadow-[0_1px_10px_rgba(0,0,0,0.3)] py-2" : "py-3"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpeg"
            alt="MAGRE"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-bold tracking-[0.2em] text-white">
            MAGRE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.name === "Shop" && setShopOpen(true)}
              onMouseLeave={() => link.name === "Shop" && setShopOpen(false)}
            >
              <Link
                href={link.href}
                className={`nav-link text-[13px] font-medium tracking-wide transition-colors ${
                  pathname === link.href ? "text-accent" : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
              {link.name === "Shop" && shopOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="bg-black shadow-xl border border-white/10 py-3 min-w-[220px]">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href="/shop"
                        className="block px-5 py-2 text-[13px] text-white/60 hover:text-accent hover:bg-white/5 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart */}
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <svg className="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-black text-[9px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Mobile menu */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="px-6 py-6 bg-black border-t border-white/10 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-[13px] font-medium tracking-wide transition-colors py-3 border-b border-white/10 ${
                pathname === link.href ? "text-accent" : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/40 mb-3">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link key={cat} href="/shop" onClick={() => setMobileOpen(false)} className="text-[12px] text-white/60 hover:text-accent border border-white/20 px-3 py-1 hover:border-accent transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
