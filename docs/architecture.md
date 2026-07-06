# Architecture

One-pager describing how this site is put together and where it can grow.

## What this is

A marketing site for **Softfinity Consulting**. Single React SPA that covers
the homepage and all subpages (services, company pages, contact) through
client-side routing. The homepage is interactive (scroll-reveal animations,
a working contact form); subpages are React components sharing the same nav,
footer, and contact modal.

## Stack

| Layer       | Choice                          | Why                                                                |
|-------------|---------------------------------|--------------------------------------------------------------------|
| Language    | TypeScript (TSX), strict        | Catches prop/shape errors at build, shared client/server types. See [ADR-0004](adr/0004-adopt-typescript.md). |
| UI          | React 18                        | Reusable components, large ecosystem.                              |
| Routing     | React Router DOM v6             | Client-side routing for all pages — one codebase, no HTML files. See [ADR-0009](adr/0009-react-router-subpages.md). |
| Build       | Vite 5                          | Fast dev server, simple `npm run build`. See [ADR-0001](adr/0001-frontend-vite-react.md). |
| Styling     | CSS files + design system tokens | Design system under `public/_ds/`. Subpage styles in `src/styles/subpage.css`. |
| API         | Vercel Functions in `/api/`     | Contact form live on `POST /api/contact`. See [ADR-0003](adr/0003-future-backend-vercel-functions.md). |
| Email       | Resend                          | Transactional email for contact form submissions. |
| Hosting     | Vercel                          | Auto-detects Vite, deploys on push. SPA rewrite rule in `vercel.json`. |

## Directory layout

```
.
├── index.html             ← Vite entry; loads DS CSS + _ds_bundle.js
├── vercel.json            ← build config + SPA rewrite (all non-/api/ paths → index.html)
├── package.json
├── tsconfig.json
├── vite.config.js
├── api/
│   └── contact.ts         ← POST /api/contact — Resend email + Discord webhook
├── src/
│   ├── main.tsx           ← BrowserRouter + <App />, waits for DS bundle to load
│   ├── App.tsx            ← <Routes> — homepage at "/", all subpage routes
│   ├── ds.tsx             ← bridge to the design system globals
│   ├── icons.tsx          ← <Icon> wrapper around Lucide
│   ├── types.ts           ← shared types (Tweaks, ServicePageData, Outcome)
│   ├── globals.d.ts       ← window globals, CSS custom property typing
│   ├── lib/
│   │   └── contactSchema.ts ← Zod schema shared by frontend + api/contact.ts
│   ├── data/
│   │   └── services.ts    ← data objects for all 9 service pages
│   ├── components/
│   │   ├── SubpageLayout.tsx      ← shared wrapper: sp-nav + footer + contact modal
│   │   ├── ContactForm.tsx        ← form fields, validation, API call
│   │   ├── ContactModal.tsx       ← dialog overlay; renders ContactForm via portal
│   │   └── ContactModalContext.tsx ← openModal() context consumed by CTA buttons
│   ├── pages/
│   │   ├── NotFound.tsx
│   │   ├── services/
│   │   │   └── ServicePage.tsx    ← data-driven template for all 9 service pages
│   │   └── company/
│   │       ├── AboutPage.tsx
│   │       ├── ApproachPage.tsx
│   │       ├── PrinciplesPage.tsx
│   │       ├── IndustriesPage.tsx
│   │       ├── ConsultantsPage.tsx
│   │       ├── CaseStudiesPage.tsx
│   │       ├── ContactPage.tsx
│   │       ├── StackAuditPage.tsx
│   │       └── TheConflictPage.tsx
│   ├── sections/          ← homepage section components (Hero, Nav, Contact, …)
│   └── styles/
│       ├── site.css       ← homepage styles
│       └── subpage.css    ← subpage styles (merged from old service-page.css + page.css)
├── public/
│   ├── _ds/               ← Polaris design system bundle (CSS + JS)
│   ├── assets/            ← images, logos, favicon
│   └── privacy.html       ← standalone static page (stays out of React)
└── docs/
    ├── architecture.md    ← you are here
    ├── migration-react-router.md ← the migration plan that was executed
    └── adr/               ← architecture decision records
```

## Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `HomeContent` (inside App.tsx) | Full homepage SPA |
| `/services/:slug` | `ServicePage` | slug = sap, microsoft, oracle, ibm, ai, cloud, data, blockchain, mobile |
| `/about` | `AboutPage` | |
| `/approach` | `ApproachPage` | |
| `/principles` | `PrinciplesPage` | |
| `/industries` | `IndustriesPage` | |
| `/consultants` | `ConsultantsPage` | |
| `/case-studies` | `CaseStudiesPage` | |
| `/contact` | `ContactPage` | |
| `/stack-audit` | `StackAuditPage` | |
| `/the-conflict` | `TheConflictPage` | |
| `*` | `NotFound` | |
| `/privacy` | `public/privacy.html` | Served statically by Vercel |

## How it runs

**Development**

```
npm install   # one-time
npm run dev   # starts Vite at http://localhost:5173
```

All routes work in dev because Vite's dev server falls back to `index.html`
for unknown paths. In production, `vercel.json` has the equivalent rewrite:

```json
{ "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }] }
```

**Production build**

```
npm run build      # tsc --noEmit then vite build → ./dist
npm run preview    # serves ./dist locally
```

**Deployment**

Push to `main` → Vercel build → live. The SPA rewrite ensures that direct
URL access to `/services/sap` or `/about` resolves to `index.html` and React
Router takes over from there.

## How the app renders

1. Browser loads `index.html`.
2. DS CSS, Lucide icon library, and `_ds_bundle.js` load (registers `window.PolarisDesignSystem_ff4f72`).
3. `main.tsx` waits for the DS bundle via a `'load'` event, then mounts `<BrowserRouter><App /></BrowserRouter>`.
4. `App.tsx` matches the URL to a route and renders the appropriate page.
5. **Homepage (`/`)**: the `HomeContent` component renders `Nav → Hero → … → Contact → Footer`. An `IntersectionObserver` reveals `.reveal` elements on scroll; a hash-scroll `useEffect` handles `/#contact` links coming from subpages.
6. **Subpages**: `SubpageLayout` renders a compact `sp-nav` (logo + back link), a `<main>` slot, and a minimal footer. A `ContactModal` (portalled to `document.body`) is available to any CTA button on the page via `ContactModalContext`.

## How the contact form works

The form exists in two places — same component, different wrapper:

- **Homepage** (`/`): `Contact.tsx` section renders `<ContactForm>` inline. On success it swaps to a success card and hides the form.
- **Subpages**: every subpage has a "Connect with a specialist" CTA button that calls `openModal()` from `ContactModalContext`. This opens `ContactModal`, which renders `<ContactForm>` in a fixed overlay.

Both paths `POST` to `/api/contact.ts` (a Vercel Function) which:
1. Validates the body with the shared Zod schema
2. Checks the honeypot field, origin allowlist, and a time-gate
3. Sends an email via Resend
4. Fans out to a Discord webhook via `Promise.allSettled`

See [ADR-0007](adr/0007-contact-form-spam-protection.md) and [ADR-0008](adr/0008-contact-form-implementation-plan.md).

## Where to make common changes

| Change | File |
|--------|------|
| Hero copy | `src/sections/Hero.tsx` |
| Services list (homepage grid) | `src/sections/ServicesFull.tsx` |
| Service page content | `src/data/services.ts` |
| Company page content | `src/pages/company/<PageName>.tsx` |
| Footer links | `src/sections/Footer.tsx` |
| Subpage nav / footer / modal | `src/components/SubpageLayout.tsx` |
| Contact form fields | `src/components/ContactForm.tsx` |
| Subpage styles | `src/styles/subpage.css` |
| Homepage styles | `src/styles/site.css` |
| Design tokens (font, gold, etc.) | `public/_ds/.../tokens/*.css` |
| Add a new route | `src/App.tsx` + new file in `src/pages/` |

## Path to backend

`/api/contact.ts` is live. Future additions follow the same pattern — add a
file under `/api/`, Vercel auto-deploys it as a serverless function.

```
/api/contact.ts      ← live: contact form handler
/api/checkout.ts     ← future: Stripe checkout session
```

## Tradeoffs we accepted

- **`_ds_bundle.js` is a global script, not an ES module.** We bridge it via
  `src/ds.tsx`. The `window.React` exposure in `main.tsx` is intentional —
  removing it silently breaks all DS components.
- **The Tweaks panel was removed.** Live-tuning values (density, accent, etc.)
  are now constants at the top of `App.tsx`. Restore from git history and gate
  behind `import.meta.env.DEV` if needed.
- **`privacy.html` stays static.** It's a standalone legal document with no
  shared UI needs. React would add nothing.
- **No SSR.** Document titles are set via `document.title` in a `useEffect`
  per page. This means crawlers see the default title on first load. Good
  enough for now; revisit if SEO becomes a priority. See [ADR-0009](adr/0009-react-router-subpages.md).

## Risks / things to know

- The DS bundle expects `React` as a global. `src/main.tsx` puts it on
  `window` before mounting. Do not remove that line.
- Vercel's SPA rewrite (`/((?!api/).*) → /index.html`) must stay in place or
  direct URL access to any subpage will 404 in production.
- The contact form needs env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `DISCORD_WEBHOOK_URL`) to send email in production. Without them the API
  returns 500. See the `.env.example` and `docs/runbooks/contact-form.md`.
