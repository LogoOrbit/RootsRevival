import Link from "next/link";
import type { ReactNode } from "react";
import { CheckIcon } from "./Icons";

export function Section({
  children,
  className = "",
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "soft" | "forest" | "plain";
  id?: string;
}) {
  const bg =
    tone === "forest"
      ? "bg-forest text-cream"
      : tone === "soft"
        ? "bg-cream-soft"
        : tone === "plain"
          ? ""
          : "bg-cream";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
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
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-gold" : "text-gold-light"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl leading-tight sm:text-4xl ${
          tone === "light" ? "text-cream" : ""
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "light" ? "text-cream-soft/80" : "text-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
      <div className={`gold-rule mt-6 ${align === "center" ? "mx-auto w-24" : "w-24"}`} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="leaf-pattern bg-cream-soft">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        {eyebrow ? <p className="eyebrow text-gold">{eyebrow}</p> : null}
        <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">{title}</h1>
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
  tone?: "gold" | "forest" | "cream" | "hibiscus";
}) {
  const styles = {
    gold: "bg-gold/15 text-gold border-gold/30",
    forest: "bg-forest text-cream border-forest",
    cream: "bg-cream text-forest border-cream-deep",
    hibiscus: "bg-hibiscus/10 text-hibiscus border-hibiscus/25",
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
  items: string[];
  tone?: "dark" | "light";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              tone === "light" ? "bg-gold-light text-forest" : "bg-forest text-cream"
            }`}
          >
            <CheckIcon className="h-3 w-3" />
          </span>
          <span
            className={`text-sm leading-relaxed ${
              tone === "light" ? "text-cream-soft/85" : "text-muted"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CtaRow({
  primaryHref = "/shop",
  primaryLabel = "Shop The Oil",
  secondaryHref = "/about",
  secondaryLabel = "Our Story",
  center = false,
}: {
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <Link href={primaryHref} className="btn btn-gold">
        {primaryLabel}
      </Link>
      <Link href={secondaryHref} className="btn btn-outline">
        {secondaryLabel}
      </Link>
    </div>
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
