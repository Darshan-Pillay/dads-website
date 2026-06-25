# ADR 0005 — Accessibility baseline

- **Status:** Accepted
- **Date:** 2026-06-25

## Context

A first-pass accessibility check during the site build raised one concrete
WCAG failure and a couple of UX-quality issues. This ADR records what was
found, what was fixed, and which items are deliberately deferred.

## Audit results

### Colour contrast (WCAG 2.1)

Background: obsidian `#0B0B12`.

| Foreground         | Ratio   | AA (4.5) | AAA (7) |
|--------------------|---------|----------|---------|
| Snow `#F4F4F7`     | 17.4:1  | ✓        | ✓       |
| Slate `#9B9BA8`    | 7.3:1   | ✓        | ✓       |
| **Mist (old) `#6E6E7B`** | **4.0:1** | **✗** | ✗ |
| Mist (new) `#87879A` | ~5.5:1 | ✓        | —       |
| Gold `#C6A15B`     | 7.5:1   | ✓        | ✓       |
| Gold-light `#DCBD82` | 10.3:1 | ✓        | ✓       |

On-gold text inside the primary button:

| Foreground / state                 | Ratio | Pass |
|------------------------------------|-------|------|
| Obsidian on Gold (rest)            | 7.5:1 | AAA  |
| Obsidian on Gold-light (hover)     | 10.5:1| AAA  |

### Other checks

- Focus indicators: present on all interactive elements (DS `:focus-visible`
  ring).
- Alt text: present on logo lockups; decorative imagery uses `alt=""` or
  `aria-hidden`.
- Reduced motion: respected (`prefers-reduced-motion` disables the reveal
  and looping animations).
- Keyboard navigation: tab order follows the visual order. Previously, no
  skip-to-content link.

## Decisions

### 1. Lift `--color-mist` from `#6E6E7B` to `#87879A`

The original token comment said "large text only", but in practice the site
uses it for small text in the footer, captions, and the modal note —
contexts where WCAG AA (4.5:1) applies. We chose to bump the token rather
than audit every usage because:

- One change vs ~12 selective replacements.
- Preserves the intended visual hierarchy (still lower-emphasis than slate).
- The new value still reads as "mist" at a glance — the brand feel is preserved.

Updated in:
- `public/_ds/.../tokens/colors.css`
- `public/_ds/.../_ds_manifest.json`
- `client-brief/Polaris-Brand-Concept.md` (token table + the code snippet)

### 2. Add a skip-to-content link

`index.html` now ships an `<a class="skip-link" href="#main-content">` at the
top of `<body>`. It's positioned off-screen by default and slides into view
on focus. Target `id="main-content"` is on the `<main>` element inside `<App />`.

### 3. Primary button: hover lights up instead of lightens

The design system originally lightened the gold background to cream
(`#DCBD82`) on hover. Mathematically that improves text contrast
(7.5 : 1 → 10.5 : 1), but in real use the lighter background reduced the
*perceived* weight of the obsidian text — the button read as faded rather
than activated.

Overrode `.pl-site .pl-btn--primary:hover` in `src/styles/site.css` to:

- Keep the rest-state gold background (text contrast stays solid 7.5 : 1).
- Express hover via a 1px gold-light ring + a brighter gold halo + a 1px lift.

This matches the "Star Gold — the 5% spotlight" brand language better
anyway: the button *lights up* rather than *fades up*.

### 4. Override `::selection` on gold surfaces

The design system's global `::selection` rule sets `background: gold-a32;
color: white`. On a gold button, that resolves to white text on a
still-gold background — ~2:1 contrast, the selected text is effectively
invisible.

Override on `.pl-site .pl-btn--primary::selection` to use an obsidian
wash with gold-light text. Selection is clearly visible AND the text
stays readable (~17:1). Anything else inheriting the global `::selection`
on dark surfaces is fine (white-on-gold-a32-over-obsidian ≈ 10:1).

### 4. Subpages still need a skip-link

The 19 static subpages (`public/pages/*.html`, `public/services/*.html`)
do not yet have skip-to-content links. Adding them is mechanical (one
`<a>` + one CSS class). Tracked as follow-up rather than blocking this
ADR, because the homepage is by far the most-trafficked entry point.

## Deferred (with reason)

- **Light mode.** The brand is dark-first by design. Adding a light theme is
  not a token-flip; it requires brand decisions about how gold reads on a
  light surface. Tracked as future work.
- **Full automated audit (axe, Lighthouse).** Worth wiring in CI once the
  Vercel preview deploy is live. Not done in this pass.
