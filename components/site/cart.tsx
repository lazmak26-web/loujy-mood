"use client";

import * as React from "react";

type CartContextValue = {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<string[]>([]);
  const add = React.useCallback((id: string) => setItems((prev) => [...prev, id]), []);
  const remove = React.useCallback((id: string) => {
    setItems((prev) => {
      const i = prev.indexOf(id);
      return i === -1 ? prev : [...prev.slice(0, i), ...prev.slice(i + 1)];
    });
  }, []);
  const value = React.useMemo(() => ({ items, add, remove }), [items, add, remove]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
