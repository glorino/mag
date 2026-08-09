const products = [
  {
    id: 1,
    name: "Oyin Wrap Set",
    price: "₦42,500",
    category: "Tops & Sets",
    color: "Wine",
    sizes: ["S", "M", "L", "XL"],
    badge: "Bestseller",
    gradient: "from-rose-300/40 to-purple-300/40",
  },
  {
    id: 2,
    name: "Ada Cullottes Set",
    price: "₦38,000",
    category: "Tops & Sets",
    color: "Emerald",
    sizes: ["S", "M", "L"],
    badge: "New",
    gradient: "from-emerald-300/40 to-teal-300/40",
  },
  {
    id: 3,
    name: "Oliha Kaftan",
    price: "₦86,500",
    category: "Kaftans",
    color: "Beige",
    sizes: ["S", "M", "L"],
    badge: null,
    gradient: "from-amber-200/40 to-orange-200/40",
  },
  {
    id: 4,
    name: "Sally Ankara Dress",
    price: "₦45,000",
    category: "Dresses",
    color: "Blue Multi",
    sizes: ["S", "M", "L", "XL"],
    badge: "Bestseller",
    gradient: "from-blue-300/40 to-indigo-300/40",
  },
  {
    id: 5,
    name: "Anni Co-ord Set",
    price: "₦52,000",
    category: "Tops & Sets",
    color: "Mustard",
    sizes: ["M", "L", "XL"],
    badge: "New",
    gradient: "from-yellow-300/40 to-amber-300/40",
  },
  {
    id: 6,
    name: "Kele Wrap Top",
    price: "₦28,500",
    category: "Tops",
    color: "Black",
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: null,
    gradient: "from-gray-300/40 to-slate-300/40",
  },
  {
    id: 7,
    name: "Kimono Jacket",
    price: "₦35,000",
    category: "Tops & Jackets",
    color: "Green",
    sizes: ["S", "M", "L"],
    badge: null,
    gradient: "from-green-300/40 to-emerald-300/40",
  },
  {
    id: 8,
    name: "Amadi Kaftan",
    price: "₦86,500",
    category: "Kaftans",
    color: "Beige Damask",
    sizes: ["S", "M", "L"],
    badge: "Premium",
    gradient: "from-stone-200/40 to-amber-200/40",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-warm-gray/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-brand text-sm font-semibold tracking-[0.3em] uppercase">
              Featured
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-4">
              Bestselling Pieces
            </h2>
            <p className="text-gray-500 max-w-lg">
              Our most loved designs, handcrafted with premium African fabrics
              and modern silhouettes.
            </p>
          </div>
          <a
            href="#"
            className="mt-6 md:mt-0 text-brand font-semibold text-sm tracking-wide hover:underline underline-offset-4 flex items-center gap-2"
          >
            View All Products
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <div
                  className={`product-image w-full h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
                >
                  <svg
                    className="w-16 h-16 text-gray-400/50"
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
                </div>

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${
                      product.badge === "Bestseller"
                        ? "bg-brand text-white"
                        : product.badge === "New"
                        ? "bg-emerald-500 text-white"
                        : "bg-charcoal text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Quick actions */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="w-full py-3 bg-white/95 backdrop-blur-sm text-charcoal text-sm font-semibold rounded-xl hover:bg-white transition-colors shadow-lg">
                    Add to Cart
                  </button>
                </div>

                {/* Wishlist */}
                <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <p className="text-xs text-brand font-medium tracking-wide uppercase">
                  {product.category}
                </p>
                <h3 className="font-semibold text-charcoal group-hover:text-brand transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-charcoal text-lg">
                    {product.price}
                  </span>
                  <div className="flex gap-1">
                    {product.sizes.slice(0, 3).map((size) => (
                      <span
                        key={size}
                        className="text-[10px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5"
                      >
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 3 && (
                      <span className="text-[10px] text-gray-400">
                        +{product.sizes.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
