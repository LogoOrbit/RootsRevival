"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { computeTotals, type CartLine, type CartTotals } from "@/lib/cart";

const STORAGE_KEY = "rootsrevival.cart.v1";
const COUPON_KEY = "rootsrevival.coupon.v1";

type CartContextValue = {
  lines: CartLine[];
  coupon: string;
  totals: CartTotals;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setLines(JSON.parse(saved) as CartLine[]);
      const savedCoupon = window.localStorage.getItem(COUPON_KEY);
      if (savedCoupon) setCoupon(savedCoupon);
    } catch {
      /* storage can be blocked, the cart simply starts empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      window.localStorage.setItem(COUPON_KEY, coupon);
    } catch {
      /* ignore */
    }
  }, [lines, coupon, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((current) => {
      const existing = current.find((l) => l.slug === slug);
      if (existing) {
        return current.map((l) =>
          l.slug === slug ? { ...l, qty: Math.min(20, l.qty + qty) } : l
        );
      }
      return [...current, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((current) =>
      qty <= 0
        ? current.filter((l) => l.slug !== slug)
        : current.map((l) =>
            l.slug === slug ? { ...l, qty: Math.min(20, qty) } : l
          )
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => current.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    setCoupon("");
  }, []);

  const applyCoupon = useCallback((code: string) => {
    setCoupon(code.trim().toUpperCase());
  }, []);

  const totals = useMemo(() => computeTotals(lines, coupon), [lines, coupon]);

  const value = useMemo(
    () => ({ lines, coupon, totals, ready, add, setQty, remove, clear, applyCoupon }),
    [lines, coupon, totals, ready, add, setQty, remove, clear, applyCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
