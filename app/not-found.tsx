"use client";

import Link from "next/link";
import { Emblem } from "@/components/Logo";
import { useT } from "@/components/Providers";
import { Section } from "@/components/ui";

export default function NotFound() {
  const t = useT();
  return (
    <Section tone="bg">
      <div className="card mx-auto max-w-xl p-10 text-center sm:p-12">
        <div className="flex justify-center">
          <Emblem className="h-24 w-24" />
        </div>
        <p className="eyebrow mt-6 text-gold">{t.notFound.eyebrow}</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">{t.notFound.title}</h1>
        <div className="gold-rule mx-auto mt-6 w-24" />
        <p className="mt-6 text-sm leading-relaxed text-muted">{t.notFound.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold">
            {t.common.backHome}
          </Link>
          <Link href="/shop" className="btn btn-outline">
            {t.common.visitShop}
          </Link>
        </div>
      </div>
    </Section>
  );
}
