# Runbook — Contact form

Covers the most likely operational incidents for the Softfinity contact form
(`/api/contact`). Each section lists symptoms, diagnosis, and resolution.

---

## 1. Form is broken in production (lead not received)

**Symptoms:** Stakeholder reports they stopped receiving enquiries; or a test
submission shows a 500 error / the error state in the UI.

**Triage order:**

1. Open the Vercel dashboard → Logs → filter to `/api/contact`.
   Look for `contact: send_failed` or `contact: discord_fallback_ok`.

2. If `send_failed` appears: Resend is the problem. Check
   [status.resend.com](https://status.resend.com). If Resend is up, check:
   - Is `RESEND_API_KEY` still valid? (Resend dashboard → API Keys)
   - Is the `send.<domain>` subdomain still verified? (Resend → Domains)

3. If `contact: discord_fallback_ok` appears: Resend failed but Discord captured
   the lead. The user saw a success response. Manually forward the lead from
   Discord to the stakeholder while you fix Resend.

4. If neither log appears: the function may not be deploying. Check the Vercel
   deployment status.

---

## 2. Resend API key rotation

Do this after any suspected compromise, or on request.

1. Log into [resend.com](https://resend.com) → API Keys.
2. Create a new key named `Production` (or `Development` for the local key).
3. **Do not delete the old key yet.**
4. Update the key in the right place:
   - Production: Vercel dashboard → Project → Settings → Environment Variables → `RESEND_API_KEY`
   - Local dev: `.env.local` → `RESEND_API_KEY`
5. Redeploy (Vercel will pick up the new env var on next deploy; trigger one
   manually if needed: `vercel deploy --prod`).
6. Send a test submission. Confirm it arrives in the stakeholder inbox.
7. Delete the old key from the Resend dashboard.

---

## 3. Discord webhook rotation

1. Open the Discord server → the lead-capture channel → Edit Channel →
   Integrations → Webhooks.
2. Create a new webhook. Copy the URL.
3. Update `DISCORD_WEBHOOK_URL` in Vercel env vars (and `.env.local` for dev).
4. Redeploy, send a test submission, confirm the message appears in the channel.
5. Delete the old webhook.

---

## 4. Resend domain verification lapsed

**Symptom:** `send_failed` in logs; Resend dashboard shows domain unverified.

**Resolution:**
1. Log into Resend → Domains → click the `send.<domain>` domain.
2. Re-add any missing DNS records (SPF, DKIM, DMARC) in the DNS host panel.
3. Click "Verify" in Resend. DNS propagation can take up to 48 h.

DNS records to add (exact values shown in the Resend dashboard):

| Type | Host | Value |
|------|------|-------|
| TXT  | send | Resend SPF record |
| TXT  | resend._domainkey.send | Resend DKIM record |
| TXT  | _dmarc.send | `v=DMARC1; p=none; rua=mailto:hello@<domain>` |

---

## 5. Spam volume is high

If legitimate Resend quota (100/day free tier) is being consumed by spam:

1. Check Vercel logs for `honeypot_triggered` / `time_check_failed` to confirm
   which checks are catching bots.
2. If bots are getting past all three checks, consider adding Cloudflare Turnstile
   (see ADR-0007 § "Future enhancements").
3. Temporarily set an extremely long `RESEND_API_KEY` timeout or switch to a
   stub key to stop outbound email while the spam wave passes.

---

## 6. Environment variables reference

| Variable | Where to set | Purpose |
|----------|-------------|---------|
| `RESEND_API_KEY` | Vercel env vars (prod) / `.env.local` (dev) | Resend authentication |
| `CONTACT_TO_EMAIL` | Vercel env vars / `.env.local` | Destination inbox |
| `CONTACT_DOMAIN` | Vercel env vars / `.env.local` | Sending domain (e.g. `softfinity.com`) |
| `DISCORD_WEBHOOK_URL` | Vercel env vars / `.env.local` | Lead-log channel; omit to disable |
