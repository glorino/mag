"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  toast: string;
  addItem: (item: Omit<CartItem, "quantity">, size?: string, color?: string) => void;
  removeItem: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, size: string | undefined, quantity: number, color?: string) => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  showToast: (msg: string) => void;
  clearCart: () => void;
  syncCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "magre_cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
  return [];
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setItems(loadCartFromStorage());
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveCartToStorage(items);
    }
  }, [items, initialized]);

  useEffect(() => {
    const sync = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.items?.length > 0) {
          setItems((prev) => {
            if (prev.length === 0) return data.items;
            return prev;
          });
        }
      } catch {
        // Sync failed silently
      }
    };
    sync();
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, size?: string, color?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === size && i.color === color ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, size, color }];
    });
    showToast(`${item.name} added to cart`);
  }, []);

  const removeItem = useCallback((id: number, size?: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
  }, []);

  const updateQuantity = useCallback((id: number, size: string | undefined, quantity: number, color?: string) => {
    if (quantity <= 0) {
      removeItem(id, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i))
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const toggleCart = useCallback(() => setIsOpen((p) => !p), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useCallback(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useCallback(() => items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0), [items]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  const syncCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      }
    } catch {
      // Sync cart failed
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ items, isOpen, toast, addItem, removeItem, updateQuantity, toggleCart, closeCart, totalItems, totalPrice, showToast, clearCart, syncCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
