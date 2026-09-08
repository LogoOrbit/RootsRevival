"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoLink } from "./Logo";
import { useCart } from "./CartProvider";
import { useSite } from "./Providers";
import { brand, waLink } from "@/lib/brand";
import { CartIcon, GlobeIcon, MoonIcon, SunIcon, WhatsappIcon } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const { totals, addedTick, addedQty } = useCart();
  const { t, lang, setLang, theme, toggleTheme } = useSite();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const nav = [
    { href: "/shop", label: t.nav.shop },
    { href: "/offers", label: t.nav.offers },
    { href: "/ingredients", label: t.nav.ingredients },
    { href: "/usage", label: t.nav.usage },
    { href: "/about", label: t.nav.about },
    { href: "/reviews", label: t.nav.reviews },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => setOpen(false), [pathname]);

  /* Play the cart animation once per add, then clear it so it can play again. */
  useEffect(() => {
    if (addedTick === 0) return;
    setJustAdded(true);
    const timer = window.setTimeout(() => setJustAdded(false), 1000);
    return () => window.clearTimeout(timer);
  }, [addedTick]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        solid ? "glass shadow-[0_6px_24px_rgba(18,53,36,0.12)]" : "bg-bg"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <LogoLink size="sm" />

        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline text-[0.8rem] uppercase tracking-[0.12em] transition-colors ${
                  active ? "text-gold" : "text-heading hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className="flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-[0.7rem] uppercase tracking-[0.1em] text-heading transition-colors hover:border-gold hover:text-gold"
            aria-label={t.common.language}
            title={t.common.language}
          >
            <GlobeIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.otherLangName}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-heading transition-colors hover:border-gold hover:text-gold"
            aria-label={t.common.theme}
            title={t.common.theme}
          >
            {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>

          <a
            href={waLink(
              `Assalam o Alaikum, I would like to know more about ${brand.name} herbal hair oil.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-full bg-[#1faa54] px-4 text-[0.72rem] uppercase tracking-[0.1em] text-white transition-transform hover:scale-105 lg:inline-flex"
          >
            <WhatsappIcon className="me-1.5 h-4 w-4" />
            WhatsApp
          </a>

          <Link
            href="/cart"
            aria-label={t.nav.cart}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-band text-bandtext transition-transform hover:scale-105 ${
              justAdded ? "cart-ring" : ""
            }`}
          >
            <span className={justAdded ? "cart-bump" : ""}>
              <CartIcon className="h-5 w-5" />
            </span>
            {totals.itemCount > 0 ? (
              <span
                key={totals.itemCount}
                className="badge-pop absolute -top-1 -end-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-hibiscus px-1 text-[0.68rem] font-semibold text-white"
              >
                {totals.itemCount}
              </span>
            ) : null}
            {justAdded ? (
              <span
                aria-hidden="true"
                className="plus-one pointer-events-none absolute -top-2 start-1/2 -translate-x-1/2 text-sm font-bold text-gold"
              >
                +{addedQty}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-heading xl:hidden"
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
        <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100vh-5rem)] overflow-y-auto bg-bg px-6 pb-10 pt-2 shadow-[0_20px_40px_rgba(0,0,0,0.18)] xl:hidden">
          <nav className="flex flex-col">
            {[...nav, { href: "/faq", label: t.nav.faq }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-4 font-display text-2xl text-heading"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/shop" className="btn btn-gold mt-7 w-full">
            {t.common.shopTheOil}
          </Link>
          <a
            href={waLink(`Assalam o Alaikum, I would like to order ${brand.name} herbal hair oil.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-3 w-full"
          >
            {t.common.orderOnWhatsapp}
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
