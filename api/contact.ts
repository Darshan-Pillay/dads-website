import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { contactSchema } from '../src/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const body = req.body as Record<string, unknown>;

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return res.status(400).json({ ok: false, error: 'Invalid form data' });
  }

  const { name, email, domain, message } = result.data;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? '';
  const rootDomain = process.env.CONTACT_DOMAIN ?? 'softfinity.com';

  const bodyText = [
    'New enquiry from the Softfinity contact form.',
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    ...(domain ? [`Area:    ${domain}`] : []),
    'Message:',
    `  ${message}`,
    '',
    '----',
    `Reply directly to this email to respond to ${name}.`,
  ].join('\n');

  const { error } = await resend.emails.send({
    from: `Softfinity Contact <hello@send.${rootDomain}>`,
    to: toEmail,
    replyTo: email,
    subject: `New enquiry: ${name} — Softfinity contact form`,
    text: bodyText,
  });

  if (error) {
    console.error('contact: send_failed', error.name);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send. Please try again or email us directly.',
    });
  }

  console.log('contact: sent');
  return res.status(200).json({ ok: true });
}
