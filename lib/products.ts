/**
 * The three products we sell. Prices live here, all wording lives in lib/i18n
 * so the shop reads the same in English and in Urdu.
 */

export type ProductSlug = "starter" | "duo" | "family";

export type Product = {
  slug: ProductSlug;
  bottles: number;
  price: number;
  /** What the same bottles cost bought one at a time, when that is more. */
  compareAt?: number;
  /** A free 60ml bottle ships with this pack. */
  gift?: boolean;
  bestValue?: boolean;
};

/** The price of a single 250ml bottle, the yardstick for the bigger packs. */
export const bottlePrice = 1400;

export const products: Product[] = [
  { slug: "starter", bottles: 1, price: bottlePrice },
  { slug: "duo", bottles: 2, price: 2800, gift: true },
  { slug: "family", bottles: 3, price: 4000, compareAt: 3 * bottlePrice, bestValue: true },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const heroProduct = products[1];

export function savingOf(product: Product): number {
  return product.compareAt ? product.compareAt - product.price : 0;
}

export function percentOff(product: Product): number {
  return product.compareAt ? Math.round((savingOf(product) / product.compareAt) * 100) : 0;
}

/** True when the pack costs less than the same bottles bought one at a time. */
export function hasSaving(product: Product): boolean {
  return savingOf(product) > 0;
}
