import { deliveryFee } from "./delivery";
import { getProduct, type Product } from "./products";

export type CartLine = { slug: string; qty: number };

export type ResolvedLine = CartLine & { product: Product; lineTotal: number };

export type CartTotals = {
  lines: ResolvedLine[];
  itemCount: number;
  subtotal: number;
  compareSubtotal: number;
  bundleSaving: number;
  /** Free 60ml bottles earned across the cart. */
  freeBottles: number;
  /** The chosen Karachi area, or null while the buyer has not picked one. */
  zoneId: string | null;
  /** Null until an area is chosen, so the total says so instead of guessing. */
  shipping: number | null;
  total: number;
};

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      const qty = Math.max(1, Math.min(20, Math.round(line.qty)));
      return { ...line, qty, product, lineTotal: product.price * qty };
    })
    .filter(Boolean) as ResolvedLine[];
}

export function computeTotals(
  rawLines: CartLine[],
  zoneInput?: string | null
): CartTotals {
  const lines = resolveLines(rawLines);
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const compareSubtotal = lines.reduce(
    (sum, l) => sum + (l.product.compareAt ?? l.product.price) * l.qty,
    0
  );
  const itemCount = lines.reduce((sum, l) => sum + l.qty, 0);
  const freeBottles = lines.reduce(
    (sum, l) => sum + (l.product.gift ? l.qty : 0),
    0
  );

  const fee = deliveryFee(zoneInput);
  const shipping = itemCount === 0 ? 0 : fee;

  return {
    lines,
    itemCount,
    subtotal,
    compareSubtotal,
    bundleSaving: Math.max(0, compareSubtotal - subtotal),
    freeBottles,
    zoneId: fee === null ? null : (zoneInput ?? null),
    shipping,
    total: subtotal + (shipping ?? 0),
  };
}
