# ADR 0009 — Migrate static subpages to React Router

- **Status:** Accepted
- **Date:** 2026-07-06

## Context

When the site launched, the homepage was a React SPA and the 18 subpages
(`/pages/*`, `/services/*`) were plain HTML files. This created a maintenance
problem: any shared element — nav, footer, contact form, CSS tokens — had to
be edited in two places.

Concretely:

- The contact form existed twice: as `src/sections/Contact.tsx` (React, with
  full API integration) and as `public/contact-modal.js` (vanilla JS, still a
  no-op). They had diverged in copy and behaviour.
- Footer links in `src/sections/Footer.tsx` pointed at `.html` files. Renaming
  a page meant editing both the HTML and the React footer.
- Subpages used absolute `../index.html#contact` hrefs for CTAs, which caused
  a full-page reload to the homepage on every "Connect with a specialist" click.
- Loading the DS bundle, fonts, and stylesheets had to be repeated in the
  `<head>` of every HTML file.

ADR-0001 noted: *"Revisit if we grow past ~5–10 distinct routes and
routing-by-folder starts looking attractive."* We hit 18 routes.

## Options considered

### 1. Keep the dual codebase, accept the maintenance cost

No migration work. Continue editing HTML files and React in parallel.

Rejected: the contact form was the forcing function. The real form (with Zod
validation, Resend, spam protection) lives in React; the HTML modal was a
stub. Shipping without fixing this would mean subpage CTAs silently discard
leads.

### 2. Multi-page Vite (MPA mode)

Vite supports multiple `index.html` entry points, one per page. Each page
gets its own JS bundle. Shared components can be imported across pages.

Rejected: MPA mode requires a separate entry file per page, still needs
`<head>` boilerplate in each HTML file, and doesn't give client-side
navigation between pages. The DX improvement over plain HTML is small.

### 3. Migrate to Next.js

Replace Vite with Next.js. Get SSR, file-based routing, `app/api/` routes,
and `<Head>` management for free.

Rejected for the same reasons as ADR-0001: the owner is not a professional
frontend engineer; Next.js adds significant conceptual overhead (server vs
client components, layouts, metadata API, image optimisation pipeline) that
isn't justified by the site's needs. The contact form is already working as a
Vercel Function — we don't need the tighter framework coupling.

### 4. React Router DOM within the existing Vite setup

Add `react-router-dom` to the existing Vite project. Wrap `<App />` in
`<BrowserRouter>`. Port all HTML files to React components. Delete the HTML
files. Add a Vercel SPA rewrite rule.

Accepted.

## Decision

**Migrate all subpages to React Router DOM within the existing Vite + React
setup.**

This keeps the stack decision from ADR-0001 intact (Vite + React) and adds
only one new dependency (`react-router-dom`). The existing Vercel Functions
in `/api/` are untouched.

## What changed

**New files:**

- `src/components/SubpageLayout.tsx` — shared subpage wrapper: sticky nav,
  footer, contact modal context provider
- `src/components/ContactForm.tsx` — extracted form logic; used by both
  `Contact.tsx` (homepage inline) and `ContactModal.tsx` (subpages)
- `src/components/ContactModal.tsx` — `createPortal`-based modal overlay;
  replaces `public/contact-modal.js`
- `src/components/ContactModalContext.tsx` — React context + `useContactModal()`
  hook so any CTA button deep in a page tree can open the modal
- `src/data/services.ts` — data for all 9 service pages; single source of truth
- `src/pages/services/ServicePage.tsx` — data-driven template; all 9 service
  pages are the same component, different data
- `src/pages/company/*.tsx` — 9 company page components (about, approach,
  principles, industries, consultants, case-studies, contact, stack-audit,
  the-conflict)
- `src/pages/NotFound.tsx` — catch-all 404 route
- `src/styles/subpage.css` — merged `service-page.css` + `page.css`

**Modified files:**

- `src/main.tsx` — wrapped in `<BrowserRouter>`, imports `subpage.css`
- `src/App.tsx` — now the router; homepage logic moved to `HomeContent`
  function; `ServicePageRoute` does the slug → data lookup
- `src/sections/Contact.tsx` — simplified; delegates form rendering to
  `<ContactForm>`
- `src/sections/Footer.tsx` — uses React Router `<Link>` instead of `<a href>`
- `src/sections/ServicesFull.tsx` — service cards link to `/services/:slug`
  via React Router `<Link>`
- `vercel.json` — added SPA rewrite: `/((?!api/).*) → /index.html`

**Deleted:**

- `public/services/*.html` (9 files)
- `public/pages/*.html` (9 files)
- `public/services/service-page.css`
- `public/pages/page.css`
- `public/contact-modal.js`

## Consequences

**Positive:**

- One codebase. Nav, footer, contact form, and CSS tokens exist in one place.
- Subpage CTAs open the real contact form (with Zod validation and Resend)
  instead of a no-op vanilla JS modal.
- Client-side navigation between pages — no full reloads.
- Adding a new page is: add a component in `src/pages/`, add a `<Route>` in
  `App.tsx`. No HTML boilerplate.

**Negative / tradeoffs:**

- **No SSR.** `document.title` is set via `useEffect`, which means crawlers
  see the default title on initial load. This is acceptable for now — the
  site's SEO comes from the homepage content, and Googlebot does execute JS.
  If this becomes a concern, the path to SSR is Vite SSR or Next.js migration;
  the React components are unchanged either way.
- **React bundle required for all pages.** A user hitting `/about` directly
  downloads the full JS bundle (~355 kB gzipped: 106 kB). Comparable to the
  HTML pages, which each loaded the full DS bundle anyway.
- **Vercel rewrite must stay in place.** Without it, direct URL access to
  any subpage 404s at Vercel's CDN. The rule is in `vercel.json` and must not
  be removed.

## CSS scoping note

The original `service-page.css` scoped its starfield and background rules to
`body.sp-body`. In React, `SubpageLayout` applies `className="sp-body"` to a
wrapper `<div>` instead of the body element. This is functionally equivalent:
`position: fixed` pseudo-elements still fill the viewport, and `sp-body > *`
correctly targets the nav, main, and footer as direct children.

The contact modal is rendered via `createPortal` to `document.body` to avoid
the `sp-body > * { z-index: 1 }` rule interfering with the modal's
`z-index: 1000`.

## Revisit if

- SEO becomes a priority — move to Vite SSR or Next.js. The page components
  are framework-agnostic React; the migration is a shell swap.
- The DS bundle is rebuilt as an ES module — at that point `window.React`
  exposure and the `whenDsReady()` dance in `main.tsx` can be removed.
