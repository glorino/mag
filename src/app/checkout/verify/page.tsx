"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    const txStatus = searchParams.get("status");

    if (!transactionId) {
      setStatus("error");
      return;
    }

    if (txStatus === "cancelled") {
      setStatus("error");
      return;
    }

    fetch(`/api/payment/verify?transaction_id=${transactionId}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.success) {
          setOrderId(String(data.order?.id || ""));
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-[400px] px-6"
      >
        <div className="w-20 h-20 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-3">Verifying Payment...</h1>
        <p className="text-white/40 text-[14px]">Please wait while we confirm your payment.</p>
      </motion.div>
    );
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-[400px] px-6"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Payment Successful!</h1>
        <p className="text-white/40 text-[14px] mb-2">Your order has been placed successfully.</p>
        {orderId && (
          <p className="text-white/30 text-[13px] mb-8">
            Order ID: <span className="text-accent font-mono">#{orderId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard/orders" className="bg-accent text-black px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300">
            View Orders
          </Link>
          <Link href="/shop" className="border border-white/15 text-white px-8 py-3.5 text-[13px] font-medium tracking-wider uppercase hover:border-white/30 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-[400px] px-6"
    >
      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Payment Issue</h1>
      <p className="text-white/40 text-[14px] mb-8">
        Your payment could not be verified. Please contact support if you were charged.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/checkout" className="bg-accent text-black px-8 py-3.5 text-[13px] font-bold tracking-wider uppercase hover:bg-accent-dark transition-all duration-300">
          Try Again
        </Link>
        <Link href="/" className="border border-white/15 text-white px-8 py-3.5 text-[13px] font-medium tracking-wider uppercase hover:border-white/30 transition-colors">
          Go Home
        </Link>
      </div>
    </motion.div>
  );
}

export default function CheckoutVerifyPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
      <Suspense fallback={<div className="text-white/40">Loading...</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
