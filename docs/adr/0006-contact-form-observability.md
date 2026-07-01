# ADR 0006 — Contact form observability & lead capture redundancy

- **Status:** Accepted — option E implemented; webhook is env-var gated so it can be disabled without a code change
- **Date:** 2026-06-29

## Context

We are about to wire up the contact form (`src/sections/Contact.tsx`) to a
Vercel Function at `/api/contact` that sends an email via [Resend](https://resend.com)
when a visitor submits the form. See [ADR-0003](0003-future-backend-vercel-functions.md)
for the broader backend choice.

Even with [in-function retries on transient errors](#related-decisions), there
is a residual question we have to settle deliberately:

> **If Resend is down (or our config is broken) for some window of time, how
> do we know a lead was lost?**

The contact form is the only conversion path on the site. Each submission is
potentially a piece of consulting business worth far more than the engineering
effort to make sure none are quietly dropped on the floor. So this question
matters more than a typical "logging" decision.

## The failure we are trying to mitigate

1. Visitor fills out the form and hits submit.
2. Function runs, calls Resend.
3. Resend's API is returning 5xx (rare, but real — their status page shows
   incidents of minutes-to-hours occasionally), or our domain verification
   silently lapsed, or our API key was rotated and we forgot to update Vercel.
4. After retries, the function gives up. The user sees an error and (per
   ADR-0007 once written: the mailto fallback) hopefully emails directly.
5. **But many users won't email the fallback.** The lead is lost. We have
   no record it ever happened.

The point of observability here is not "did our system error?" — it is
**"did we lose a piece of business and need to follow up manually?"**

## Options considered

### A. Nothing
No logging, no alerts. We discover problems only if the stakeholder mentions
the form is broken.

- **Pros:** zero work.
- **Cons:** lost leads are invisible. Bad failure mode for a business site.

### B. Vercel function logs only
Add `console.error(...)` inside the function. Vercel captures stdout/stderr.
Logs are visible in the Vercel dashboard.

- **Pros:** zero cost, zero extra setup.
- **Cons:** log retention is ~1 hour on the Hobby/free plan. Nobody will
  actively check the dashboard. Effectively equivalent to A in practice.

### C. Vercel logs + webhook alert on failure
Same as B, plus: when the Resend send fails, the function POSTs a JSON
payload with the submission data to a Discord (or Slack) webhook URL. The
webhook is just a URL — no SDK, no auth header, no account needed beyond
making a private server/workspace to receive the messages.

- **Pros:** real-time alert with the submission data attached. We can manually
  forward the lead to the stakeholder if Resend was down.
- **Cons:** requires creating a Discord/Slack server. Doesn't capture
  successful leads — no permanent searchable history.

### D. Vercel logs + Sentry
Add Sentry's SDK, capture errors with stack traces. Free tier 5K events/mo
covers us easily.

- **Pros:** structured error capture, alerting, retention.
- **Cons:** overkill for a contact form. Sentry is for application errors,
  not business events. Lead data isn't in the error payload by default — we'd
  have to add it explicitly anyway. Yet another account to maintain.

### E. Webhook as primary record + Resend in parallel
Every submission goes to **both** Discord/Slack **and** Resend, in parallel,
on the happy path — not just on failure. The webhook channel becomes a
durable, searchable log of every lead ever submitted; Resend is the "nice
formatted email to the stakeholder" channel. The function awaits both and
only returns an error to the user if **both** fail.

- **Pros:**
  - No lead is truly lost unless two independent services fail at the same
    time (effectively never — Resend runs on AWS, Discord on Cloudflare).
  - Permanent searchable history of every lead — unlike Vercel logs' 1-hour
    retention. Useful even when nothing is broken (e.g., "did Jordan ever
    contact us?" → search the channel).
  - The webhook payload can include the full submission data, formatted for
    skim-reading.
  - Only ~5 lines of code beyond option C.
- **Cons:**
  - Requires a webhook target (Discord or Slack channel).
  - Submission data now exists in a third-party platform's storage — see
    "Privacy considerations" below.

## Recommendation (to discuss)

**Option E**, with **Discord** as the webhook platform.

The argument: this is a small business site where each lead is materially
valuable, and the cost of redundancy is trivial — a free Discord server, a
webhook URL, and ~10 LOC. The probability of both Resend and Discord being
down simultaneously is effectively zero. Permanent searchable history is a
nice side-benefit.

Discord is recommended over Slack because Discord webhooks are easier to
provision (no workspace admin friction; you can run a one-person Discord
server forever for free), but Slack works the same way and is fine if it
fits existing tooling better.

## Questions to settle with the stakeholder

These are the open items before we mark this Accepted:

1. **Is permanent capture of every submission OK with the stakeholder?**
   Option E means *every* lead's name, email, and message will sit in a
   Discord/Slack channel indefinitely. If they want submissions to be
   ephemeral (email-only, no log), we should pick C instead and only log on
   failure.

2. **Discord vs. Slack vs. something else?** Both work. If the stakeholder
   already uses one, default to that. If neither, Discord is lower-friction
   to set up.

3. **Who owns the webhook channel?** The person who creates the Discord
   server holds the keys. If the developer creates it and later leaves, the
   stakeholder needs to be added as an admin — otherwise lead history
   becomes inaccessible to the business.

4. **Do we need an audit/export path?** If at some point the stakeholder
   wants to export "all leads from Q1," Discord's UI is searchable but
   clunky. A "real" lead store (Notion, Airtable, a DB) would be better for
   that. Out of scope for v1, but worth flagging — option E doesn't preclude
   adding a third destination later.

## Privacy considerations

If we go with E, the privacy footer (if/when added) should disclose that
submissions are stored in a third-party messaging platform. For a B2B
contact form this is unremarkable and within reasonable expectations, but
GDPR-conscientious users might want to know.

## Related decisions

This ADR depends on / interacts with:

- [ADR-0003](0003-future-backend-vercel-functions.md) — Vercel Functions as
  the backend host.
- A future ADR (TBD) covering: retry policy (in-function exponential backoff
  for transient errors), spam protection (honeypot, rate limit), validation
  (shared Zod schema between client and server), and failure-mode UX
  (mailto fallback on error).

## Consequences

If we adopt option E:

- Add a `DISCORD_WEBHOOK_URL` environment variable to Vercel (and `.env.local`
  for development).
- Document the webhook payload format in the function's source comments.
- Add the Discord server to the project's "shared accounts" handover doc
  (if one exists; create if not).
- The function makes two parallel `fetch` calls instead of one. Function
  duration increases marginally. No measurable impact on the Vercel free
  tier.
