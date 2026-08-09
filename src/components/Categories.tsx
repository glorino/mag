const categories = [
  {
    name: "Ankara",
    description: "Bold prints, timeless style",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    name: "Kaftans",
    description: "Flowing elegance",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Adire",
    description: "Indigo heritage",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    name: "Dresses",
    description: "Ready-to-wear luxury",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    name: "Tops & Sets",
    description: "Mix & match perfection",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="section-padding bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand text-sm font-semibold tracking-[0.3em] uppercase">
            Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From vibrant ankara prints to serene adire, find the perfect piece
            for every occasion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group cursor-pointer text-center p-6 rounded-2xl border border-gray-100 hover:border-brand/30 hover:bg-cream/50 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-brand/5 group-hover:bg-brand/10 flex items-center justify-center text-brand transition-all duration-300 group-hover:scale-110">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-charcoal mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
