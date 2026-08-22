"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/components/Providers";
import { artwork } from "@/components/ProductArt";
import { PageHero, Section, SectionHeading, TickList, Reveal } from "@/components/ui";

export default function UsagePage() {
  const t = useT();

  return (
    <>
      <PageHero
        eyebrow={t.usagePage.eyebrow}
        title={t.usagePage.title}
        intro={t.usagePage.intro}
      />

      <Section tone="bg">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-[2rem] border border-border">
            <Image
              src={artwork.bottleHero}
              alt={t.usagePage.title}
              width={1100}
              height={1650}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="eyebrow text-gold">{t.usagePage.stepsEyebrow}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.usagePage.stepsTitle}</h2>
            <div className="gold-rule mt-6 w-24" />
            <ol className="mt-8 space-y-6">
              {t.howToUse.map((step, index) => (
                <Reveal key={step.step} delay={index * 60}>
                  <li className="flex gap-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-band font-display text-lg text-bandtext">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl leading-snug">{step.step}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{step.note}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <Image
            src={artwork.usageStrip}
            alt={t.usagePage.stepsTitle}
            width={1200}
            height={160}
            className="w-full object-cover"
          />
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.usagePage.weekEyebrow}
          title={t.usagePage.weekTitle}
          intro={t.usagePage.weekIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.usagePage.week.map((item, index) => (
            <Reveal key={item.day} delay={index * 80}>
              <div className="card h-full p-8">
                <p className="eyebrow text-gold">{item.day}</p>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="bg">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t.usagePage.habitsTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7">
              <TickList items={t.usagePage.habits} />
            </div>
          </div>

          <div className="card p-8">
            <h2 className="text-2xl">{t.usagePage.rememberTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              {t.usagePage.remember.map((item) => (
                <li key={item.lead}>
                  <span className="font-display text-lg text-heading">{item.lead}</span>{" "}
                  {item.rest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow={t.usagePage.timelineEyebrow}
          title={t.usagePage.timelineTitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.expectations.map((item, index) => (
            <Reveal key={item.period} delay={index * 80}>
              <div className="card h-full p-7">
                <p className="eyebrow text-gold">{item.period}</p>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn btn-gold">
            {t.usagePage.startCourse}
          </Link>
          <Link href="/faq" className="btn btn-outline">
            {t.usagePage.readFaq}
          </Link>
        </div>
      </Section>
    </>
  );
}
