import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/lib/brand";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import WhatsappFab from "@/components/WhatsappFab";

export const metadata: Metadata = {
  metadataBase: new URL(brand.site.url),
  title: {
    default: `${brand.name} | Handmade Herbal Hair Oil in Pakistan`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Roots Revival is a handmade herbal hair oil made with 16 traditional herbs and nutrient rich oils. Helps reduce hair fall, control dandruff and nourish the scalp. Cash on delivery all over Pakistan.",
  keywords: [
    "herbal hair oil",
    "hair fall oil Pakistan",
    "kalonji hair oil",
    "amla hibiscus hair oil",
    "natural hair oil",
    "Roots Revival",
  ],
  openGraph: {
    title: `${brand.name} | Handmade Herbal Hair Oil`,
    description: brand.shortIntro,
    url: brand.site.url,
    siteName: brand.name,
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Handmade Herbal Hair Oil`,
    description: brand.shortIntro,
  },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.legalName,
  url: brand.site.url,
  email: brand.contact.email,
  slogan: brand.tagline,
  sameAs: [brand.social.instagram],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${brand.contact.whatsappNumber}`,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <CartProvider>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsappFab />
        </CartProvider>
      </body>
    </html>
  );
}
