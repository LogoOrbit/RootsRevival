"use client";

import Link from "next/link";
import { brand, mailLink, waLink } from "@/lib/brand";
import { Logo } from "./Logo";
import { useT } from "./Providers";
import { InstagramIcon, MailIcon, WhatsappIcon } from "./Icons";

export default function Footer() {
  const t = useT();

  const shopLinks = [
    { href: "/shop", label: t.footer.shopAll },
    { href: "/offers", label: t.footer.deals },
    { href: "/product/starter", label: t.products.starter.name },
    { href: "/product/duo", label: t.products.duo.name },
    { href: "/product/family", label: t.products.family.name },
  ];

  const learnLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/ingredients", label: t.nav.ingredients },
    { href: "/usage", label: t.nav.usage },
    { href: "/reviews", label: t.footer.customerReviews },
    { href: "/faq", label: t.nav.faq },
  ];

  const helpLinks = [
    { href: "/contact", label: t.footer.contactUs },
    { href: "/payment", label: t.footer.paymentMethods },
    { href: "/policies", label: t.footer.deliveryReturns },
    { href: "/privacy", label: t.footer.privacy },
    { href: "/terms", label: t.footer.terms },
  ];

  return (
    <footer className="mt-20 bg-band text-bandtext/85">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bandtext/75">
              {t.footer.about}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bandtext/25 text-bandtext transition-colors hover:border-gold hover:text-goldlight"
              >
                <InstagramIcon />
              </a>
              <a
                href={waLink(`Assalam o Alaikum, I want to order ${brand.name} herbal hair oil.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bandtext/25 text-bandtext transition-colors hover:border-gold hover:text-goldlight"
              >
                <WhatsappIcon />
              </a>
              <a
                href={mailLink}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bandtext/25 text-bandtext transition-colors hover:border-gold hover:text-goldlight"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <FooterColumn title={t.footer.shop} links={shopLinks} />
          <FooterColumn title={t.footer.discover} links={learnLinks} />

          <div>
            <h3 className="eyebrow text-goldlight">{t.footer.reach}</h3>
            <ul className="mt-5 space-y-3 text-sm text-bandtext/80">
              <li>
                <a
                  className="link-underline"
                  href={waLink("Assalam o Alaikum, I have a question about Roots Revival.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {brand.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a className="link-underline break-all" href={mailLink}>
                  {brand.contact.email}
                </a>
              </li>
              <li>{brand.contact.hours}</li>
              <li>
                <a
                  className="link-underline"
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {brand.social.instagramHandle}
                </a>
              </li>
            </ul>
            <ul className="mt-6 space-y-2 text-sm text-bandtext/80">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link className="link-underline" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-bandtext/15 pt-8 text-xs text-bandtext/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. {t.footer.rights}
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{t.common.cashOnDelivery}</span>
            <span className="text-goldlight">✦</span>
            <span>{t.footer.bankTransfer}</span>
            <span className="text-goldlight">✦</span>
            <span>{t.footer.deliveryAll}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow text-goldlight">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-bandtext/80">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="link-underline" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
