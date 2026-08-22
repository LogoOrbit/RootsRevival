import { brand } from "./brand";

/**
 * Delivery of order and message alerts.
 *
 * Email: uses Resend when RESEND_API_KEY is present, otherwise it posts to
 * FormSubmit, which needs no key at all. FormSubmit sends one activation
 * email to the shop address the first time it is used.
 *
 * WhatsApp: the customer is handed a ready made WhatsApp message that lands
 * in the shop inbox. If a CallMeBot key is added the server also pushes the
 * same text to the shop number on its own.
 */

type MailResult = { delivered: boolean; provider: string; error?: string };

export async function sendMail(
  subject: string,
  text: string,
  replyTo?: string
): Promise<MailResult> {
  const to = process.env.ORDER_EMAIL_TO || brand.contact.email;
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

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          _template: "box",
          ...(replyTo ? { _replyto: replyTo } : {}),
          message: text,
        }),
      }
    );
    if (response.ok) return { delivered: true, provider: "formsubmit" };
    return {
      delivered: false,
      provider: "formsubmit",
      error: `${response.status}`,
    };
  } catch (error) {
    return {
      delivered: false,
      provider: "formsubmit",
      error: error instanceof Error ? error.message : "unknown",
    };
  }
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
