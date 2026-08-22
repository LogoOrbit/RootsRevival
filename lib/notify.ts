import { brand } from "./brand";

/**
 * Delivery of order and message alerts.
 *
 * Email, in order of preference:
 *   1. Resend, when RESEND_API_KEY is set.
 *   2. Any mailbox over SMTP, when SMTP_HOST, SMTP_USER and SMTP_PASS are set.
 *      A Gmail app password works, and then the order mail comes from your own
 *      address so a reply goes straight back to the customer.
 *   3. Any webhook you like, when ORDER_WEBHOOK_URL is set. Useful for Zapier,
 *      Make, Google Apps Script, Slack or Discord.
 *
 * With none of them set the order still reaches the shop through WhatsApp, and
 * the website says so honestly instead of pretending the mail went out.
 *
 * WhatsApp:
 *   The customer is handed a ready made WhatsApp message that lands in the
 *   shop inbox. With a CallMeBot key the server also pushes the same text to
 *   the shop number on its own.
 */

export type MailResult = { delivered: boolean; provider: string; error?: string };

export function shopEmail(): string {
  return process.env.ORDER_EMAIL_TO || brand.contact.email;
}

export async function sendMail(
  subject: string,
  text: string,
  replyTo?: string
): Promise<MailResult> {
  const to = shopEmail();
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.ORDER_EMAIL_FROM ||
            "Roots Revival <onboarding@resend.dev>",
          to: [to],
          subject,
          text,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      });
      if (response.ok) return { delivered: true, provider: "resend" };
      return {
        delivered: false,
        provider: "resend",
        error: `${response.status}`,
      };
    } catch (error) {
      return {
        delivered: false,
        provider: "resend",
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(process.env.SMTP_PORT || 465);
      const transport = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure: port === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transport.sendMail({
        from: process.env.ORDER_EMAIL_FROM || `${brand.name} <${smtpUser}>`,
        to,
        subject,
        text,
        ...(replyTo ? { replyTo } : {}),
      });
      return { delivered: true, provider: "smtp" };
    } catch (error) {
      return {
        delivered: false,
        provider: "smtp",
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  const webhook = process.env.ORDER_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, replyTo, to }),
      });
      if (response.ok) return { delivered: true, provider: "webhook" };
      return {
        delivered: false,
        provider: "webhook",
        error: `${response.status}`,
      };
    } catch (error) {
      return {
        delivered: false,
        provider: "webhook",
        error: error instanceof Error ? error.message : "unknown",
      };
    }
  }

  return { delivered: false, provider: "none" };
}

export async function pushWhatsapp(text: string): Promise<boolean> {
  const key = process.env.CALLMEBOT_APIKEY;
  const phone = process.env.CALLMEBOT_PHONE || brand.contact.whatsappNumber;
  if (!key) return false;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
      phone
    )}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`;
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}
