# Migration Plan: Static Subpages → React Router

## Why

The site currently has two parallel codebases for the same UI: a React SPA for
the homepage and ~18 static HTML files for every subpage. Any change to shared
elements (nav, footer, contact form, CSS tokens) must be made in both places.
The contact form is duplicated in `Contact.tsx` (React) and `contact-modal.js`
(vanilla JS), with copy and behaviour that can drift.

React Router collapses this into a single codebase: one nav, one footer, one
contact form component, smooth client-side navigation, and no more full-page
reloads between pages.

---

## Current structure

```
public/
  services/         9 static HTML service pages (sap, microsoft, oracle, …)
  pages/            9 static HTML company pages (about, approach, principles, …)
  contact-modal.js  Vanilla JS modal — duplicate of Contact.tsx
  _ds/              Design system bundle (unchanged)
src/
  sections/         Homepage React sections
  styles/site.css   Homepage styles
```

## Target structure

```
src/
  pages/
    services/       SapPage, MicrosoftPage, OraclePage, … (9 components)
    about/          AboutPage, ApproachPage, PrinciplesPage, … (9 components)
  components/
    SubpageLayout   Shared wrapper: sp-nav + footer for all subpages
    ContactForm     Single form component (replaces Contact.tsx inline + modal)
    ContactModal    Thin wrapper that renders ContactForm inside a dialog
  styles/
    site.css        Homepage styles (unchanged)
    subpage.css     Merged service-page.css + page.css (currently in public/)
```

---

## Phases

### Phase 1 — Router scaffold (no visible change)

**Goal:** get React Router wired up without touching any existing pages.

1. Install: `npm install react-router-dom`
2. Wrap `<App />` in `<BrowserRouter>` in `main.tsx`
3. In `App.tsx`, wrap existing homepage content in `<Route path="/" />` inside
   a `<Routes>` block — homepage behaviour is identical, nothing breaks
4. Add a catch-all `<Route path="*" element={<NotFound />} />` with a minimal
   404 page
5. Update `vercel.json` to rewrite all paths to `index.html` so the dev server
   and Vercel both support deep-linking:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```

**Test:** homepage still works. `/anything-else` shows 404.

---

### Phase 2 — Shared subpage layout

**Goal:** one `<SubpageLayout>` component that replaces the `sp-nav` + footer
in every static HTML file.

1. Move `public/services/service-page.css` and `public/pages/page.css` into
   `src/styles/subpage.css` (merge the two files — they share most rules)
2. Import `subpage.css` in `main.tsx`
3. Create `src/components/SubpageLayout.tsx`:
   - Renders the `sp-nav` (logo + back link)
   - Renders a `<main>` slot via `children`
   - Renders the minimal subpage footer (`© 2026 …`)
   - The back link is configurable (default: "← Back to home")
4. Create a test route `/test-layout` that renders `<SubpageLayout>` with a
   dummy `<h1>` — verify it looks identical to the static version

**Test:** `/test-layout` matches the visual output of any current static page.

---

### Phase 3 — Shared contact form

**Goal:** one `<ContactForm>` component used everywhere, replacing both
`Contact.tsx` and `contact-modal.js`.

1. Extract the form fields from `Contact.tsx` into
   `src/components/ContactForm.tsx` — same fields, same validation, same API
   call, same success/error states
2. Update `src/sections/Contact.tsx` to render `<ContactForm />` inline (no
   behaviour change on homepage)
3. Create `src/components/ContactModal.tsx` — a `<dialog>`-based modal that
   renders `<ContactForm />` inside it, opened by a `useContactModal()` hook
   or a simple open/close prop
4. Export `useContactModal` so any subpage CTA button can open the modal
5. Delete `public/contact-modal.js`

**Test:** homepage form submits correctly. Open modal on a test route — form
submits correctly. Both show identical fields, copy, and button text.

---

### Phase 4 — Service pages (9 pages)

**Goal:** port all 9 service HTML pages to React components.

Each service page follows an identical structure:
- Hero (tag, title, lead, image)
- Areas of expertise (tag grid)
- Outcomes (3-col cards)
- Approach (numbered list)
- CTA section

**Approach:** create one `<ServicePage>` template component that accepts a data
object. All 9 pages are data, not separate components.

1. Define a `ServicePageData` type in `src/types.ts`
2. Create `src/data/services.ts` with all 9 service data objects (porting
   content from HTML)
3. Create `src/pages/services/ServicePage.tsx` — the template
4. Add routes in `App.tsx`:
   ```tsx
   <Route path="/services/:slug" element={<ServicePageRoute />} />
   ```
   where `ServicePageRoute` looks up the slug in `services.ts` and renders
   `<ServicePage data={...} />`
5. Update `Footer.tsx` links from `href="services/sap.html"` to
   `href="/services/sap"` (use React Router `<Link>` component)

**Pages to port:**
- `/services/sap`
- `/services/microsoft`
- `/services/oracle`
- `/services/ibm`
- `/services/ai`
- `/services/cloud`
- `/services/data`
- `/services/blockchain`
- `/services/mobile`

**Test:** each route renders and matches the static HTML visually.

---

### Phase 5 — Company pages (9 pages)

**Goal:** port all company/detail pages. Unlike service pages, these have more
varied structures — prose sections, profile grids, case study cards, etc.

Each page gets its own component under `src/pages/company/`:

| Route | Component | Source file |
|---|---|---|
| `/about` | `AboutPage.tsx` | `pages/about.html` |
| `/approach` | `ApproachPage.tsx` | `pages/approach.html` |
| `/principles` | `PrinciplesPage.tsx` | `pages/principles.html` |
| `/industries` | `IndustriesPage.tsx` | `pages/industries.html` |
| `/consultants` | `ConsultantsPage.tsx` | `pages/consultants.html` |
| `/case-studies` | `CaseStudiesPage.tsx` | `pages/case-studies.html` |
| `/contact` | `ContactPage.tsx` | `pages/contact.html` |
| `/stack-audit` | `StackAuditPage.tsx` | `pages/stack-audit.html` |
| `/the-conflict` | `TheConflictPage.tsx` | `pages/the-conflict.html` |

Add all routes to `App.tsx`.

Update `Footer.tsx` Company column links to React Router paths.

**Test:** each route renders and matches its static counterpart.

---

### Phase 6 — Update internal links

**Goal:** replace all `../index.html#section` and `href="pages/x.html"` links
across the codebase with React Router paths.

1. `Footer.tsx` — already updated in phases 4 and 5
2. Subpage CTAs — replace `href="../index.html#contact"` with
   `onClick={() => openContactModal()}` using the hook from Phase 3
3. Breadcrumbs — replace `<a href="../index.html">Softfinity</a>` with
   `<Link to="/">Softfinity</Link>`
4. `Nav.tsx` on the homepage — already uses `#hash` links, no change needed
5. Search for any remaining `index.html` or `.html` references:
   ```bash
   grep -r "\.html" src/
   ```

---

### Phase 7 — Delete static files

**Goal:** remove everything that has been replaced.

```bash
rm -rf public/services/*.html
rm -rf public/pages/*.html
rm -f  public/contact-modal.js
rm -f  public/services/service-page.css   # moved to src/styles/subpage.css
rm -f  public/pages/page.css              # merged into subpage.css
```

Keep: `public/_ds/`, `public/assets/`, `public/privacy.html`

**Test:** full site navigation works entirely via React Router. No `.html` URLs
anywhere. `npm run build && npm run preview` — all routes accessible directly
by URL (Vercel rewrite handles this).

---

### Phase 8 — SEO + meta tags

**Goal:** each page has its own `<title>` and `<meta description>`.

Currently the HTML files each have a `<title>` in their `<head>`. React renders
into a single `index.html` so we need to manage this in JS.

1. Install `react-helmet-async` (or use the native `document.title` pattern for
   now — simpler, no extra dependency)
2. Each page component sets `document.title` in a `useEffect`:
   ```tsx
   useEffect(() => {
     document.title = 'SAP Consulting Services — Softfinity Consulting';
   }, []);
   ```
3. For production SEO, note that this requires pre-rendering or SSR to work for
   crawlers — a future consideration.

---

## What stays the same

- Homepage (`/`) — no changes to any existing section components
- Design system (`public/_ds/`) — untouched
- Fonts, favicon, DS CSS loading in `index.html` — untouched
- `vercel.json` build config — only the rewrite rule is added
- API routes in `/api/` — untouched
- `privacy.html` — static, stays in `public/`

---

## Estimated effort

| Phase | Work |
|---|---|
| 1 — Router scaffold | 1 hour |
| 2 — Shared layout | 2 hours |
| 3 — Shared contact form | 2–3 hours |
| 4 — Service pages (9) | 4–5 hours |
| 5 — Company pages (9) | 4–5 hours |
| 6 — Internal links | 1 hour |
| 7 — Delete static files | 30 min |
| 8 — Meta tags | 1 hour |
| **Total** | **~16 hours** |

Phases 1–3 are the foundation and should be done in order. Phases 4 and 5 are
independent of each other and can be done in parallel or spread across sessions.

---

## Risks

- **Vercel rewrite rule** must be in place before deploying — without it, direct
  URL access to `/services/sap` returns 404 from Vercel's CDN
- **CSS specificity** — `subpage.css` styles are currently scoped to `.sp-body`
  on the `<body>` tag; in React the body class won't change per-page, so styles
  may need to be scoped to a wrapper div instead
- **`privacy.html`** stays static — it links from the contact form and is fine
  as a standalone page
- **Page content** — some pages (`stack-audit`, `the-conflict`) may need content
  review before going live; porting them is mechanical but they should be
  checked
