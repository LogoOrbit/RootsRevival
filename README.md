# Roots Revival, Herbal Hair Oil store

The official online store for Roots Revival, a handmade herbal hair oil brand from Pakistan.
Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4, ready to deploy on Vercel.

## Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| Shop | `/shop` |
| Product detail | `/product/starter`, `/product/duo`, `/product/family` |
| Deals and offers | `/offers` |
| Our story | `/about` |
| Ingredients | `/ingredients` |
| How to use | `/usage` |
| Customer reviews | `/reviews` |
| FAQ | `/faq` |
| Contact | `/contact` |
| Payment methods | `/payment` |
| Delivery and returns | `/policies` |
| Privacy policy | `/privacy` |
| Terms of service | `/terms` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Order placed | `/thankyou` |

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```


## Languages, theme and artwork

**English and Urdu.** Every page reads in both. The language is picked from the visitor's
browser on the first visit, and the header switch (globe icon) changes it at any time. Urdu
switches the whole layout to right to left and uses a Nastaliq typeface. All wording lives in
`lib/i18n/en.ts` and `lib/i18n/ur.ts`, side by side, so editing a line means editing those two
files and nothing else.

**Light and dark.** Light is the default. The moon icon in the header switches to dark and the
choice is remembered in the browser. Both palettes are defined at the top of `app/globals.css`,
so changing a colour there changes it everywhere.

**Artwork.** The uploaded brand files live in `public/brand`. The website uses processed copies
in `public/art`, generated from them: the logo cut out with transparency plus a cream version for
dark backgrounds, the front label, back label and box panels, and the product photography used on
the shop cards. Ingredient icons and benefit marks are drawn in code in
`components/HerbIcons.tsx`, so they stay sharp at any size and follow the theme.

**Offer countdown.** The launch offer counts down to the end of the current month, Pakistan time.
It appears on the home hero, the shop, every product page, the offers page and the sticky bar.
The logic is in `components/Countdown.tsx`.

## Where to change things

Everything a shop owner normally edits lives in three files.

| What | File |
| --- | --- |
| WhatsApp number, email, Instagram link, bank details, delivery charges | `lib/brand.ts` |
| Packs, prices, discount codes, ingredients, benefits, usage steps | `lib/products.ts` |
| Brand story blocks, FAQ, customer reviews, expectations timeline | `lib/content.ts` |

### Adding your real logo image

The website draws the emblem in code so it stays sharp at any size.
To use the original artwork instead, drop the file into `public/brand/logo.png`
and set this value in `lib/brand.ts`:

```ts
logoImage: "/brand/logo.png",
```

### Adding customer reviews

Open `lib/content.ts` and add entries to the `reviews` array:

```ts
export const reviews: Review[] = [
  {
    name: "Sana",
    city: "Lahore",
    stars: 5,
    weeks: "Using for 6 weeks",
    words: "My hair fall reduced a lot and my scalp feels much calmer.",
  },
];
```

The reviews page shows the invitation card while the array is empty and switches to the
review wall as soon as you add real customer words.

## How an order reaches you

When a customer presses **Place Order** on `/checkout`:

1. The order is posted to `/api/order`, where the totals are recalculated on the server
   so a customer can never change the price from their browser.
2. An email with the full order (customer, address, items, total, payment method) is sent
   to `rootsrevivalpakistan@gmail.com`.
3. A WhatsApp message containing the same details opens in a new tab, addressed to
   `+92 311 3839767`, so the order lands in your WhatsApp inbox as well.
4. The customer lands on `/thankyou` with their order number, and the Meezan Bank details
   if they chose online payment.

The contact form on `/contact` works the same way through `/api/contact`.

### Turning on the two automatic alerts

WhatsApp already works with no setup: the customer presses one green button and the full
order lands in the shop inbox. The two settings below make the alerts automatic, so an
order reaches you even if the customer never presses that button. Each one is a single
value pasted into Vercel, under Settings, then Environment Variables, then Redeploy.

**WhatsApp, about one minute, no account needed.**

1. Save `+34 644 51 95 23` in the shop phone as CallMeBot.
2. Send it this exact message on WhatsApp: `I allow callmebot to send me messages`.
3. It replies with a personal API key.
4. Add `CALLMEBOT_APIKEY` in Vercel with that key, then redeploy.

Every order is now pushed to `+92 311 3839767` by the website itself.

**Email, about three minutes. Pick one of the two.**

*Resend, the simpler one.* Create a free account at resend.com using
`rootsrevivalpakistan@gmail.com`, copy the API key, add it in Vercel as `RESEND_API_KEY`,
then redeploy. Orders arrive from `onboarding@resend.dev`.

*Your own Gmail over SMTP.* In the Google account of `rootsrevivalpakistan@gmail.com`
turn on two step verification, create an app password, then add in Vercel:
`SMTP_HOST` as `smtp.gmail.com`, `SMTP_PORT` as `465`, `SMTP_USER` as
`rootsrevivalpakistan@gmail.com` and `SMTP_PASS` as the app password. Orders then arrive
from your own address, so replying to one writes straight back to the customer.

Until one of these is added, the website does not pretend the mail went out. The order
confirmation page asks the customer to press the WhatsApp button instead, and it switches
to the calmer wording by itself once the alerts are live.

A note on why: relay services that need no key at all, such as FormSubmit, sit behind a
bot check that rejects requests coming from a server, so they were removed rather than
left in place looking like they work.

### Environment variables

All of them are optional. See `.env.example`.

| Variable | Meaning |
| --- | --- |
| `CALLMEBOT_APIKEY` | Pushes every order to the shop WhatsApp automatically |
| `CALLMEBOT_PHONE` | The number CallMeBot messages, defaults to the shop number |
| `RESEND_API_KEY` | Sends order emails through Resend |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Sends order emails through any mailbox, a Gmail app password included |
| `ORDER_EMAIL_TO` | Where orders are emailed, defaults to the address in `lib/brand.ts` |
| `ORDER_EMAIL_FROM` | Sender shown on the order emails |
| `ORDER_WEBHOOK_URL` | Posts the order to any webhook, for Zapier, Make, Slack or Discord |

## Deploying

The project is connected to Vercel and to this repository, so every push to the
`claude/roots-revival-ecommerce-0g4wgw` branch or to `main` builds and deploys automatically.

After a custom domain is connected, update `site.url` in `lib/brand.ts` so the sitemap,
the social preview cards and the structured data point at the real address.
