const testimonials = [
  {
    name: "Adaeze O.",
    location: "Lagos, Nigeria",
    text: "The quality of MAG pieces is unmatched. Every time I wear my ankara set, I get endless compliments. The fabric is premium and the fit is perfect.",
    rating: 5,
  },
  {
    name: "Fatima B.",
    location: "Abuja, Nigeria",
    text: "I ordered a custom kaftan for my sister's wedding and it exceeded my expectations. MAG truly understands how to blend African heritage with modern elegance.",
    rating: 5,
  },
  {
    name: "Chidinma E.",
    location: "Port Harcourt, Nigeria",
    text: "Finally a brand that makes clothes I feel confident and comfortable in. The sizing guide was accurate and delivery was fast. Will definitely order again!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-charcoal text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-[0.3em] uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real stories from women who wear MAG with confidence every day.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-brand/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
