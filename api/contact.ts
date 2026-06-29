import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { contactSchema } from '../src/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWithRetry(
  params: Parameters<typeof resend.emails.send>[0]
): Promise<{ ok: boolean; errorName?: string }> {
  const delays = [0, 1000, 2000]; // immediate → +1 s → +2 s
  for (let attempt = 0; attempt < delays.length; attempt++) {
    if (delays[attempt] > 0) {
      await new Promise<void>((r) => setTimeout(r, delays[attempt]));
    }
    const { error } = await resend.emails.send(params);
    if (!error) return { ok: true };
    // Don't retry 4xx — invalid input won't improve on retry
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      return { ok: false, errorName: error.name };
    }
    if (attempt < delays.length - 1) {
      console.error(`contact: attempt_${attempt + 1}_failed`, error.name);
    }
  }
  return { ok: false, errorName: 'max_retries_exceeded' };
}

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

  console.log('contact: received');

  const { ok, errorName } = await sendWithRetry({
    from: `Softfinity Contact <hello@send.${rootDomain}>`,
    to: toEmail,
    replyTo: email,
    subject: `New enquiry: ${name} — Softfinity contact form`,
    text: bodyText,
  });

  if (!ok) {
    console.error('contact: send_failed', errorName);
    return res.status(500).json({
      ok: false,
      error: 'Failed to send. Please try again or email us directly.',
    });
  }

  console.log('contact: sent');
  return res.status(200).json({ ok: true });
}
