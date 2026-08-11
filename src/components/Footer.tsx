import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.jpeg" alt="MAGRE" width={36} height={36} className="object-contain" />
              <span className="text-xl font-bold tracking-[0.2em]">MAGRE</span>
            </Link>
            <p className="text-white/50 text-[13px] leading-relaxed mt-4">
              Premium Nigerian fashion brand. Ready-to-wear shirts, trousers, and nickers designed exclusively for women of all sizes.
            </p>
            <div className="flex gap-3 mt-6">
              {["Facebook", "Instagram"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors text-[11px] font-medium text-white hover:text-black">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-[12px] tracking-widest uppercase mb-5 text-accent">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-white/50 text-[13px] hover:text-white transition-colors">Shirts</Link></li>
              <li><Link href="/shop" className="text-white/50 text-[13px] hover:text-white transition-colors">Trousers</Link></li>
              <li><Link href="/shop" className="text-white/50 text-[13px] hover:text-white transition-colors">Nicker</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold text-[12px] tracking-widest uppercase mb-5 text-accent">Help</h4>
            <ul className="space-y-3">
              <li><Link href="/size-guide" className="text-white/50 text-[13px] hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="text-white/50 text-[13px] hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-white/50 text-[13px] hover:text-white transition-colors">Returns Policy</Link></li>
              <li><Link href="/faq" className="text-white/50 text-[13px] hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[12px] tracking-widest uppercase mb-5 text-accent">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/50 text-[13px] hover:text-white transition-colors">About MAGRE</Link></li>
              <li><Link href="/contact" className="text-white/50 text-[13px] hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[12px]">
            &copy; 2026 MAGRE. All rights reserved.
          </p>
          <div className="flex gap-5 text-[12px] text-white/40">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/returns" className="hover:text-white transition-colors">Returns Policy</Link>
            <Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
