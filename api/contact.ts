import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { contactSchema } from '../src/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

// Allowed origins per environment. Origin is client-controlled so this is a
// low-cost filter against lazy bots only — not a security boundary.
function isAllowedOrigin(origin: string | undefined): boolean {
  switch (process.env.VERCEL_ENV) {
    case 'production':
      return origin === 'https://softfinity.com' || origin === 'https://www.softfinity.com';
    case 'preview':
      return typeof origin === 'string' && /^https:\/\/softfinity-site-[^.]+\.vercel\.app$/.test(origin);
    case 'development':
      return origin === 'http://localhost:5173';
    default:
      return false;
  }
}

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

// Posts submission data to Discord as a durable secondary record.
// Gated on DISCORD_WEBHOOK_URL — if unset, returns resolved without error.
// Supports both ADR-0006 option C (failure-only, called by the error path)
// and option E (always-on, called on the happy path alongside Resend).
async function notifyDiscord(payload: {
  name: string;
  email: string;
  domain: string | undefined;
  message: string;
}): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const lines = [
    `**New enquiry from Softfinity contact form**`,
    `**Name:** ${payload.name}`,
    `**Email:** ${payload.email}`,
    ...(payload.domain ? [`**Area:** ${payload.domain}`] : []),
    `**Message:**\n${payload.message}`,
  ];

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: lines.join('\n') }),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  // Spam check 1: origin allowlist (lazy-bot filter)
  const origin = req.headers['origin'] as string | undefined;
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ ok: false });
  }

  const body = req.body as Record<string, unknown>;

  // Spam check 2: honeypot — silent 200 if bot filled the hidden field
  if (body.website && String(body.website).trim() !== '') {
    console.log('contact: honeypot_triggered');
    return res.status(200).json({ ok: true });
  }

  // Spam check 3: time gate — silent 200 if submitted in under 2 s
  const submitTime = parseInt(String(body._t ?? '0'), 10);
  if (Date.now() - submitTime < 2000) {
    console.log('contact: time_check_failed');
    return res.status(200).json({ ok: true });
  }

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

  // Fan out to Resend (email) and Discord (durable lead log) in parallel.
  // Returns 200 if at least one destination succeeded; 500 only if both failed.
  const [emailResult, discordResult] = await Promise.allSettled([
    sendWithRetry({
      from: `Softfinity Contact <hello@send.${rootDomain}>`,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry: ${name} — Softfinity contact form`,
      text: bodyText,
    }),
    notifyDiscord({ name, email, domain, message }),
  ]);

  const emailOk = emailResult.status === 'fulfilled' && emailResult.value.ok;
  const discordOk = discordResult.status === 'fulfilled';

  if (!emailOk) {
    const errorName =
      emailResult.status === 'fulfilled' ? emailResult.value.errorName : 'promise_rejected';
    console.error('contact: send_failed', errorName);
    if (!discordOk) {
      console.error('contact: discord_failed');
      return res.status(500).json({
        ok: false,
        error: 'Failed to send. Please try again or email us directly.',
      });
    }
    // Discord captured the lead — tell the user it worked so they don't retry
    console.log('contact: discord_fallback_ok');
    return res.status(200).json({ ok: true });
  }

  console.log('contact: sent');
  return res.status(200).json({ ok: true });
}
