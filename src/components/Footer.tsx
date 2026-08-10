const footerLinks = {
  shop: ["New Arrivals", "Ankara", "Adire", "Kaftans", "Dresses", "Tops & Sets"],
  help: ["Size Guide", "Shipping Info", "Returns Policy", "FAQ", "Track Order"],
  company: ["About GZK", "Contact", "Blog", "See Who is Wearing GZK"],
};

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold tracking-[0.15em]">GZK</span>
            <p className="text-white/50 text-[13px] leading-relaxed mt-3">
              GZK is a clothing brand located in Lagos Nigeria. We produce ready to wear dresses, blouses, shirts, jackets and tunics for women of all sizes.
            </p>
            <div className="flex gap-3 mt-5">
              {["Facebook", "Instagram"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-[11px] font-medium">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-[12px] tracking-widest uppercase mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 text-[13px] hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[12px]">
            Copyright {new Date().getFullYear()} GZK Concept. All rights reserved. Designed by DEE&apos;S WEBVERSE.
          </p>
          <div className="flex gap-4 text-[12px] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
