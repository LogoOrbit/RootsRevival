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

### Making the order emails arrive

Email works with no setup at all through FormSubmit, and better with a Resend key.

**Option 1, no key needed (FormSubmit).**
The first order placed after the site goes live triggers one activation email from
FormSubmit to `rootsrevivalpakistan@gmail.com`. Open it, press the activation link once,
and every order after that arrives in the inbox automatically.

**Option 2, recommended (Resend).**
1. Create a free account at resend.com using `rootsrevivalpakistan@gmail.com`.
2. Copy the API key.
3. In Vercel, open the project, then Settings, then Environment Variables, and add
   `RESEND_API_KEY`.
4. Redeploy. Orders now arrive from `onboarding@resend.dev` with no activation step.

### Optional, push the order to WhatsApp automatically

The customer already sends the order to your WhatsApp with one press. If you also want the
server itself to message you, add a free CallMeBot key:

1. Save `+34 644 51 95 23` in your phone as CallMeBot and send it
   `I allow callmebot to send me messages`.
2. It replies with your personal API key.
3. Add `CALLMEBOT_APIKEY` in Vercel and redeploy.

### Environment variables

All of them are optional. See `.env.example`.

| Variable | Meaning |
| --- | --- |
| `RESEND_API_KEY` | Sends order emails through Resend instead of FormSubmit |
| `ORDER_EMAIL_TO` | Where orders are emailed, defaults to the address in `lib/brand.ts` |
| `ORDER_EMAIL_FROM` | Sender shown on Resend emails |
| `CALLMEBOT_APIKEY` | Lets the server push the order to your WhatsApp on its own |
| `CALLMEBOT_PHONE` | The number CallMeBot messages, defaults to the shop number |

## Deploying

The project is connected to Vercel and to this repository, so every push to the
`claude/roots-revival-ecommerce-0g4wgw` branch or to `main` builds and deploys automatically.

After a custom domain is connected, update `site.url` in `lib/brand.ts` so the sitemap,
the social preview cards and the structured data point at the real address.
