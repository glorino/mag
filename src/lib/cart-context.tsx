"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  pattern: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  toast: string;
  addItem: (item: Omit<CartItem, "quantity">, size?: string) => void;
  removeItem: (id: number, size?: string) => void;
  updateQuantity: (id: number, size: string | undefined, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");

  const addItem = useCallback((item: Omit<CartItem, "quantity">, size?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, size }];
    });
    showToast(`${item.name} added to cart`);
  }, []);

  const removeItem = useCallback((id: number, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQuantity = useCallback((id: number, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
    );
  }, [removeItem]);

  const toggleCart = useCallback(() => setIsOpen((p) => !p), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = useCallback(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useCallback(() => items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0), [items]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  return (
    <CartContext.Provider
      value={{ items, isOpen, toast, addItem, removeItem, updateQuantity, toggleCart, closeCart, totalItems, totalPrice, showToast }}
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
