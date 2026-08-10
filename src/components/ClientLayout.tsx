"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import CartSidebar from "@/components/CartSidebar";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar />
      {/* Toast */}
      <Toast />
    </CartProvider>
  );
}

function Toast() {
  return <div id="toast" className="fixed bottom-[100px] right-6 bg-black text-accent px-6 py-3.5 text-[13px] font-semibold z-[200] translate-y-5 opacity-0 transition-all duration-300 pointer-events-none" />;
}
