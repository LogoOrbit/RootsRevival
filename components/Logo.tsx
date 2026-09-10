"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "./Providers";
import { brand } from "@/lib/brand";

/** The circular crest on its own, taken from the brand artwork. */
export function Emblem({ className = "h-12 w-12" }: { className?: string }) {
  const { theme } = useSite();
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src={theme === "dark" ? "/art/emblemdark.png" : "/art/emblem.png"}
        alt={`${brand.name} emblem`}
        fill
        sizes="120px"
        className="object-contain"
        priority
      />
    </span>
  );
}

/** The full lockup, emblem and wordmark together. */
export function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { theme } = useSite();
  const dims =
    size === "lg"
      ? "h-20 w-[15rem] sm:h-24 sm:w-[19rem]"
      : size === "md"
        ? "h-14 w-[11rem]"
        : "h-11 w-[8.6rem] sm:h-12 sm:w-[9.6rem]";

  return (
    <span className={`relative block ${dims} ${className}`}>
      <Image
        src={theme === "dark" ? "/art/logodark.png" : "/art/logo.png"}
        alt={`${brand.name} herbal hair oil`}
        fill
        sizes="(max-width: 640px) 200px, 320px"
        className="object-contain object-left rtl:object-right"
        priority
      />
    </span>
  );
}

export function LogoLink({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <Link href="/" aria-label={`${brand.name} home`} className="press shrink-0">
      <Logo size={size} />
    </Link>
  );
}
