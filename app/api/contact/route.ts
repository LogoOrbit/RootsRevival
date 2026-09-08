import { NextResponse } from "next/server";
import { waLink } from "@/lib/brand";
import { pushWhatsapp, sendMail } from "@/lib/notify";
import { contactEmailHtml } from "@/lib/email";

export const runtime = "nodejs";

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 90);
  const email = clean(body.email, 120);
  const phone = clean(body.phone, 30);
  const subject = clean(body.subject, 120) || "Website enquiry";
  const message = clean(body.message, 1500);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please write your name.";
  if (message.length < 5) errors.message = "Please write your message.";
  if (!phone && !email)
    errors.phone = "Please give a WhatsApp number or an email so we can reply.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Please check the email address.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const text = [
    `NEW MESSAGE FROM THE WEBSITE`,
    `Subject: ${subject}`,
    "",
    `Name: ${name}`,
    phone ? `WhatsApp: ${phone}` : "",
    email ? `Email: ${email}` : "",
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = waLink(`Assalam o Alaikum, my name is ${name}. ${message}`);
  const receivedAt = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
  });

  const mail = await sendMail(
    `Website message from ${name}: ${subject}`,
    text,
    email || undefined,
    contactEmailHtml({ name, email, phone, subject, message, receivedAt, whatsappUrl })
  );
  const whatsappPushed = await pushWhatsapp(text);

  return NextResponse.json({
    ok: true,
    emailDelivered: mail.delivered,
    whatsappPushed,
    whatsappUrl,
  });
}
