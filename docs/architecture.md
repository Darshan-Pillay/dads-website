# Architecture

One-pager describing how this site is put together and where it can grow.

## What this is

A marketing site for **Softfinity Consulting**. Single homepage (`index.html`) plus
static HTML subpages (`/pages/*`, `/services/*`). The homepage is interactive
(scroll-reveal animations, a contact form); the subpages are plain HTML.

## Stack

| Layer       | Choice                          | Why                                                                |
|-------------|---------------------------------|--------------------------------------------------------------------|
| Language    | JavaScript (JSX)                | Lower learning curve than TypeScript. See [ADR-0002](adr/0002-defer-typescript.md). |
| UI          | React 18                        | Reusable components, large ecosystem.                              |
| Build       | Vite 5                          | Fast dev server, simple `npm run build`. See [ADR-0001](adr/0001-frontend-vite-react.md). |
| Styling     | CSS files + design system tokens | Design system already exists under `public/_ds/`. No CSS-in-JS yet. |
| Hosting     | Vercel                          | Auto-detects Vite, deploys on push.                                |
| Future API  | Vercel Functions in `/api/`     | For DB/payments when needed. See [ADR-0003](adr/0003-future-backend-vercel-functions.md). |

## Directory layout

```
.
├── index.html             ← Vite entry, references /src/main.jsx
├── package.json           ← npm deps and scripts (dev / build / preview)
├── vite.config.js         ← build configuration
├── src/                   ← all React source
│   ├── main.jsx           ← mounts <App /> into #root
│   ├── App.jsx            ← layout shell, scroll-reveal, hash-scroll fix
│   ├── ds.jsx             ← bridge to the design system globals
│   ├── icons.jsx          ← <Icon> wrapper around Lucide
│   ├── sections/          ← one file per page section (Hero, Nav, Contact, …)
│   └── styles/site.css    ← page-level styles
├── public/                ← copied to the deploy root, untouched
│   ├── _ds/               ← Polaris design system bundle (CSS + JS)
│   ├── assets/            ← images, logos, favicon
│   ├── pages/             ← static HTML subpages (about, approach, …)
│   └── services/          ← static HTML service pages (SAP, Microsoft, …)
├── docs/                  ← you are here
│   ├── architecture.md
│   └── adr/               ← architecture decision records
└── client-brief/          ← brand + brief from dad (not shipped)
```

## How it runs

**Development**

```
npm install   # one-time
npm run dev   # starts Vite at http://localhost:5173
```

Vite serves source files directly with hot-reload — edit a `.jsx` file and the
browser updates without a full reload.

**Production build**

```
npm run build      # outputs static files to ./dist
npm run preview    # serves ./dist locally to spot-check before deploy
```

**Deployment**

Pushing to `main` triggers a Vercel build automatically. Vercel detects the
`package.json`, runs `npm run build`, and serves `./dist`.

## How the homepage renders

1. Browser loads `index.html`.
2. `index.html` loads the design system CSS, the Lucide icon library, and
   `_ds_bundle.js` (which registers `window.PolarisDesignSystem_ff4f72`).
3. Vite's bundled JS executes `/src/main.jsx`, which mounts `<App />`.
4. `App.jsx` renders the section components in order: `Nav` → `Hero` → … → `Footer`.
5. An `IntersectionObserver` reveals `.reveal` elements as they scroll into view.
6. If the URL has a `#anchor` (e.g. `index.html#contact` from a subpage), `App` re-scrolls
   to it after mount — fixes the prior issue where "Connect with a specialist"
   links from subpages landed at the top of the page.

## Where to make common changes

| Change                          | File                                                     |
|---------------------------------|----------------------------------------------------------|
| Hero copy                       | `src/sections/Hero.jsx`                                  |
| Services list                   | `src/sections/ServicesFull.jsx`                          |
| Industries list                 | `src/sections/Industries.jsx`                            |
| Footer links                    | `src/sections/Footer.jsx`                                |
| Section colours / spacing       | `src/styles/site.css`                                    |
| Design tokens (font, gold, etc.)| `public/_ds/.../tokens/*.css`                            |
| Subpage content                 | `public/pages/<name>.html` / `public/services/<name>.html` |

## Path to backend (DB, payments)

Today the contact form does nothing (it pops a "We've got it" dialog). When we
need server-side work, add files under `/api/`:

```
/api/contact.js      ← POST handler for the contact form
/api/checkout.js     ← Stripe checkout session (future)
```

Vercel auto-deploys files in `/api/` as serverless functions. The client calls
them with `fetch('/api/contact', ...)`. Database access lives inside these
functions. See [ADR-0003](adr/0003-future-backend-vercel-functions.md) for the
full picture.

## Tradeoffs we accepted

- **`_ds_bundle.js` is a global script, not an ES module.** The design system
  was built before this project. We bridge it via `src/ds.jsx` so components
  don't touch `window` directly. If the DS is ever rebuilt, swap the bridge.
- **The Tweaks panel was removed.** It was a developer-facing live-tuning tool
  in the demo (heroStar treatment, density, accent colour, etc.). The values
  it tuned are now constants at the top of `src/App.jsx`. If you want to bring
  it back as a dev-only tool, restore `polaris/tweaks-panel.jsx` from git history
  and gate it behind `import.meta.env.DEV`.
- **Subpages stay as hand-written HTML.** They're simple, link to each other
  with relative paths, and don't need React. Promoting them into the Vite app
  later (e.g. with a multi-page setup) is straightforward but unnecessary today.

## Risks / things to know

- The DS bundle expects `React` as a global. `src/main.jsx` puts it on `window`
  before mounting. If you ever delete that line, the DS components silently
  break.
- The contact form has no backend yet — submission is a no-op. Don't tell
  prospects it works.
- Lucide icons are loaded from CDN. Offline dev still works for everything
  except icons.
