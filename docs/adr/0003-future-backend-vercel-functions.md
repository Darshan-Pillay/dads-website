# ADR 0003 — Use Vercel Functions for future backend (DB, payments)

- **Status:** Accepted (forward-looking — no code yet)
- **Date:** 2026-06-25

## Context

The contact form currently does nothing. We expect to add:

- A working contact form (write the message to a database, email the team).
- Payment flows (Stripe checkout for paid offerings).
- Possibly a client portal (auth + per-user data).

The frontend is a Vite SPA ([ADR-0001](0001-frontend-vite-react.md)). It has
no server.

## Options considered

1. **Vercel Functions** — drop files into `/api/` and Vercel deploys each one
   as a serverless function. No extra infrastructure.
2. **Separate backend service** — host an Express/Fastify/Hono app on
   Render/Fly/Railway, talk to it from the SPA over HTTPS.
3. **Migrate to Next.js** — get server components and API routes in one
   framework.
4. **Backend-as-a-service (Supabase / Firebase)** — skip writing backend code
   and call the BaaS directly from the SPA.

## Decision

Use **Vercel Functions** for backend code. Files at the root of `/api/` become
serverless endpoints automatically.

## Layout

```
/api/
  contact.js       ← POST: contact form → DB + email
  checkout.js      ← POST: create Stripe checkout session
  webhooks/
    stripe.js      ← Stripe webhook receiver
```

Each function exports a default request handler. The frontend calls them with
`fetch('/api/contact', { method: 'POST', body: ... })` — same origin, no CORS
to configure.

## Why

- We already deploy on Vercel. No new infrastructure to manage.
- Each function scales independently from zero. We pay only when invoked.
- Keeps the frontend stack unchanged. Vite stays.
- If we outgrow it, the migration is straightforward: move handlers to a
  long-running server, point `/api/*` at it through a Vercel rewrite.

## Why not the alternatives

- **Separate backend service**: more infra to babysit, CORS to configure,
  separate deploy. Premature for our load.
- **Migrate to Next.js**: bigger change than we need for one or two API
  endpoints. Revisit if we add a lot of server-rendered pages.
- **Supabase/Firebase**: handy but locks the data model into a vendor.
  Reasonable for an MVP; we'd want to be deliberate about it.

## Database choice (separate decision, when needed)

Likely **Vercel Postgres** (managed Postgres, integrates with Vercel
Functions, generous free tier) or **Supabase** (Postgres + auth + storage).
Write a new ADR when we commit to one.

## Payments

Stripe. Two endpoints:
- `POST /api/checkout` — create a Checkout Session, return the redirect URL.
- `POST /api/webhooks/stripe` — receive payment events, update the DB.

Stripe keys live in Vercel environment variables, not in the repo.

## Consequences

- Backend code lives in the same repo as the frontend. Easy to refactor
  together, easier onboarding.
- We're coupled to Vercel for hosting. Migrating off Vercel later means
  rewriting `/api/` handlers for another runtime — not hard, but real work.
- We need to add environment-variable management (Vercel dashboard) when the
  first function ships.

## Revisit if

- A function needs > 60s of compute (Vercel Functions have a timeout).
- We need long-running connections (WebSockets, SSE).
- The data model grows complex enough that a real ORM + migrations workflow
  becomes painful inside the same repo.
