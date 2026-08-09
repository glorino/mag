export default function About() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand/10 to-accent/20 flex items-center justify-center">
              <div className="text-center text-brand/30">
                <svg
                  className="w-32 h-32 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={0.8}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="mt-4 text-sm tracking-widest uppercase">
                  Our Story
                </p>
              </div>
            </div>

            {/* Accent card */}
            <div className="absolute -bottom-8 -right-8 bg-brand text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
              <span className="block text-3xl font-bold font-serif">8+</span>
              <span className="text-sm text-white/80">
                Years of crafting African fashion excellence
              </span>
            </div>
          </div>

          {/* Text side */}
          <div className="space-y-8">
            <div>
              <span className="text-brand text-sm font-semibold tracking-[0.3em] uppercase">
                About MAG
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3">
                Where Heritage
                <span className="block text-brand">Meets Modern</span>
              </h2>
            </div>

            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Founded in the heart of Lagos, MAG is a contemporary African
                fashion brand that celebrates the beauty and richness of Nigerian
                textile traditions. We create ready-to-wear pieces that seamlessly
                blend traditional African prints with modern silhouettes.
              </p>
              <p>
                Every garment is thoughtfully designed and handcrafted using
                premium fabrics sourced from across West Africa. From vibrant
                ankara to indigo adire, we honor the artisans and cultures that
                inspire our collections.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ),
                  title: "Quality First",
                  desc: "Premium fabrics & craftsmanship",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  ),
                  title: "Pan-African",
                  desc: "Fabrics sourced from West Africa",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                  title: "Women-Centric",
                  desc: "Designed for every body type",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Fast Delivery",
                  desc: "3-7 days within Nigeria",
                },
              ].map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/5 flex items-center justify-center text-brand shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-500">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
