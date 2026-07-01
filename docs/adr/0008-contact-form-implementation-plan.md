# ADR 0008 — Contact form implementation plan

- **Status:** Accepted (architecture); Proposed (specific items pending external input — see "Blocked on stakeholder input")
- **Date:** 2026-06-29

## Context

The contact form at `src/sections/Contact.tsx` currently calls a no-op
`onSubmit` handler. This ADR records every implementation decision needed
to wire it up to a working backend, so that once outstanding stakeholder
input is gathered, the build is a mechanical exercise.

Closely related ADRs:
- [ADR-0003](0003-future-backend-vercel-functions.md) — backend on Vercel Functions
- [ADR-0006](0006-contact-form-observability.md) — observability (Proposed)
- [ADR-0007](0007-contact-form-spam-protection.md) — spam protection

## The decision tree

### 1. Backend shape
- **Single Vercel Function** at `/api/contact.ts`. No abstraction layer, no
  provider interface — Resend is named directly in the function. Per the
  YAGNI argument: a Notifier interface earns its keep only with multiple
  real destinations, which we don't have on day one.

### 2. Email provider
- **Resend** (free tier: 3,000/mo, 100/day, 1 verified domain, no credit
  card).
- **Sending domain:** subdomain pattern — `send.<root-domain>` — to isolate
  outbound-email DNS records (SPF/DKIM/DMARC) from the main domain's
  existing MX/SPF. Main domain's inbox setup is untouched.
- **From:** `Softfinity Contact <hello@send.<root-domain>>`
- **Reply-To:** the visitor's submitted email — so the stakeholder hits
  reply and the lead receives it.
- **Subject:** `New enquiry: {name} — Softfinity contact form`
- **Body:** plain text. Roughly:
  ```
  New enquiry from the Softfinity contact form.

  Name:    Jordan Maré
  Email:   jordan@acme.com
  Area:    SAP
  Message:
    We're consolidating three regional ERP instances and would
    love to talk about a phased approach.

  ----
  Reply directly to this email to respond to Jordan.
  ```

### 3. Validation
- **Library:** Zod. One shared schema in `src/lib/contactSchema.ts`,
  imported by both `src/sections/Contact.tsx` (client) and `api/contact.ts`
  (server).
- **Rules:**

  | Field | Required | Rule |
  |---|---|---|
  | `name` | yes | trimmed, 2–100 chars |
  | `email` | yes | contains `@`, contains `.` after the `@`, ≤254 chars |
  | `domain` | no | if present, must be one of the 10 predefined dropdown options (server-side `z.enum(...)`) |
  | `message` | **yes (changed from current optional)** | trimmed, 10–1000 chars |

- **Email check is deliberately loose.** The RFC-compliant regex is
  thousands of characters long and still rejects valid addresses. If the
  shape looks like an email and Resend can deliver it, we accept it.

### 4. Failure handling
- **Retries:** In-function, exponential backoff, **only on transient
  errors** (5xx from Resend, network errors, timeouts). Three attempts max:
  immediate → +1s → +2s. Total budget ~3-4s, well under Vercel's 10s
  function timeout. **Never retry 4xx** — retrying invalid input won't help.
- **User-facing failure UX:** Error message inline beneath the form +
  `mailto:` fallback link to the contact email in the Footer. Form values
  are preserved (never blanked on error).
- **Double-submit prevention:** Client-side only. Submit button shows the
  loading state (see §7) and is disabled while a request is in flight.
  No server-side dedup — the threat doesn't justify a stateful store.

### 5. Observability (pending — see ADR-0006)
- The function should be structured so it can fan out to multiple
  destinations in parallel. Whether destination set is `[Resend]` or
  `[Resend, DiscordWebhook]` is just a config detail — both shapes use
  `Promise.allSettled([...])` and surface 200 if at least one succeeded.
- **Settle this with the stakeholder before launch:** option C (Discord
  webhook only on failure) vs. option E (Discord webhook always + Resend
  in parallel) per ADR-0006.

### 6. Spam protection (see ADR-0007)
- **Honeypot** field named `website`, positioned offscreen, `aria-hidden`,
  outside the tab order. Filled = silent 200, no email sent.
- **Time check** via hidden `_t` field set on form mount. Submission within
  2s of mount = silent 200, no email sent.
- **Origin check** server-side, gated by `process.env.VERCEL_ENV`:
  - `production`: only the production domain(s).
  - `preview`: Vercel preview-deploy URL pattern.
  - `development`: `http://localhost:5173` only.
  - Other / unset: empty allowlist (reject all).
  - Origin header is client-controlled — this check is a low-cost filter
    against lazy bots, not load-bearing security.

### 7. Loading state (animation while request is in flight)
- **Visual:** button background gets an animated gold-gradient sweep
  (200% background size, animating `background-position` over ~1.6s,
  ease-in-out, infinite).
- **Text:** button label shifts from "Connect with a specialist" to
  "Sending…".
- **No spinner.** Spinners read as low-quality on a premium site;
  this site's design language argues for restrained motion.

### 8. Success state
- **Inline replacement with animation** inside the same form card —
  no modal, no page navigation.
- Form fields fade out (~250ms), success content fades in (~300ms).
- Card maintains the same dimensions during the transition so layout
  doesn't reflow.
- Success content: a small mark (matching `softfinity-mark-gold.svg`),
  headline ("Thanks. We've got your message."), and a one-sentence
  expectation-setter ("A senior consultant will reach out within one
  business day.").
- No Close button. The success state is terminal for this page view;
  refreshing returns to the form.
- **Remove the placeholder modal currently in `App.tsx:133-136`.**
- **Remove the demo-only disclaimer** in that copy.

### 9. Privacy
- One-sentence privacy note under the submit button: *"We'll use your
  details only to reply to this enquiry. See our [privacy notice](/privacy)
  for the full story."*
- **Stub privacy policy page** at `/privacy`. Even a 200-word page covers
  the obligation: what's collected (name, email, message), why (to reply),
  where it goes (stakeholder inbox + the webhook log channel per ADR-0006),
  how long it's kept, how to request deletion.
- **No explicit consent checkbox.** B2B contact forms operate on
  "legitimate interest" under GDPR — explicit consent is unnecessary and
  adds friction at the worst possible moment.
- **Crucial:** the privacy policy must disclose the third-party log
  destination if ADR-0006 option E (Discord/Slack permanent capture) is
  adopted.

### 10. Security & key handling
- **Two Resend API keys**, named `Production` and `Development` in the
  Resend dashboard.
- **Production key:** lives in Vercel's env-var store. Set via Vercel
  dashboard → Project → Settings → Environment Variables. Never in repo.
- **Development key:** lives in `.env.local` at the repo root.
  `*.local` is already in `.gitignore` (verified — line 5).
- **`.env.example` committed** at repo root listing variable names with
  brief comments and a one-line acquisition hint. No real values.
- **Dev `CONTACT_TO_EMAIL` overrides to your own inbox** so dev testing
  doesn't ping the stakeholder. Production value sends to the stakeholder.
- **Logging hygiene** (see ADR-0006 follow-up):
  - **Never log:** `req`, `req.headers`, `process.env`, the raw Resend
    response, or the submission body (name/email/message).
  - **OK to log:** event markers (`"contact: received"`,
    `"contact: sent"`), error codes, sanitised error messages, timing.
- **Key rotation:** on incident only. Runbook lives at
  `docs/runbooks/contact-form.md` (to be created).
- **Vercel project access:** currently just the developer. Stakeholder
  access deferred pending separate conversation.

## File-level surface

The minimal set of changes the implementation needs to touch:

**New files:**
- `api/contact.ts` — the function.
- `src/lib/contactSchema.ts` — Zod schema, exported types, allowed-origins
  computation, allowed-domains const.
- `.env.example` — variable name template.
- `docs/runbooks/contact-form.md` — rotation runbook.
- `public/privacy.html` (or React-routed `/privacy` page) — stub policy.

**Modified files:**
- `src/sections/Contact.tsx` — wire `onSubmit` to `fetch('/api/contact')`,
  add honeypot + `_t` hidden inputs, add status state machine
  (`idle | submitting | success | error`), add privacy note, integrate
  loading + success animations.
- `src/App.tsx` — remove the placeholder `Dialog` modal (lines 133–136)
  and the `sent` state. Success now lives inside the form.
- `package.json` — add `resend` and `zod` to dependencies.
- `vercel.json` (new, optional) — only if function config (timeout,
  region) needs to differ from defaults.

## Blocked on stakeholder input

The following can be filled in by environment variables — **the code does
not change** when these are resolved. Code can be written today with empty
or placeholder env-var values; they get populated when the answers arrive.

| Item | Where it ends up | What's needed |
|---|---|---|
| Exact root domain | Production `VERCEL_ENV` origin allowlist; `From` and `Reply-To` derivation | Confirm domain string (e.g. `softfinity.com`) |
| DNS host | Operational only — needed to add Resend's SPF/DKIM/DMARC records to the `send.` subdomain | Identify whether DNS is at GoDaddy, Namecheap, Cloudflare DNS, registrar's own panel, etc. |
| Email host | Confirmation only — for awareness when adding Resend records that we don't conflict with existing MX/SPF | Identify Google Workspace / Microsoft 365 / Zoho / other |
| Stakeholder's preferred contact email for production | `CONTACT_TO_EMAIL` env var in Vercel production | Confirm the address (e.g. `hello@softfinity.com` or a personal one) |
| Observability destination (ADR-0006 C vs E) | `DISCORD_WEBHOOK_URL` env var; function fan-out behaviour | Stakeholder preference: ephemeral-on-failure-only (C) or permanent-capture (E) |
| Webhook platform if E | Discord vs Slack | Stakeholder preference and existing tooling |

## Pre-launch checklist (once stakeholder input lands)

1. Buy or confirm the domain. Add Resend's SPF/DKIM/DMARC TXT records on
   the `send.` subdomain in the DNS host. Verify in the Resend dashboard.
2. Generate Production and Development Resend API keys.
3. Set production env vars in Vercel: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   and (if option E) `DISCORD_WEBHOOK_URL`.
4. Set local env vars in `.env.local`: same three variables, with dev key
   and dev destination.
5. Implement the surface in the order listed above.
6. Smoke-test in `vercel dev`. Confirm:
   - Real submission reaches dev inbox.
   - Validation errors render correctly client-side.
   - Honeypot + time-check return silent 200.
   - Failure UX shows mailto fallback (test by temporarily setting an
     invalid `RESEND_API_KEY`).
7. Deploy. Submit one real test from production. Confirm landing in
   stakeholder's inbox and (if applicable) the log channel.
8. Update privacy policy stub to mention any third-party destinations.

## Implementation slices

The work is decomposed into 9 vertical slices, each end-to-end shippable.
Sequencing aims to land a working ugly form first (V1), then resilience
(V2/V3), then polish (V4/V5/V6), then redundancy (V7) and docs (V8), then
production (V9).

| # | Slice | Depends on | Summary |
|---|---|---|---|
| V1 | Happy-path skeleton | — | Zod schema in `src/lib/contactSchema.ts`; `api/contact.ts` with validation + Resend call (no retries yet); `Contact.tsx` posts via `fetch`, basic status state machine, `message` becomes required; `.env.example`. After this: form sends a real email when configured. |
| V2 | Spam protection | V1 | Honeypot field, time check (`_t`), origin check with `VERCEL_ENV` gating. All silent (return 200 with no send). Per ADR-0007. |
| V3 | Robust failure handling | V1 | In-function retries (3 attempts, backoff, transient errors only); inline error UI with mailto fallback; preserve form values on error; disable submit button while in flight. |
| V4 | Loading state polish | V1 | Gold-gradient sweep on button background (~1.6s, low contrast) + "Sending…" text shift. No spinner. |
| V5 | Success state polish | V1 | Remove `Dialog` modal in `App.tsx`. Inline replacement with fade animation within the form card. New success copy. |
| V6 | Privacy posture | V1 | One-sentence privacy note under submit button; stub `/privacy` page (~200 words). No consent checkbox. |
| V7 | Observability (webhook fan-out) | V1 | Refactor send step to `Promise.allSettled([resend, maybeDiscord])`; env-var gated on `DISCORD_WEBHOOK_URL`. Code works for both ADR-0006 option C (failure-only) and option E (always-on) via small toggle. |
| V8 | Operational docs | V7 | Write `docs/runbooks/contact-form.md` covering key rotation, Resend issues, webhook rotation, prod-form-broken triage. Update privacy policy stub to disclose third-party destinations. |
| V9 | Production deploy | V1 | Sign up for Resend; verify `send.<domain>` subdomain (SPF/DKIM/DMARC TXT records in DNS host); generate Production + Development API keys; set Vercel env vars; create local `.env.local`; deploy and smoke-test production + failure path. **Operationally blocked** on stakeholder input (see "Blocked on stakeholder input"). |

**Pickable order in practice:** V1 → V3 → V2 → V4/V5/V6 (any order) → V7 → V8 → V9.

A future contributor (or future-Claude in a fresh context) can pick up any
slice independently using only this ADR. If session-level task tracking is
lost, this table is the authoritative slice list.

## Consequences

- The contact form ceases to be vapourware. The site gains a real
  conversion path.
- Two new third-party dependencies (Resend, optional Discord/Slack
  webhook). Both free at our volume. Both replaceable in one file.
- The repo grows by ~150 LOC and ~6 files. No new build tooling, no new
  framework, no new deployment pattern.
- One ongoing operational responsibility appears: keep the Resend API key
  and webhook URL healthy. Rotation runbook handles the incident case.
