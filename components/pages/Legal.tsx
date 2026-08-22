"use client";

import { brand, mailLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import { PageHero, Section } from "@/components/ui";

export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const t = useT();
  const page = kind === "privacy" ? t.privacyPage : t.termsPage;

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Section tone="bg">
        <div className="mx-auto max-w-3xl">
          {page.sections.map((section) => (
            <article key={section.title} className="border-b border-border py-7">
              <h2 className="font-display text-2xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{section.body}</p>
            </article>
          ))}
          <p className="mt-8 text-sm leading-relaxed text-muted">
            {page.closing}{" "}
            <a href={mailLink} className="link-underline text-heading">
              {brand.contact.email}
            </a>{" "}
            ✦ <span dir="ltr">{brand.contact.whatsappDisplay}</span> ✦{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </Section>
    </>
  );
}
