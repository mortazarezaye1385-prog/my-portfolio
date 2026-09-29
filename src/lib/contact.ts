import { site } from "@/content/site";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactField = keyof ContactPayload;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactResult = { ok: true; via: "endpoint" | "mailto" } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = "Tell me what to call you.";
  if (!values.email.trim()) errors.email = "I'll need an email to reply to.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That email doesn't look quite right.";
  if (values.message.trim().length < 20) errors.message = "A little more detail, please (20 characters or more).";
  else if (values.message.length > 4000) errors.message = "Let's keep it under 4,000 characters.";
  return errors;
}

/**
 * Sends the form. Connect any backend by setting NEXT_PUBLIC_CONTACT_ENDPOINT
 * to a URL that accepts a JSON POST (Formspree, Getform, a serverless function).
 * Without an endpoint the visitor's email client opens with the message pre-filled,
 * so the form still works on a purely static host.
 */
export async function sendContact(values: ContactPayload): Promise<ContactResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  const payload: ContactPayload = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  if (!endpoint) {
    const subject = encodeURIComponent(`Project enquiry from ${payload.name}`);
    const body = encodeURIComponent(`${payload.message}\n\n${payload.name}\n${payload.email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    return { ok: true, via: "mailto" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { ok: false, error: "The message didn't go through. Please try again or email me directly." };
    return { ok: true, via: "endpoint" };
  } catch {
    return { ok: false, error: "Looks like you're offline. Check your connection and try again." };
  }
}
