"use client";

import Link from "next/link";
import { useT } from "@/components/Providers";
import { artwork, ArtPanel } from "@/components/ProductArt";
import { HerbIcon, MustardOilIcon, CoconutOilIcon, CastorOilIcon } from "@/components/HerbIcons";
import { PageHero, Section, SectionHeading, TickList, Reveal } from "@/components/ui";

export default function IngredientsPage() {
  const t = useT();
  const baseIcons = [
    <MustardOilIcon key="a" className="h-10 w-10" />,
    <CoconutOilIcon key="b" className="h-10 w-10" />,
    <CastorOilIcon key="c" className="h-10 w-10" />,
  ];

  return (
    <>
      <PageHero
        eyebrow={t.ingredientsPage.eyebrow}
        title={t.ingredientsPage.title}
        intro={t.ingredientsPage.intro}
      />

      <Section tone="bg">
        <SectionHeading
          eyebrow={t.ingredientsPage.baseEyebrow}
          title={t.ingredientsPage.baseTitle}
          intro={t.ingredientsPage.baseIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.ingredientsPage.baseOils.map((oil, index) => (
            <Reveal key={oil.name} delay={index * 80}>
              <div className="card h-full p-8">
                <span className="text-gold">{baseIcons[index]}</span>
                <h3 className="mt-4 font-display text-2xl">{oil.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{oil.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.ingredientsPage.listEyebrow}
          title={t.ingredientsPage.listTitle}
          intro={t.ingredientsPage.listIntro}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.ingredients.map((item, index) => (
            <Reveal key={item.name} delay={index * 35}>
              <div className="card flex h-full gap-4 p-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-band text-goldlight">
                  <HerbIcon index={index} className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="font-display text-lg leading-snug">{item.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <ArtPanel
            src={artwork.labelBack}
            alt={t.ingredientsPage.listTitle}
            className="h-80 w-full rounded-2xl border border-border bg-white"
            sizes="(max-width: 768px) 90vw, 480px"
          />
          <ArtPanel
            src={artwork.boxIngredients}
            alt={t.ingredientsPage.listTitle}
            className="h-80 w-full rounded-2xl border border-border bg-white"
            sizes="(max-width: 768px) 90vw, 480px"
          />
        </div>
      </Section>

      <Section tone="bg">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t.ingredientsPage.notInsideTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {t.ingredientsPage.notInsideIntro}
            </p>
            <div className="mt-7">
              <TickList items={t.ingredientsPage.notInside} />
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border">
              <ArtPanel
                src={artwork.badges}
                alt={t.assurances.join(", ")}
                className="h-28 w-full bg-white"
                sizes="(max-width: 768px) 90vw, 480px"
              />
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl">{t.ingredientsPage.goodToKnow}</h2>
            <div className="gold-rule mt-5 w-24" />
            <dl className="mt-6 space-y-5 text-sm leading-relaxed text-muted">
              {t.ingredientsPage.notes.map((note) => (
                <div key={note.q}>
                  <dt className="font-display text-lg text-heading">{note.q}</dt>
                  <dd className="mt-1">{note.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/shop" className="btn btn-gold">
            {t.common.shopTheOil}
          </Link>
        </div>
      </Section>
    </>
  );
}
