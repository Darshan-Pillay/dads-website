# ADR 0001 — Use Vite + React for the frontend

- **Status:** Accepted
- **Date:** 2026-06-25

## Context

The prior version of the site loaded React, ReactDOM, and Babel-standalone
from a CDN, then compiled JSX in the browser at runtime. This caused 2–4
seconds of blank page on first load and made "Connect with a specialist"
links from subpages land at the top of the page (because the React app
hadn't mounted by the time the browser tried to scroll to `#contact`).

We need a build pipeline. The site also needs to grow — payments and a
database are on the horizon.

## Options considered

1. **Static HTML.** Drop React entirely, hand-write HTML for every section.
   Fastest possible load, simplest mental model. Rejected: poor reuse, hard
   to scale, and we'd have to rewrite when we add interactive flows like
   checkout.
2. **Vite + React.** Pre-compile JSX to a bundle. Industry standard for
   client-rendered React. Tiny config. Vercel auto-detects it.
3. **Next.js.** React + routing + server-side rendering + API routes in one
   framework. The most "batteries-included" option.
4. **Astro.** Content-first framework that ships zero JS by default and
   supports React islands. Great for marketing sites but smaller community.

## Decision

Use **Vite + React**.

## Why not Next.js

Next.js gives us SSR and `app/api/` routes out of the box. But:

- The owner is not a frontend developer. Next.js has more concepts to learn
  (server components vs client components, layouts, metadata, routing
  conventions) for a marketing site this size.
- We don't need SSR yet — the site has no per-user content. When we do,
  switching from Vite to Next.js is a contained refactor (same React
  components, different shell).
- Vite + Vercel Functions in `/api/` covers our backend needs for the
  foreseeable future ([ADR-0003](0003-future-backend-vercel-functions.md)).

## Consequences

- We get a real build step (`npm run build` → `dist/`).
- Dev experience improves: HMR, source maps, instant feedback.
- We trade ~30 MB of `node_modules` for the build pipeline.
- The Polaris design system bundle still loads as a global script (it predates
  this project). `src/main.jsx` exposes `React` on `window` so it can find it.

## Revisit if

- We need server-rendered content or per-request data on the homepage.
- We grow past ~5–10 distinct routes and routing-by-folder starts looking
  attractive.
