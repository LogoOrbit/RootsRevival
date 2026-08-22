import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.site.url;
  const now = new Date();

  const pages = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/offers", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/ingredients", priority: 0.8 },
    { path: "/usage", priority: 0.7 },
    { path: "/reviews", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/payment", priority: 0.5 },
    { path: "/policies", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  return [
    ...pages.map((page) => ({
      url: `${base}${page.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page.priority,
    })),
    ...products.map((product) => ({
      url: `${base}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
