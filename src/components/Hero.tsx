export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-cream via-white to-warm-gray overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text */}
        <div className="space-y-8">
          <div className="animate-fade-in-up opacity-0">
            <span className="inline-block text-brand text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              New Collection 2026
            </span>
          </div>

          <h1 className="animate-fade-in-up opacity-0 delay-100 text-5xl md:text-7xl font-serif font-bold text-charcoal leading-[1.1]">
            Embrace Your
            <span className="block text-brand italic"> African</span>
            <span className="block">Elegance</span>
          </h1>

          <p className="animate-fade-in-up opacity-0 delay-200 text-lg text-gray-600 max-w-lg leading-relaxed">
            Discover handcrafted contemporary African fashion that celebrates
            heritage, culture, and the modern woman. Every piece tells a story.
          </p>

          <div className="animate-fade-in-up opacity-0 delay-300 flex flex-wrap gap-4">
            <a href="#shop" className="btn-primary">
              Shop Collection
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a href="#about" className="btn-outline">
              Our Story
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up opacity-0 delay-400 flex gap-12 pt-8">
            <div>
              <span className="block text-3xl font-bold text-brand font-serif">
                500+
              </span>
              <span className="text-sm text-gray-500 tracking-wide">
                Happy Clients
              </span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-brand font-serif">
                200+
              </span>
              <span className="text-sm text-gray-500 tracking-wide">
                Unique Designs
              </span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-brand font-serif">
                100%
              </span>
              <span className="text-sm text-gray-500 tracking-wide">
                African Made
              </span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative animate-fade-in opacity-0 delay-200">
          <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-accent/30 z-10" />
            <div className="w-full h-full bg-gradient-to-br from-brand-light/40 to-accent/60 flex items-center justify-center">
              <div className="text-center text-white/80">
                <svg
                  className="w-24 h-24 mx-auto mb-4 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm tracking-widest uppercase opacity-60">
                  Hero Image
                </p>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl animate-fade-in-up opacity-0 delay-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-brand"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  Free Delivery
                </p>
                <p className="text-xs text-gray-500">Within Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
