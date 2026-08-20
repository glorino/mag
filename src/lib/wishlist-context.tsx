"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "quantity">) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("magre_wishlist");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      localStorage.removeItem("magre_wishlist");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("magre_wishlist", JSON.stringify(items));
    } catch {
      // Storage unavailable
    }
  }, [items]);

  const addItem = useCallback((item: Omit<WishlistItem, "quantity">) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInWishlist = useCallback((id: number) => items.some((i) => i.id === id), [items]);

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
