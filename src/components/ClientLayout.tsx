"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/lib/cart-context";
import CartSidebar from "@/components/CartSidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isDashboard = pathname.startsWith("/dashboard");
  const isCheckout = pathname.startsWith("/checkout");
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <CartProvider>
      {!isAdmin && !isDashboard && !isAuth && <Header />}
      {children}
      {!isAdmin && !isDashboard && <Footer />}
      {!isAdmin && !isDashboard && <WhatsAppButton />}
      {!isAdmin && !isDashboard && <CartSidebar />}
      <Toast />
    </CartProvider>
  );
}

function Toast() {
  return <div id="toast" className="fixed bottom-[100px] right-6 bg-black text-accent px-6 py-3.5 text-[13px] font-semibold z-[200] translate-y-5 opacity-0 transition-all duration-300 pointer-events-none" />;
}
