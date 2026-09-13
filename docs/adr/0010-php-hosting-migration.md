# ADR 0010 — Migrate deployment target to PHP-only shared hosting

- **Status:** Accepted
- **Date:** 2026-09-10

## Context

The stakeholder's existing hosting platform supports only PHP — it cannot
run Node.js, and therefore cannot run the Vercel Function at
`api/contact.ts` ([ADR-0003](0003-future-backend-vercel-functions.md),
[ADR-0008](0008-contact-form-implementation-plan.md)). The site must
deploy to that host.

Two facts make this migration far smaller than "rewrite the site in PHP":

1. **The frontend is already host-agnostic.** `npm run build` emits static
   HTML/CSS/JS into `dist/`. Any web server — including a PHP shared
   host's Apache — serves those files unchanged. Nothing in `src/`
   changes.
2. **Only one file executes on a server:** `api/contact.ts` (~160 lines).
   That is the entire porting surface.

Additional context that shaped the decisions below:

- The Resend sending-domain DNS records (SPF/DKIM/DMARC per ADR-0008 §2)
  have **already been verified** on the stakeholder's hosting platform.
  This removed the main blocker and made Resend viable immediately.
- We may want to return to a Node.js backend later (Vercel or otherwise).
  The migration must not paint us into a PHP corner.

## Decision

### 1. Frontend ships as the static `dist/` build — no changes

React, Vite, React Router, the design system, and the client-side Zod
validation are untouched. The SPA fallback that `vercel.json` provided is
reproduced by `.htaccess` (see §4).

### 2. The backend contract is the frozen interface

The frontend knows exactly three things about the backend, and the PHP
implementation preserves all three **byte-for-byte**:

- **URL:** `POST /api/contact` (never `/api/contact.php` in frontend code)
- **Request:** JSON `{ name, email, domain?, message, website, _t }`
  where `_t` is the form-mount timestamp as a string of epoch milliseconds
- **Response:** JSON `{ ok: boolean, error?: string }` with status codes
  `200 / 400 / 403 / 405 / 500`, with the same semantics as the Node
  version (spam-detected submissions return a **silent 200**)

Because the contract is frozen, a future pivot back to Node.js means
deploying `api/contact.ts` somewhere that runs it and changing **zero**
frontend code.

### 3. `api/contact.php` is a parallel implementation, not a replacement

`api/contact.ts` stays in the repo, unmodified, next to `api/contact.php`.
They are two implementations of the same contract; the deployment target
decides which one is live. The PHP port mirrors the Node version's
pipeline step-for-step:

| Step | Node (`contact.ts`) | PHP (`contact.php`) |
|---|---|---|
| Method check | `req.method` | `$_SERVER['REQUEST_METHOD']` |
| Origin allowlist | `VERCEL_ENV`-gated switch | `ALLOWED_ORIGINS` array in `config.php` |
| Honeypot (`website`) | silent 200 | silent 200 |
| Time gate (`_t` < 2 s) | silent 200 | silent 200 |
| Validation | Zod `safeParse` | hand-written checks mirroring the schema |
| Email send | Resend SDK | Resend HTTP API via cURL |
| Retry policy | 3 attempts (0 s/1 s/2 s), transient-only, never 4xx | identical |
| Lead-capture fallback | Discord webhook, `Promise.allSettled` fan-out | Discord webhook, sequential (see §7) |
| Logging | `console.log` event markers only | `error_log` event markers only |

### 4. `.htaccess` replaces `vercel.json`

Lives in `public/` so Vite copies it into `dist/` automatically — the
build output stays a single self-contained upload. Three jobs:

1. Rewrite `/api/contact` → `/api/contact.php` (keeps the clean URL that
   the contract requires)
2. SPA fallback: any path that is not a real file/directory and not under
   `/api/` serves `index.html` (React Router deep links survive refresh)
3. Deny direct HTTP access to `config.php` as defense-in-depth

### 5. `config.php` replaces Vercel environment variables

A PHP file returning an array of settings (`RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `CONTACT_DOMAIN`, `DISCORD_WEBHOOK_URL`,
`ALLOWED_ORIGINS`). Committed as `api/config.example.php` with placeholder
values; the real `api/config.php` is gitignored and created once on the
server (and once locally for dev). This mirrors the
`.env.example` / `.env.local` split from ADR-0008 §10. On the host,
`.htaccess` blocks direct requests to it; if the host allows files above
the web root, moving it there is a further hardening step (runbook).

### 6. Email stays on Resend, called via cURL

Considered:

- **PHP `mail()`** — zero dependencies, but worst deliverability and no
  delivery feedback; rejected because DNS verification for Resend was
  already complete, removing Resend's only cost.
- **PHPMailer + host SMTP** — good deliverability but requires SMTP
  credentials (not yet available) and vendoring a library.
- **Resend via its HTTP API (chosen)** — behavior-identical to the Node
  version, no new dependencies (cURL ships with PHP), the verified
  sending domain is reused, and both backend implementations stay
  interchangeable.

### 7. Fan-out becomes sequential

PHP has no `Promise.allSettled`; the port sends the Resend email (with
retries) first, then the Discord webhook. Worst case ~4 s + one webhook
call, comfortably inside shared-hosting execution limits (typically
30 s). The decision rule is unchanged: **200 if at least one destination
captured the lead; 500 only if both failed.** `curl_multi` could restore
parallelism but is complexity the traffic volume doesn't justify.

### 8. Validation rules are now maintained in two places

Zod cannot run in PHP, so `contact.php` hand-mirrors
`src/lib/contactSchema.ts` (name 2–100 trimmed; email
`FILTER_VALIDATE_EMAIL` ≤ 254; `domain` optional, must be in
`ALLOWED_DOMAINS`; message 50–1000 trimmed). **This is deliberate
duplication.** A cross-language schema abstraction (JSON Schema codegen
etc.) fails the Rule of Three for four fields. Both files carry a comment
pointing at the other; changing one means changing both.

### 9. Deployment becomes build-locally + upload

`git push` → Vercel auto-deploy is replaced by:

1. `npm run stage` — builds and assembles a `deploy/` folder
   (`dist/` contents + `api/contact.php` + `api/config.example.php`)
2. Upload `deploy/` contents to the host's web root (FTP/cPanel)
3. `config.php` is created **once** on the server and never overwritten
   by deploys

Preview deployments are gone; local rehearsal replaces them
(`php -S localhost:8000` behind the Vite dev proxy). The full procedure,
including rollback, lives in `docs/runbooks/php-deploy.md`.

## Consequences

- The site can go live on the stakeholder's existing hosting with no new
  platform accounts and no ongoing hosting cost.
- ADR-0003's "Vercel Functions for future backend" is **suspended for
  this deployment target**, not reversed — the contract freeze (§2) and
  the parallel implementation (§3) keep that door open.
- Two backend implementations must be kept behaviorally in sync if the
  contract ever changes. The contract table in §2 is the authority.
- Validation rules exist in two files (client Zod + server PHP); §8
  accepts this trade.
- Deploys are manual. Mitigated by the `stage` script and runbook;
  scriptable further (lftp/rsync) if it becomes a chore.
- Local development now needs PHP installed (`brew install php`).
- `VERCEL_ENV`-based origin gating is simplified to a per-deployment
  allowlist in `config.php` — one environment, one config.
