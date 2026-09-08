/**
 * Central brand configuration.
 * Change any value here and it updates everywhere on the website.
 */

export const brand = {
  name: "Roots Revival",
  legalName: "Roots Revival Herbal Hair Oil",
  tagline: "Revive Your Roots, Reveal Your Beauty",
  category: "Herbal Hair Oil",
  shortIntro:
    "A handmade blend of traditional herbs and nutrient rich oils that strengthens hair from the roots.",

  /**
   * Set this to a file inside /public (for example "/brand/logo.png")
   * once you upload the original logo artwork.
   * While it stays null the website draws the built in emblem.
   */
  logoImage: null as string | null,

  /**
   * Every new order is emailed to all of these. Add or remove an address here
   * and the order mail follows, no environment change needed.
   */
  orderEmails: [
    "rootsrevivalpakistan@gmail.com",
    "ainaabidi25@gmail.com",
  ] as string[],

  contact: {
    email: "rootsrevivalpakistan@gmail.com",
    /** Digits only, used for wa.me links */
    whatsappNumber: "923113839767",
    whatsappDisplay: "+92 311 3839767",
    phoneLocal: "0311 3839767",
    country: "Pakistan",
    hours: "Every day, 10:00 am to 10:00 pm",
  },

  social: {
    instagram:
      "https://www.instagram.com/rootsrevivalpakistan?igsi=MXRsZHh0d2NqZ3R2bg==",
    instagramHandle: "@rootsrevivalpakistan",
    /** Add the page link here when the Facebook page is ready. */
    facebook: "",
  },

  bank: {
    bankName: "Meezan Bank",
    accountTitle: "Aina Abidi",
    accountNumber: "99140105829405",
  },

  shipping: {
    /** One flat delivery charge, the same for every area we deliver to. */
    flatRate: 250,
    dispatchFrom: "Gulshan-e-Iqbal Block 10, Karachi",
    deliveryDays: "1 to 2 working days inside Karachi",
  },

  site: {
    /** Used for metadata and the sitemap. Update once a custom domain is live. */
    url: "https://rootsrevival-zeta.vercel.app",
  },
} as const;

export const currency = "PKR";

export function formatPrice(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

/** Builds a WhatsApp deep link with a prefilled message. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${brand.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const mailLink = `mailto:${brand.contact.email}`;
