import Link from "next/link";
import { brand, mailLink, waLink } from "@/lib/brand";
import { Logo } from "./Logo";
import { InstagramIcon, MailIcon, WhatsappIcon } from "./Icons";

const shopLinks = [
  { href: "/shop", label: "Shop All Packs" },
  { href: "/offers", label: "Deals And Offers" },
  { href: "/product/starter", label: "Single Bottle" },
  { href: "/product/duo", label: "Duo Pack" },
  { href: "/product/family", label: "Family Pack" },
];

const learnLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/usage", label: "How To Use" },
  { href: "/reviews", label: "Customer Reviews" },
  { href: "/faq", label: "FAQ" },
];

const helpLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/payment", label: "Payment Methods" },
  { href: "/policies", label: "Delivery And Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms Of Service" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-forest text-cream-soft">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" size="md" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-soft/80">
              {brand.name} is a handmade herbal hair oil from {brand.contact.country}.
              Sixteen traditional herbs and nutrient rich oils, slow infused in small
              batches, bottled fresh for every order.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={brand.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold-light"
              >
                <InstagramIcon />
              </a>
              <a
                href={waLink(`Assalam o Alaikum, I want to order ${brand.name} herbal hair oil.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold-light"
              >
                <WhatsappIcon />
              </a>
              <a
                href={mailLink}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold-light"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Discover" links={learnLinks} />

          <div>
            <h3 className="eyebrow text-gold-light">Reach Us</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream-soft/85">
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
            <ul className="mt-6 space-y-2 text-sm text-cream-soft/85">
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

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-8 text-xs text-cream-soft/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Cash on delivery</span>
            <span className="text-gold-light">✦</span>
            <span>{brand.bank.bankName} transfer</span>
            <span className="text-gold-light">✦</span>
            <span>Delivery all over {brand.contact.country}</span>
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
      <h3 className="eyebrow text-gold-light">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-cream-soft/85">
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
