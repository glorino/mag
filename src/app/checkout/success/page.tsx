"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
  }, [orderId, router]);

  if (!orderId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-[400px] px-6"
    >
      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">Payment Successful!</h1>
      <p className="text-white/40 text-[14px] mb-2">
        Your order has been placed successfully.
      </p>
      <p className="text-white/30 text-[13px] mb-8">
        Order ID: <span className="text-accent font-mono">#{orderId}</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/dashboard/orders"
          className="bg-accent text-black px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300"
        >
          View Orders
        </Link>
        <Link
          href="/shop"
          className="border border-white/15 text-white px-8 py-3.5 text-[13px] font-medium tracking-wider uppercase hover:border-white/30 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-black pb-16 flex items-center justify-center">
      <Suspense fallback={<div className="text-white/40">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
