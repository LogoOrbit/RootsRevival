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

type CartContextValue = {
  lines: CartLine[];
  /** Bumped on every add, so the header can play its animation. */
  addedTick: number;
  /** How many bottles the last add put in, for the floating count. */
  addedQty: number;
  totals: CartTotals;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [addedTick, setAddedTick] = useState(0);
  const [addedQty, setAddedQty] = useState(1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setLines(JSON.parse(saved) as CartLine[]);
    } catch {
      /* storage can be blocked, the cart simply starts empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setAddedTick((tick) => tick + 1);
    setAddedQty(qty);
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
  }, []);

  const totals = useMemo(() => computeTotals(lines), [lines]);

  const value = useMemo(
    () => ({
      lines,
      addedTick,
      addedQty,
      totals,
      ready,
      add,
      setQty,
      remove,
      clear,
    }),
    [lines, addedTick, addedQty, totals, ready, add, setQty, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
