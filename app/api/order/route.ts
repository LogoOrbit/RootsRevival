import { NextResponse } from "next/server";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { computeTotals, type CartLine } from "@/lib/cart";
import { en } from "@/lib/i18n/en";
import { pushWhatsapp, sendMail, shopEmail } from "@/lib/notify";
import { orderEmailHtml } from "@/lib/email";

export const runtime = "nodejs";

type OrderBody = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postal?: string;
  country?: string;
  contact?: string;
  newsletter?: boolean;
  discount?: string;
  billing?: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    postal?: string;
    country?: string;
  } | null;
  notes?: string;
  payment?: string;
  lines?: CartLine[];
  website?: string; // honeypot
};

function clean(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function makeOrderId(): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `RR${stamp}${random}`;
}

export async function POST(request: Request) {
  let body: OrderBody;
  try {
    body = (await request.json()) as OrderBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true, orderId: "skipped" });
  }

  const name = clean(body.name, 90);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const address = clean(body.address, 400);
  const city = clean(body.city, 60);
  const postal = clean(body.postal, 20);
  const country = clean(body.country, 60) || "Pakistan";
  const contact = clean(body.contact, 120);
  const newsletter = body.newsletter === true;
  const discount = clean(body.discount, 40).toUpperCase();
  const billing = body.billing
    ? {
        name: `${clean(body.billing.firstName, 90)} ${clean(
          body.billing.lastName,
          90
        )}`.trim(),
        address: clean(body.billing.address, 400),
        city: clean(body.billing.city, 60),
        postal: clean(body.billing.postal, 20),
        country: clean(body.billing.country, 60) || country,
      }
    : null;
  const notes = clean(body.notes, 500);
  const payment = clean(body.payment, 40) === "bank" ? "bank" : "cod";
  const lines = Array.isArray(body.lines) ? body.lines : [];

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please write your last name.";
  if (phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please write a working WhatsApp number.";
  if (address.length < 10) errors.address = "Please write your full address.";
  if (city.length < 2) errors.city = "Please write your city.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please check the email address.";
  if (!email && !contact && phone.length === 0)
    errors.email = "Please check the email address.";

  const totals = computeTotals(lines);
  if (totals.itemCount === 0) errors.cart = "Your cart is empty.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const orderId = makeOrderId();
  const placedAt = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
  });

  const itemLines = totals.lines
    .map(
      (line) =>
        `• ${line.qty} x ${en.products[line.product.slug].name} (${
          en.products[line.product.slug].volume
        }) = ${formatPrice(line.lineTotal)}`
    )
    .join("\n");

  const paymentLabel =
    payment === "bank"
      ? `Online transfer to ${brand.bank.bankName}, account ${brand.bank.accountNumber}, title ${brand.bank.accountTitle}`
      : "Cash on delivery";

  const summary = [
    `NEW ORDER ${orderId}`,
    `Placed: ${placedAt} (Pakistan time)`,
    "",
    "CUSTOMER",
    `Name: ${name}`,
    `WhatsApp: ${phone}`,
    email ? `Email: ${email}` : `Contact: ${contact || "not given"}`,
    `Newsletter opt in: ${newsletter ? "yes" : "no"}`,
    `Address: ${address}`,
    `City: ${city}${postal ? ` ${postal}` : ""}`,
    `Country: ${country}`,
    billing
      ? `Billing address: ${billing.name}, ${billing.address}, ${billing.city}${
          billing.postal ? ` ${billing.postal}` : ""
        }, ${billing.country}`
      : "Billing address: same as shipping",
    discount ? `Discount code requested: ${discount}` : "",
    notes ? `Notes: ${notes}` : "",
    "",
    "ORDER",
    itemLines,
    "",
    totals.freeBottles > 0
      ? `Free gift: ${totals.freeBottles} x 60ml bottle`
      : "",
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    `Delivery: ${formatPrice(totals.shipping)}`,
    `TOTAL TO COLLECT: ${formatPrice(totals.total)}`,
    "",
    `Payment: ${paymentLabel}`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrlForShop = waLink(
    `Assalam o Alaikum ${name}, thank you for order ${orderId} from ${brand.name}.`
  );

  const mail = await sendMail(
    `New order ${orderId} from ${name}, ${formatPrice(totals.total)}`,
    summary,
    email || undefined,
    orderEmailHtml({
      orderId,
      placedAt,
      name,
      phone,
      email,
      address,
      area: city,
      notes,
      items: totals.lines.map((line) => ({
        name: en.products[line.product.slug].name,
        volume: en.products[line.product.slug].volume,
        qty: line.qty,
        total: line.lineTotal,
      })),
      freeBottles: totals.freeBottles,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      paymentLabel,
      whatsappUrl: whatsappUrlForShop,
    })
  );
  const whatsappPushed = await pushWhatsapp(summary);

  const customerMessage = [
    `Assalam o Alaikum ${brand.name} team,`,
    `I have placed order ${orderId} on your website.`,
    "",
    itemLines,
    "",
    `Total: ${formatPrice(totals.total)} (delivery ${formatPrice(totals.shipping)})`,
    `Payment: ${paymentLabel}`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}, ${city}${postal ? ` ${postal}` : ""}, ${country}`,
    billing
      ? `Billing address: ${billing.name}, ${billing.address}, ${billing.city}`
      : "",
    discount ? `Discount code: ${discount}` : "",
    notes ? `Notes: ${notes}` : "",
    "",
    payment === "bank"
      ? "I will send the payment receipt here shortly."
      : "Please confirm my order.",
  ]
    .filter(Boolean)
    .join("\n");

  return NextResponse.json({
    ok: true,
    orderId,
    total: totals.total,
    payment,
    whatsappUrl: waLink(customerMessage),
    mailtoUrl: `mailto:${shopEmail()}?subject=${encodeURIComponent(
      `Order ${orderId} from ${name}`
    )}&body=${encodeURIComponent(customerMessage)}`,
    emailDelivered: mail.delivered,
    whatsappPushed,
  });
}
