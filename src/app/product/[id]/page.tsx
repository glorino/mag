"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import Reviews from "@/components/Reviews";

interface ProductImage {
  url: string;
  isFeatured: boolean;
}

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  badge?: string;
  image: string;
  images: ProductImage[];
  description: string;
  sizes: string[];
  colors: string[];
  details: string[];
  related?: Product[];
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
    } catch {
      setError("Product not found");
    }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text text-sm">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-accent hover:underline">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum: product.priceNum,
        category: product.category,
        image: product.image,
      },
      selectedSize || undefined,
      selectedColor || undefined
    );
    router.push("/checkout");
  };

  const related = product.related || [];

  return (
    <main className="">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-[13px] text-text-light">
            <Link href="/" className="hover:text-charcoal">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-charcoal">Shop</Link>
            <span>/</span>
            <span className="text-charcoal">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product */}
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-[3/4] bg-black overflow-hidden mb-3">
                <img
                  src={product.images[selectedImage]?.url || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
                    product.badge === "Bestseller" ? "bg-accent text-black" : product.badge === "New" ? "bg-white text-black" : "bg-black text-accent border border-accent/30"
                  }`}>
                    {product.badge}
                  </span>
                )}
                {product.images.length > 1 && (
                  <span className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 text-white text-[11px] font-medium rounded z-10">
                    {selectedImage + 1} / {product.images.length}
                  </span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 w-16 h-20 border-2 overflow-hidden transition-colors ${
                        selectedImage === index ? "border-accent" : "border-border hover:border-text-light"
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                      {img.isFeatured && (
                        <span className="absolute bottom-0 left-0 right-0 bg-accent/90 text-black text-[8px] font-bold text-center py-0.5">MAIN</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-2 font-medium">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-3">{product.name}</h1>
              <div className="w-16 h-[2px] bg-accent mb-4" />
              <p className="text-2xl font-bold text-charcoal mb-6">{product.price}</p>
              <p className="text-text leading-relaxed mb-8">{product.description}</p>

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-3">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 text-[13px] font-medium border transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-accent text-black border-accent"
                            : "bg-white text-charcoal border-border hover:border-charcoal"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Colours */}
              <div className="mb-8">
                <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-3">Select Colour</p>
                <div className="flex flex-wrap gap-2">
                  {(product.colors.length > 0 ? product.colors : ["Black", "White", "Red", "Blue", "Pink", "Green", "Grey", "Navy"]).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-[13px] font-medium border transition-all duration-300 ${
                        selectedColor === color
                          ? "bg-accent text-black border-accent"
                          : "bg-white text-charcoal border-border hover:border-charcoal"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 text-[13px] font-bold tracking-wider uppercase transition-all duration-300 border-none cursor-pointer bg-accent text-black hover:bg-accent-dark"
                >
                  Add to Cart & Checkout
                </button>
                <button
                  onClick={() => {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist({ id: product.id, name: product.name, price: product.price, priceNum: product.priceNum, category: product.category, image: product.image });
                    }
                  }}
                  className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isInWishlist(product.id) ? "border-red-500 text-red-500 bg-red-500/10" : "border-border text-text-light hover:border-accent hover:text-accent"
                  }`}
                >
                  <svg className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Details */}
              {product.details.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-[12px] font-semibold text-charcoal uppercase tracking-wider mb-3">Product Details</p>
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li key={i} className="text-[13px] text-text flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.3em] uppercase text-text-light mb-3 font-medium">You May Also Like</p>
              <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Related Products</h2>
              <div className="w-16 h-[2px] bg-accent mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-black border border-border">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    {p.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 ${
                        p.badge === "Bestseller" ? "bg-accent text-black" : p.badge === "New" ? "bg-white text-black" : "bg-black text-accent border border-accent/30"
                      }`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-accent transition-colors mb-1">{p.name}</h3>
                  <p className="text-[15px] font-bold text-charcoal">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <Reviews productId={id} />
        </div>
      </section>
    </main>
  );
}
