"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckIcon } from "./Icons";

export function Section({
  children,
  className = "",
  tone = "bg",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "bg" | "soft" | "band" | "plain";
  id?: string;
}) {
  const skin =
    tone === "band"
      ? "bg-band text-bandtext"
      : tone === "soft"
        ? "bg-bgsoft"
        : tone === "plain"
          ? ""
          : "bg-bg";
  return (
    <section id={id} className={`${skin} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "start";
  tone?: "dark" | "light";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-gold" : "text-goldlight"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl leading-tight sm:text-4xl ${
          tone === "light" ? "text-bandtext" : ""
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "light" ? "text-bandtext/80" : "text-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
      <div
        className={`gold-rule mt-6 w-24 ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  image?: ReactNode;
}) {
  return (
    <div className="leaf-pattern relative overflow-hidden bg-bgsoft">
      {image ? <div className="absolute inset-0 opacity-25">{image}</div> : null}
      <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
        <h1 className="mt-4 text-3xl leading-tight sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {intro}
          </p>
        ) : null}
        <div className="gold-rule mx-auto mt-7 w-28" />
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  );
}

export function Pill({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "band" | "plain" | "hibiscus";
}) {
  const styles = {
    gold: "bg-gold/15 text-gold border-gold/30",
    band: "bg-band text-bandtext border-band",
    plain: "bg-card text-heading border-border",
    hibiscus: "bg-hibiscus/12 text-hibiscus border-hibiscus/30",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] ${styles}`}
    >
      {children}
    </span>
  );
}

export function TickList({
  items,
  tone = "dark",
}: {
  items: readonly string[];
  tone?: "dark" | "light";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              tone === "light" ? "bg-goldlight text-band" : "bg-band text-bandtext"
            }`}
          >
            <CheckIcon className="h-3 w-3" />
          </span>
          <span
            className={`text-sm leading-relaxed ${
              tone === "light" ? "text-bandtext/85" : "text-muted"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl text-gold">{value}</p>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}

/** Fades content in as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    observer.observe(node);
    // Safety net: nothing on this website should ever stay invisible.
    const fallback = window.setTimeout(() => setVisible(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Breadcrumb({
  items,
}: {
  items: { href?: string; label: string }[];
}) {
  return (
    <div className="bg-bgsoft">
      <div className="mx-auto max-w-7xl px-4 py-4 text-[0.7rem] uppercase tracking-[0.16em] text-muted sm:px-6 lg:px-8">
        {items.map((item, index) => (
          <span key={item.label}>
            {index > 0 ? <span className="px-2 text-gold">✦</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-heading">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
