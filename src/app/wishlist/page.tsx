"use client";

import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, priceNum: item.priceNum, category: item.category, image: item.image });
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto text-text-light mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1 className="text-2xl font-serif font-bold text-charcoal mb-3">Your Wishlist is Empty</h1>
          <p className="text-text text-[15px] mb-8">Save items you love to your wishlist.</p>
          <Link href="/shop" className="bg-accent text-black px-10 py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 inline-block">
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-[1000px] mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">My Wishlist</h1>
          <p className="text-text text-[14px] mb-10">{items.length} item{items.length !== 1 ? "s" : ""}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white border border-border group">
                <Link href={`/product/${item.id}`} className="block relative overflow-hidden aspect-[3/4]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-4">
                  <p className="text-[11px] text-text-light tracking-wider uppercase mb-1 font-medium">{item.category}</p>
                  <h3 className="text-[13px] font-semibold text-charcoal truncate mb-1">{item.name}</h3>
                  <p className="text-[14px] font-bold text-charcoal mb-3">{item.price}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleAddToCart(item)} className="flex-1 bg-accent text-black py-2.5 text-[11px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300">
                      Buy Now
                    </button>
                    <button onClick={() => removeItem(item.id)} className="w-10 h-10 border border-border flex items-center justify-center text-text-light hover:border-red-500 hover:text-red-500 transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
