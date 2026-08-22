/**
 * Product catalogue, bundle deals and coupon codes.
 * Everything the shop sells is defined in this one file.
 */

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  bottles: number;
  volume: string;
  price: number;
  compareAt: number;
  badge?: string;
  ribbon?: string;
  summary: string;
  highlights: string[];
  freeDelivery: boolean;
  bestValue?: boolean;
};

export const products: Product[] = [
  {
    slug: "starter",
    name: "Roots Revival Herbal Hair Oil, Single Bottle",
    shortName: "Single Bottle",
    bottles: 1,
    volume: "250ml e 8.45 fl.oz",
    price: 1850,
    compareAt: 2400,
    badge: "Most Popular",
    ribbon: "Save Rs 550",
    summary:
      "One full size bottle of our handmade herbal hair oil. Perfect for a first month of care.",
    highlights: [
      "250ml glass safe bottle in a printed gift box",
      "Lasts roughly one month with regular use",
      "Cash on delivery all over Pakistan",
    ],
    freeDelivery: false,
  },
  {
    slug: "duo",
    name: "Roots Revival Herbal Hair Oil, Duo Pack",
    shortName: "Duo Pack",
    bottles: 2,
    volume: "2 x 250ml",
    price: 3400,
    compareAt: 4800,
    badge: "Best Seller",
    ribbon: "Save Rs 1,400",
    summary:
      "Two bottles for a complete treatment course, or one for you and one to gift.",
    highlights: [
      "Two full size 250ml bottles",
      "Free delivery all over Pakistan",
      "The course length our customers see the best results with",
    ],
    freeDelivery: true,
  },
  {
    slug: "family",
    name: "Roots Revival Herbal Hair Oil, Family Pack",
    shortName: "Family Pack",
    bottles: 3,
    volume: "3 x 250ml",
    price: 4700,
    compareAt: 7200,
    badge: "Best Value",
    ribbon: "Save Rs 2,500",
    summary:
      "Three bottles at our lowest price per bottle. Made for families and for resellers.",
    highlights: [
      "Three full size 250ml bottles",
      "Free delivery all over Pakistan",
      "Lowest price per bottle we offer",
    ],
    freeDelivery: true,
    bestValue: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const heroProduct = products[0];

/* Coupon codes */

export type Coupon = {
  code: string;
  kind: "percent" | "flat" | "shipping";
  value: number;
  minimum: number;
  label: string;
};

export const coupons: Coupon[] = [
  {
    code: "REVIVE10",
    kind: "percent",
    value: 10,
    minimum: 0,
    label: "10 percent off your first order",
  },
  {
    code: "ROOTS15",
    kind: "percent",
    value: 15,
    minimum: 3000,
    label: "15 percent off orders of Rs 3,000 and above",
  },
  {
    code: "FREESHIP",
    kind: "shipping",
    value: 0,
    minimum: 0,
    label: "Free delivery on any order",
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const clean = code.trim().toUpperCase();
  return coupons.find((c) => c.code === clean);
}

/* Ingredients, taken from the product label */

export type Ingredient = { name: string; note: string };

export const ingredients: Ingredient[] = [
  { name: "Mustard Oil", note: "A warming base oil that wakes up a tired scalp." },
  { name: "Coconut Oil", note: "Sinks into the hair shaft and guards against protein loss." },
  { name: "Castor Oil", note: "Thick and rich, loved for fuller looking edges and lashes of length." },
  { name: "Amla", note: "The classic vitamin C berry for strength and natural shine." },
  { name: "Hibiscus", note: "Conditions the strands and keeps the scalp calm." },
  { name: "Kalonji (Black Seed)", note: "Traditionally used to support fresh growth." },
  { name: "Fenugreek Seeds", note: "Methi, the grandmother remedy for thinning hair." },
  { name: "Neem Leaves", note: "Keeps flakes and scalp irritation in check." },
  { name: "Reetha", note: "Soap nut that cleanses gently without stripping." },
  { name: "Shikakai", note: "Softens, detangles and adds slip." },
  { name: "Rose Petals", note: "Cooling comfort and a soft natural fragrance." },
  { name: "Rosemary", note: "A favourite for scalp circulation." },
  { name: "Vitamin E Oil", note: "Antioxidant care for stressed lengths." },
  { name: "Rosemary Essential Oil", note: "Concentrated rosemary, added at the final stage." },
  { name: "Kalonji Oil", note: "Cold pressed black seed oil for extra nourishment." },
  { name: "Neem Oil", note: "Pure neem to help control dandruff." },
];

export const benefits = [
  { title: "Helps reduce hair fall", note: "Strengthens the strand where it meets the scalp." },
  { title: "Nourishes and strengthens roots", note: "Herb infused oils feed the follicle." },
  { title: "Promotes healthy hair growth", note: "Kalonji, methi and rosemary working together." },
  { title: "Improves scalp health", note: "Neem and reetha keep the scalp clean and calm." },
  { title: "Adds natural shine and softness", note: "Amla, hibiscus and shikakai smooth the cuticle." },
  { title: "Helps control dandruff", note: "Neem leaves and neem oil settle flaking." },
  { title: "Supports thick, strong and long hair", note: "Consistent use over weeks builds real thickness." },
];

export const howToUse = [
  { step: "Shake well before use", note: "The herbs settle naturally, so give the bottle a good shake." },
  { step: "Take the required amount of oil", note: "A small bowl of oil is plenty for medium length hair." },
  { step: "Apply on scalp and hair roots", note: "Part the hair in sections and reach the scalp itself." },
  { step: "Massage gently for 5 to 10 minutes", note: "Use your fingertips in slow circles, never your nails." },
  { step: "Leave it for 2 to 4 hours or overnight", note: "Overnight gives the deepest nourishment." },
  { step: "Use 2 to 3 times a week", note: "Consistency matters far more than quantity." },
];

export const assurances = [
  "100% Natural",
  "Cruelty Free",
  "Paraben Free",
  "Silicone Free",
  "Mineral Oil Free",
  "Sulphate Free",
  "Made in Pakistan",
];
