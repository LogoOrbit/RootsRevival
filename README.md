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

**Artwork.** The product photography lives in `public/art`, optimised from the original camera
files: `hero.jpg` and its wide crop `banner.jpg`, the three square pack shots `pack-single.jpg`,
`pack-duo.jpg` and `pack-family.jpg`, and the three sides of the box `box-front.jpg`,
`box-ingredients.jpg` and `box-about.jpg`. The pack shots are square and every tile that holds
one is square too, so a photo is never cropped on a phone. Paths are collected in
`components/ProductArt.tsx`. Ingredient icons and benefit marks are drawn in code in
`components/HerbIcons.tsx`, so they stay sharp at any size and follow the theme.

**The free 60ml bottle.** The one offer the shop runs is a free 60ml bottle with the duo pack.
It is set by `gift: true` on the duo pack in `lib/products.ts`, and everything that shows it
follows from there: the home hero callout, the deals banner, the badge on the pack cards, the
sticky bar and the cart line. The gold shine and the gift animation are `.gift-shine` and
`.gift-pop` in `app/globals.css`, and both stop for anyone who has reduced motion turned on.

## Where to change things

Everything a shop owner normally edits lives in three files.

| What | File |
| --- | --- |
| WhatsApp number, email, Instagram link, bank details, order email list | `lib/brand.ts` |
| Delivery zones and charges | `lib/delivery.ts`, with the area names in `lib/i18n` |
| Packs and prices | `lib/products.ts` |
| Ingredients, benefits, usage steps and all other wording | `lib/i18n/en.ts` and `lib/i18n/ur.ts` |
| Every word on the website, in English and in Urdu | `lib/i18n/en.ts` and `lib/i18n/ur.ts` |
| Colours for light and dark | `app/globals.css` |

### Replacing the artwork

Original files sit in `public/brand`. The versions the website loads sit in `public/art`.
To swap a picture, drop the new file into `public/art` under the same name, or add a new
name to the `artwork` list at the bottom of `components/ProductArt.tsx` and use it from a page.

### Adding customer reviews

Open `components/pages/Reviews.tsx` and add entries to the `reviews` array near the top:

```ts
const reviews = [
  {
    name: "Sana",
    city: "Lahore",
    stars: 5,
    weeks: "6 weeks",
    words: "My hair fall reduced a lot and my scalp feels much calmer.",
  },
];
```

The reviews page shows the invitation card while the array is empty and switches to the
review wall as soon as you add real customer words.

## Delivery

We dispatch by rider from Gulshan-e-Iqbal Block 10 and deliver **inside Karachi only**. The
charge depends on how far the parcel travels, so the buyer picks their area at checkout and
sees the exact amount before ordering. The four zones are in `lib/delivery.ts`:

| Zone | Areas | Delivery |
| --- | --- | --- |
| Gulshan and the blocks around it | Gulshan-e-Iqbal, Gulistan-e-Johar, Civic Centre, NIPA, Karimabad, Federal B Area | Rs 200 |
| Central Karachi | Safoora Goth, Saddar, PECHS, Bahadurabad, Tariq Road, North Nazimabad | Rs 350 |
| Wider Karachi | Clifton, DHA 1 to 6, Korangi, Landhi, Malir, North Karachi, Surjani, Orangi | Rs 450 |
| Outer Karachi | Saadi Town, Scheme 33, Gulshan-e-Maymar, Bahria Town, DHA 7 and 8, Gadap | Rs 600 |

To change a charge, edit the `fee` in `lib/delivery.ts`. To move an area between zones, edit
the `areas` line for that zone in `lib/i18n/en.ts` and `lib/i18n/ur.ts`. The server recalculates
the delivery charge from the zone id when the order is posted, so it cannot be changed from the
browser.

## How an order reaches you

When a customer presses **Place Order** on `/checkout`:

1. The order is posted to `/api/order`, where the totals are recalculated on the server
   so a customer can never change the price from their browser.
2. A formatted email with the full order (customer, address, delivery zone, items, the free
   60ml bottles to pack, delivery charge, total and payment method) is sent to **both**
   `rootsrevivalpakistan@gmail.com` and `ainaabidi25@gmail.com`. It is a branded HTML mail
   with a Confirm on WhatsApp button, and the same details go out as plain text for any
   client that refuses HTML. The templates are in `lib/email.ts`. It goes out
   as soon as one of the mail settings below is added. That list lives in `orderEmails` in
   `lib/brand.ts`; add or remove an address there and the order mail follows.
3. A WhatsApp message containing the same details opens in a new tab, addressed to
   `+92 311 3839767`, so the order lands in your WhatsApp inbox as well.
4. The customer lands on `/thankyou` with their order number, and the Meezan Bank details
   if they chose online payment.

The contact form on `/contact` works the same way through `/api/contact`, and sends its own
formatted mail with the sender's name, WhatsApp number, email, subject and message, plus a
Reply on WhatsApp button. Replying to either mail writes straight back to the customer,
because their address is set as the reply-to.

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
then redeploy.

One catch worth knowing before you pick it: on a new Resend account the only sender you
have is `onboarding@resend.dev`, and Resend will deliver from it **only to the address you
signed up with**. So orders would reach `rootsrevivalpakistan@gmail.com` and silently not
reach `ainaabidi25@gmail.com`. To send to both, verify a domain in Resend (Domains, then
Add Domain, then paste the DNS records at your registrar) and set `ORDER_EMAIL_FROM` to
something on that domain, for example `Roots Revival <orders@rootsrevival.pk>`.

If you do not have a domain yet you can still use Resend: open the account with
`rootsrevivalpakistan@gmail.com` and add only `RESEND_API_KEY`. Orders then reach that inbox
straight away. The site tries both addresses together first, and if Resend refuses the pair it
retries them one at a time, so the allowed inbox still gets the order instead of the mail being
lost. `ainaabidi25@gmail.com` starts receiving once a domain is verified.

The Gmail option below reaches both addresses today with no domain and no waiting.

*Your own Gmail over SMTP.* In the Google account of `rootsrevivalpakistan@gmail.com`
turn on two step verification, create an app password, then add in Vercel:
`SMTP_HOST` as `smtp.gmail.com`, `SMTP_PORT` as `465`, `SMTP_USER` as
`rootsrevivalpakistan@gmail.com` and `SMTP_PASS` as the app password. Orders then arrive
from your own address at both inboxes, so replying to one writes straight back to the
customer.

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
| `ORDER_EMAIL_TO` | Overrides who gets the order emails; several addresses separated by commas. Leave it empty to use the list in `lib/brand.ts` |
| `ORDER_EMAIL_FROM` | Sender shown on the order emails |
| `ORDER_WEBHOOK_URL` | Posts the order to any webhook, for Zapier, Make, Slack or Discord |

## Deploying

The project is connected to Vercel and to this repository, so every push to the
`claude/roots-revival-ecommerce-0g4wgw` branch or to `main` builds and deploys automatically.

After a custom domain is connected, update `site.url` in `lib/brand.ts` so the sitemap,
the social preview cards and the structured data point at the real address.
