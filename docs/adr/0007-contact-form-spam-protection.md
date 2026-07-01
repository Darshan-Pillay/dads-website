# ADR 0007 — Contact form spam protection

- **Status:** Accepted
- **Date:** 2026-06-29

## Context

The contact form (`src/sections/Contact.tsx`) will POST to a Vercel Function
at `/api/contact` that sends an email via Resend. See
[ADR-0003](0003-future-backend-vercel-functions.md) and
[ADR-0006](0006-contact-form-observability.md) for the broader contact-form
architecture.

Any public form on the internet attracts bot traffic indiscriminately —
scrapers POST garbage at every HTML form they can find. We should expect
bots to outnumber real submissions 10–100x within weeks of going live.

The actual costs of bot spam (the form itself can't do anything dangerous —
it just sends an email) are:

1. The stakeholder's inbox gets noisy and they have to learn which messages
   are real.
2. Resend's free-tier limits (100 emails/day) get burned by spam, causing
   real submissions to be rejected at the function level during an attack.
3. If we adopt the parallel-webhook logging approach proposed in ADR-0006,
   signal-to-noise in the Discord/Slack channel collapses.

## The defensive techniques considered

Each technique catches a different category of bot. No single technique
catches everything; layering cheap defenses is the realistic posture.

| Technique | What it catches | UX cost | Setup cost |
|---|---|---|---|
| Honeypot field | Dumb scrapers that fill every field they see | Zero | ~5 LOC |
| Time check | Scripts that submit instantly (no human takes <2s) | Zero | ~5 LOC |
| Origin/Referer check | Submissions from outside our actual site | Zero | ~3 LOC |
| CAPTCHA (e.g. Cloudflare Turnstile) | Sophisticated bots that pass the above | Near-zero | ~15 min + free account |
| Rate limit per IP | Floods from a single source | Zero (legit users never hit it) | Moderate — needs Vercel KV |
| Disposable email blocker | Bots using mailinator-style addresses | Tiny | ~5 LOC + public list |

## Decision

**Adopt Posture 1 — honeypot + time check + origin check.** Three cheap,
invisible defenses, layered.

### Implementation outline

1. **Honeypot field** in the form:
   ```tsx
   <input
     type="text"
     name="website"
     tabIndex={-1}
     autoComplete="off"
     style={{ position: 'absolute', left: '-9999px' }}
     aria-hidden="true"
   />
   ```
   Server-side: if `body.website` is non-empty, **return 200 with `ok: true`
   and send no email.** Returning 200 (not 400) prevents the bot from
   learning the field is a trap and rotating to a new strategy.

2. **Time check.** On form mount in the browser, capture `Date.now()` and
   include it as a hidden `_t` field in the submission. Server: if
   `Date.now() - parseInt(body._t) < 2000`, treat as spam and silently
   accept (same pattern as honeypot — return 200, send no email).

3. **Origin check.** Server: reject requests whose `Origin` header is not
   in the per-environment allowlist. Return 403.

   The allowlist is **gated by `process.env.VERCEL_ENV`** so local-dev
   origins never apply in production:

   ```ts
   const allowed = (() => {
     switch (process.env.VERCEL_ENV) {
       case 'production': return ['https://softfinity.com', 'https://www.softfinity.com'];
       case 'preview':    return [/^https:\/\/softfinity-site-.*\.vercel\.app$/];
       case 'development': return ['http://localhost:5173'];
       default:           return [];
     }
   })();
   ```

   **Limitation of the origin check:** the `Origin` header is
   client-controlled — a script using `curl` or a custom HTTP client can
   set it to anything. So the origin check only filters lazy bots that
   don't bother setting the header. It is **not** load-bearing security;
   the honeypot and time check do the real work (the honeypot requires the
   bot to know which field is the trap; the time check requires waiting
   2+ seconds, which kills throughput-oriented spam scripts). Origin check
   is kept because it costs ~3 lines and catches the dumb cases for free.

The combination catches ~80–90% of bot traffic at effectively zero UX cost
and ~15 lines of code total.

## Why not the alternatives (yet)

- **Cloudflare Turnstile (Posture 2):** would catch most of the remaining
  bots that pass Posture 1. Free, near-invisible to users, no Google
  tracking, no PII collected. **Deliberately deferred** because (a) we have
  no production traffic yet to know whether Posture 1 is sufficient, and
  (b) the 15-minute setup + Cloudflare account is a cost not yet justified
  by data. **Re-evaluate this if:**
  - Real submissions drop below noise level in the log channel.
  - Resend's 100/day quota gets burned by spam.
  - The stakeholder reports the inbox is unmanageable.
- **Rate limiting per IP:** requires Vercel KV (or another stateful store)
  for the counter. Yet another service to configure. YAGNI until we
  actually see an attack pattern from a single source.
- **Disposable email blocker:** adds a small risk of rejecting legitimate
  users on temporary mail services. Not worth the trade-off without
  evidence.

## Future enhancements (in priority order)

If spam volume becomes a problem after launch, escalate in this order — each
step is independent and additive, not a replacement for the previous one:

1. **Add Cloudflare Turnstile** (Posture 2). The next obvious upgrade. New
   ADR not required — it's a tightening of this decision, can be a brief
   amendment here. Notes for implementation:
   - Sign up for Cloudflare Turnstile (free, no card).
   - Add the widget to `Contact.tsx`. Server validates the token via
     Turnstile's verify API before processing.
   - Store the site key in the client bundle and the secret key as
     `TURNSTILE_SECRET` in Vercel env vars.
2. **Add rate limiting** per IP using Vercel KV. Threshold around 5
   submissions per IP per hour is a reasonable starting point.
3. **Add disposable email blocking** using a maintained public list (e.g.
   `disposable-email-domains` npm package). Only worth it if the data shows
   bots actually using disposable addresses.

## Related decisions

- [ADR-0003](0003-future-backend-vercel-functions.md) — Vercel Functions
  as the backend host.
- [ADR-0006](0006-contact-form-observability.md) — Lead capture redundancy
  (still Proposed; affects how spam noise impacts the log channel).

## Consequences

- The submit handler in `Contact.tsx` will include a hidden honeypot field
  and a hidden `_t` timestamp field.
- The function in `api/contact.ts` will perform three pre-validation checks
  (honeypot, time, origin) before running the Zod schema check.
- The allowed-origins list lives in the function source as a small
  computed const, gated by `process.env.VERCEL_ENV`. Local-dev and preview
  origins are **never** reachable from production code paths.
- These defenses are invisible to users — no accessibility, screen-reader,
  or keyboard-navigation impact (honeypot is `aria-hidden` and outside the
  tab order; time check is non-interactive).
