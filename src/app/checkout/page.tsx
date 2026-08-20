"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: Record<string, unknown>) => void;
  }
}

export default function CheckoutPage() {
  const { items, totalPrice, closeCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const subtotal = totalPrice();
  const discountAmount = Math.round((subtotal * promoDiscount) / 100);
  const finalTotal = subtotal - discountAmount;

  useEffect(() => {
    closeCart();

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setForm((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, [closeCart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError("");
    try {
      const res = await fetch("/api/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode, orderAmount: subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPromoError(data.error || "Invalid code");
        setPromoDiscount(0);
      } else {
        setPromoDiscount(data.discountPercent);
        setPromoError("");
      }
    } catch {
      setPromoError("Failed to validate code");
    } finally {
      setPromoLoading(false);
    }
  };

  const loadFlutterwave = (): Promise<void> => {
    return new Promise((resolve) => {
      if (window.FlutterwaveCheckout) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        amount: finalTotal,
          email: form.email,
          name: form.name,
          phone: form.phone,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            priceNum: item.priceNum,
            quantity: item.quantity,
            size: item.size,
            category: item.category,
            image: item.image,
          })),
          address: form.address,
          promoCode: promoCode || undefined,
          discount: discountAmount || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Payment initialization failed");
        setLoading(false);
        return;
      }

      await loadFlutterwave();

      window.FlutterwaveCheckout?.({
        public_key: process.env.NEXT_PUBLIC_FLWPUBK || "",
        tx_ref: data.tx_ref,
        amount: data.serverTotal,
        currency: "NGN",
        payment_options: "card,banktransfer,ussd",
        customer: {
          email: form.email,
          phone_number: form.phone,
          name: form.name,
        },
        customizations: {
          title: "MAGRE Fashion",
          description: "Payment for order",
          logo: "https://www.magre.com.ng/logo.jpeg",
        },
        redirect_url: `${window.location.origin}/checkout/verify`,
        meta: {
          items: JSON.stringify(items),
          address: form.address,
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
        },
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-[15px]">Your cart is empty</p>
          <Link href="/shop" className="text-accent text-[13px] font-medium mt-3 inline-block hover:text-accent-dark">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-16">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Shipping form */}
            <div className="bg-[#111] border border-white/10 p-6">
              <h2 className="text-[13px] font-bold text-white/60 tracking-wider uppercase mb-6">Shipping Information</h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-white/50 mb-2 tracking-wide uppercase">Shipping Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-black border border-white/15 text-white px-4 py-3.5 text-[14px] focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Order summary */}
            <div className="bg-[#111] border border-white/10 p-6 h-fit lg:sticky lg:top-24">
              <h2 className="text-[13px] font-bold text-white/60 tracking-wider uppercase mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] truncate">{item.name}</p>
                      <p className="text-white/35 text-[11px]">
                        Qty: {item.quantity}
                        {item.size && ` • ${item.size}`}
                      </p>
                    </div>
                    <p className="text-white text-[13px] font-medium whitespace-nowrap">
                      ₦{(item.priceNum * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-[13px]">Subtotal</span>
                  <span className="text-white text-[14px]">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-[13px]">Shipping</span>
                  <span className="text-white text-[14px]">Free</span>
                </div>

                {/* Promo Code */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Promo code"
                      className="flex-1 bg-black border border-white/15 text-white px-3 py-2 text-[13px] focus:outline-none focus:border-accent transition-colors"
                    />
                    <button
                      onClick={applyPromo}
                      disabled={promoLoading || !promoCode.trim()}
                      className="px-4 py-2 border border-accent text-accent text-[11px] font-bold tracking-wider uppercase hover:bg-accent hover:text-black transition-all duration-300 disabled:opacity-50"
                    >
                      {promoLoading ? "..." : "Apply"}
                    </button>
                  </div>
                  {promoError && <p className="text-red-400 text-[11px] mt-1.5">{promoError}</p>}
                  {promoDiscount > 0 && (
                    <p className="text-green-400 text-[11px] mt-1.5">{promoDiscount}% discount applied!</p>
                  )}
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 text-[13px]">Discount ({promoDiscount}%)</span>
                    <span className="text-green-400 text-[14px]">-₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-white font-semibold text-[15px]">Total</span>
                  <span className="text-accent font-bold text-[18px]">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-accent text-black py-4 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300 mt-6 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>

              <p className="text-white/25 text-[11px] text-center mt-4">
                Secure payment powered by Flutterwave
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
