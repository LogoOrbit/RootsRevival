import { NextResponse } from "next/server";
import { brand, formatPrice, waLink } from "@/lib/brand";
import { computeTotals, type CartLine } from "@/lib/cart";
import { en } from "@/lib/i18n/en";
import { pushWhatsapp, sendMail } from "@/lib/notify";

export const runtime = "nodejs";

type OrderBody = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  province?: string;
  notes?: string;
  payment?: string;
  coupon?: string;
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
  const province = clean(body.province, 60);
  const notes = clean(body.notes, 500);
  const payment = clean(body.payment, 40) === "bank" ? "bank" : "cod";
  const coupon = clean(body.coupon, 40);
  const lines = Array.isArray(body.lines) ? body.lines : [];

  const errors: Record<string, string> = {};
  if (name.length < 3) errors.name = "Please write your full name.";
  if (phone.replace(/\D/g, "").length < 10)
    errors.phone = "Please write a working WhatsApp number.";
  if (address.length < 10) errors.address = "Please write your full address.";
  if (city.length < 2) errors.city = "Please write your city.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please check the email address.";

  const totals = computeTotals(lines, coupon);
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
    email ? `Email: ${email}` : "Email: not given",
    `Address: ${address}`,
    `City: ${city}${province ? `, ${province}` : ""}`,
    notes ? `Notes: ${notes}` : "",
    "",
    "ORDER",
    itemLines,
    "",
    `Subtotal: ${formatPrice(totals.subtotal)}`,
    totals.discount > 0
      ? `Discount (${totals.couponCode}): ${formatPrice(totals.discount)} off`
      : "Discount: none",
    `Delivery: ${totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}`,
    `TOTAL TO COLLECT: ${formatPrice(totals.total)}`,
    "",
    `Payment: ${paymentLabel}`,
  ]
    .filter(Boolean)
    .join("\n");

  const mail = await sendMail(
    `New order ${orderId} from ${name}, ${formatPrice(totals.total)}`,
    summary,
    email || undefined
  );
  const whatsappPushed = await pushWhatsapp(summary);

  const customerMessage = [
    `Assalam o Alaikum ${brand.name} team,`,
    `I have placed order ${orderId} on your website.`,
    "",
    itemLines,
    "",
    `Total: ${formatPrice(totals.total)} (delivery ${
      totals.shipping === 0 ? "free" : formatPrice(totals.shipping)
    })`,
    `Payment: ${paymentLabel}`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}, ${city}${province ? `, ${province}` : ""}`,
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
    mailtoUrl: `mailto:${
      process.env.ORDER_EMAIL_TO || brand.contact.email
    }?subject=${encodeURIComponent(
      `Order ${orderId} from ${name}`
    )}&body=${encodeURIComponent(customerMessage)}`,
    emailDelivered: mail.delivered,
    whatsappPushed,
  });
}
