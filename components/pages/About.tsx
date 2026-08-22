"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, waLink } from "@/lib/brand";
import { useT } from "@/components/Providers";
import { artwork, ArtPanel } from "@/components/ProductArt";
import { Logo } from "@/components/Logo";
import { PageHero, Section, SectionHeading, Stat, TickList, Reveal } from "@/components/ui";
import { InstagramIcon, WhatsappIcon } from "@/components/Icons";

export default function AboutPage() {
  const t = useT();

  return (
    <>
      <PageHero eyebrow={t.about.eyebrow} title={t.about.title} intro={t.about.intro} />

      {/* Where it began */}
      <Section tone="bg">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold">{t.about.beginEyebrow}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">{t.about.beginTitle}</h2>
            <div className="gold-rule mt-6 w-24" />
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted">
              <p>{t.about.begin1}</p>
              <p>{t.about.begin2}</p>
              <p>{t.about.begin3}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-[0_24px_60px_rgba(18,53,36,0.18)]">
              <Image
                src={artwork.bottleHero}
                alt={brand.name}
                width={1100}
                height={1650}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Promise */}
      <Section tone="band">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Logo size="md" />
            <p className="eyebrow mt-6 text-goldlight">{t.about.promiseEyebrow}</p>
            <h2 className="mt-4 text-3xl text-bandtext sm:text-4xl">
              {t.about.promiseTitle}
            </h2>
            <div className="gold-rule mt-6 w-24" />
            <p className="mt-6 text-base leading-relaxed text-bandtext/85">
              {t.about.promiseIntro}
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-bandtext/15">
              <ArtPanel
                src={artwork.boxAbout}
                alt={t.about.carriesTitle}
                className="h-64 w-full bg-white"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>

          <div className="space-y-5">
            {t.about.promises.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <div className="rounded-2xl border border-bandtext/15 p-6">
                  <h3 className="font-display text-xl text-bandtext">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bandtext/80">
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section tone="bg">
        <SectionHeading
          eyebrow={t.about.processEyebrow}
          title={t.about.processTitle}
          intro={t.about.processIntro}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.process.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <div className="card h-full p-7">
                <span className="font-display text-3xl text-gold/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stats and promises */}
      <Section tone="soft">
        <div className="grid gap-8 rounded-2xl bg-card p-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.storyStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">{t.about.neverTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7">
              <TickList items={t.about.never} />
            </div>
          </div>

          <div>
            <h2 className="text-3xl">{t.about.carriesTitle}</h2>
            <div className="gold-rule mt-5 w-24" />
            <div className="mt-7 flex flex-wrap gap-3">
              {t.assurances.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-4 py-2 text-[0.68rem] uppercase tracking-[0.12em] text-heading"
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {t.about.carriesBody}
            </p>
          </div>
        </div>
      </Section>

      {/* Letter */}
      <Section tone="bg">
        <div className="card mx-auto max-w-3xl p-8 text-center sm:p-10">
          <div className="mx-auto flex justify-center">
            <Logo size="md" />
          </div>
          <h2 className="mt-6 text-3xl">{t.about.letterTitle}</h2>
          <div className="gold-rule mx-auto mt-6 w-24" />
          <p className="mt-6 text-base italic leading-relaxed text-muted">
            &ldquo;{t.about.letterBody}&rdquo;
          </p>
          <p className="mt-8 font-display text-xl text-heading">{t.about.letterSign}</p>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-gold">
            {t.common.tagline}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn btn-gold">
              {t.about.tryOil}
            </Link>
            <a
              href={waLink(
                `Assalam o Alaikum ${brand.name} team, I read your story and I have a question.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsappIcon className="h-5 w-5" />
              {t.about.talkToUs}
            </a>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
