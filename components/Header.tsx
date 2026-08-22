"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "./Logo";
import { useCart } from "./CartProvider";
import { brand, waLink } from "@/lib/brand";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/offers", label: "Offers" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/usage", label: "How To Use" },
  { href: "/about", label: "Our Story" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { totals } = useCart();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        solid
          ? "bg-cream/95 shadow-[0_6px_24px_rgba(18,53,36,0.08)] backdrop-blur"
          : "bg-cream"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <LogoLink size="sm" />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline text-[0.82rem] uppercase tracking-[0.14em] transition-colors ${
                  active ? "text-gold" : "text-forest hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={waLink(`Assalam o Alaikum, I would like to know more about ${brand.name} herbal hair oil.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-forest/20 px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-forest transition-colors hover:bg-forest hover:text-cream sm:inline-flex"
          >
            WhatsApp
          </a>

          <Link
            href="/cart"
            aria-label="View cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream transition-colors hover:bg-forest-deep"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 7h12l-1.2 12.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" strokeLinejoin="round" />
              <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
            </svg>
            {totals.itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-semibold text-forest-deep">
                {totals.itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-cream px-6 pb-10 pt-4 lg:hidden">
          <nav className="flex flex-col">
            {[...nav, { href: "/faq", label: "FAQ" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-cream-deep py-4 font-display text-2xl text-forest"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/shop" className="btn btn-gold mt-8 w-full">
            Shop The Oil
          </Link>
          <a
            href={waLink(`Assalam o Alaikum, I would like to order ${brand.name} herbal hair oil.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-3 w-full"
          >
            Order On WhatsApp
          </a>
          <p className="mt-6 text-center text-sm text-muted">
            {brand.contact.whatsappDisplay}
            <br />
            {brand.contact.email}
          </p>
        </div>
      ) : null}
    </header>
  );
}
