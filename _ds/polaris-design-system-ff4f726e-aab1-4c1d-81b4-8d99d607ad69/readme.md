# Polaris Design System

**Your fixed point in a shifting landscape.**

Polaris is an independent IT consultancy that guides growing, mid-market
businesses through digital transformation — AI, Big Data, Cloud, SAP,
Microsoft, Oracle, IBM, Enterprise Architecture, and Software Development.
The brand is **the honest underdog**: small, senior, and conflict-free,
recommending what's right for *you*, not what's profitable for a vendor.
Archetype: **the Trusted Guide with a challenger edge.** Voice: **Clear ·
Honest · Confident**, and always *guiding*.

The visual world is **a gold star on a night sky**, made literal: a
near-black obsidian canvas, white for content, and Star Gold as a rare 5%
spotlight. Minimalist, high-contrast, premium, with generous negative space
and calm, expensive motion.

## Sources
This system was built from the brand concept and logo kit supplied by the
client (no codebase or Figma was provided):
- `uploads/Polaris-Brand-Concept.md` — the full brand concept v1.0 (mission,
  positioning, voice, palette, type, logo, website blueprint, build tokens).
- Logo kit in `uploads/` → copied to `assets/`: horizontal (dark/light),
  stacked, gold mark, white mark, favicons.

> The brand's design tokens (colours, type, shape) were locked in the concept
> doc; this system implements them faithfully and extends them with semantic
> aliases, a spacing/effects system, and reusable components.

---

## Content fundamentals (how Polaris writes)

**Three words: Clear · Honest · Confident — always guiding.**

- **Person.** Speak to the reader as **"you"**; the firm is **"we"**. The
  buyer is the hero; Polaris is the guide. *"We recommend what works best for
  you — not what's best for a vendor."*
- **Lead with the recommendation, then the reasoning.** Guides give
  direction, not just diagnosis.
- **Plain-spoken and short.** Say the true thing simply; if a sentence can
  lose words and keep its meaning, cut them. Minimal jargon — explain, don't
  impress.
- **Confident, never arrogant.** "We've seen this before" energy; no shouting,
  no hype, no buzzwords.
- **A challenger spark** is welcome when contrasting with the giants ("the
  small fish that takes on the giants") — never snide.
- **Casing.** Sentence case for headlines and body. Eyebrows / section labels
  are UPPERCASE with wide tracking. The wordmark is **"Polaris."** with a
  gold period.
- **No emoji.** Not part of the brand. No exclamation-heavy copy.
- **Punctuation flourish.** The brand period (the gold dot in "Polaris.") can
  end a hero line for a confident full-stop feel.

**Signature lines & CTAs.** *"AI is moving fast. We're the fixed point you
steer by." · "Independent expertise. Real solutions. No agenda."* CTAs:
**Find your north · Connect with a specialist · Get unbiased guidance.**

**Sample headline → subhead → CTA**
> **Your fixed point in a shifting landscape.**
> AI is moving fast. We're the senior, independent experts who cut hype from
> substance — and recommend what's right for you.
> → *Find your north*

---

## Visual foundations

**Colour.** One rule governs everything: **≈70% obsidian / 25% white-grey /
5% gold.** Near-black canvas (`--color-obsidian #0B0B12`), soft-white body
text (`--color-snow #F4F4F7`), pure white for headlines, and **Star Gold
`#C6A15B`** as the rare accent — the mark, one primary button, maybe one
highlight per view. If a page looks gold, pull it back. The neutrals carry a
faint **blue-violet undertone** so the dark reads as *night sky*, not muddy
black. Text on a gold fill is **always obsidian**, never white. Functional
colours (success/warning/error/info) are muted to sit inside the dark theme
and used sparingly; warning sits near gold, so always pair it with an icon.

**Type.** **Hanken Grotesk** (display / headlines / wordmark) + **Inter**
(body / UI). Character on top, legibility underneath. Hanken is a humanist
grotesque with rounded terminals and open curves — warmth and recall on top,
not a robotic geometric edge. Headlines run **large, light (300–400), and
lightly tracked** for an airy, premium feel; body is
Inter 400 at 1.6 line-height. Two weights do most of the work (400 / 500).
Eyebrows are 11px Hanken Grotesk, uppercase, ~0.22em tracking, in gold. Never
crowd the type — negative space is part of the identity.

**Spacing & layout.** 8px base rhythm; sections breathe with large vertical
padding (`--section-py` clamps to 10rem). Content column max 1200px; readable
prose ~68ch. Generous negative space throughout. The website is **one
continuous scroll** that tells the whole story in a single flow.

**Backgrounds.** Flat obsidian/ink fills, alternating `--color-ink` for
section bands. Atmosphere is a **faint CSS starfield** and a single soft
**gold radial glow** behind the hero star — no busy gradients, no textures,
no patterns. The rare hero image gets an **elegant circular / curved crop**.
Imagery is cool-toned, high-contrast, lots of black: night skies, stars,
abstract light, clean device shots — **never** vendor logos, badges, or
stocky office clichés.

**Elevation & depth.** Depth is *quiet*. Cards are a `--color-surface` fill +
a 1px hairline border (`--color-hairline`) + a crisp inset top-highlight, with
soft near-black shadows only when raised. The one expressive effect is a
**gold glow** (`--glow-gold-md`), reserved for the hero star and key focus.

**Corners.** 6–8px on controls, 12–16px on cards/panels, 24px on modals,
full pills for tags and switches.

**Borders.** Hairlines everywhere — `--color-hairline #262631` for dividers
and card edges, warming to gold on hover/focus for interactive elements.

**Motion.** Calm and expensive. Default easing `cubic-bezier(.22,1,.36,1)`.
Fast 140ms for taps/hovers, 240ms for transitions, 700ms for scroll-reveal
fades (gentle opacity + 18px rise). The hero star twinkles slowly; the scroll
chevron bobs. Nothing flashy; everything honours `prefers-reduced-motion`.

**Hover / press states.**
- *Primary (gold):* hover → Gold Light + soft gold glow; press → Gold Deep +
  1px nudge down.
- *Secondary (outline):* hover → border warms to gold + faint gold wash;
  press → 1px nudge.
- *Ghost:* hover → white text on a 4% white wash.
- *Cards (interactive):* hover → gold border + 2px lift + medium shadow.
- *Inputs:* focus → gold border + 3px gold-tint ring.

**Transparency & blur.** Used sparingly: the nav frosts (blur 16px over a 72%
ink) once you scroll; the modal scrim is a 72% ink with an 8px blur. Gold
tints (`--color-gold-a08/16/32`) provide soft fills and focus rings.

**Focus.** Keyboard focus is a 2px Gold Light ring with a 2px obsidian offset
— visible, on-brand, accessible.

---

## Iconography

- **System:** the brand calls for **thin-line, minimal icons in white or
  gold.** No bespoke icon set was supplied, so the kits use **Lucide**
  (1.5px stroke) from CDN as the closest match to that direction —
  *flagged as a substitution.* If Polaris adopts an official icon set, drop
  the SVGs into `assets/icons/` and swap the `Icon` wrapper.
- **Style rules:** thin stroke (1.5), rounded joins, monochrome — rendered in
  `--color-slate` by default, `--color-white` on emphasis, `--color-gold` for
  the rare accent (feature tiles, list checks). Icons never carry their own
  colour fills.
- **The star mark** is the one "icon" that is always gold — it is the logo,
  the favicon, and the recurring brand motif (hero, orbit, clear-space).
- **No emoji. No unicode glyph icons.** The only decorative glyph used is the
  four-point star "✦" in specimen cards, echoing the mark.

See `guidelines/brand-imagery.card.html` and the Lucide usage in
`ui_kits/website/icons.jsx`.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `readme.md` — this guide. · `SKILL.md` — Agent-Skills-compatible wrapper.

**`tokens/`** (all reached from `styles.css`)
- `fonts.css` — Hanken Grotesk + Inter (Google Fonts import).
- `colors.css` · `typography.css` · `spacing.css` · `effects.css` — CSS
  custom properties: base values + semantic aliases.
- `base.css` — minimal element defaults (canvas, body text, focus, selection).

**`assets/`** — logos (horizontal dark/light, stacked, gold mark, white
mark) and favicons.

**`guidelines/`** — 18 foundation specimen cards (Design System tab):
Colors (5), Type (5), Spacing/effects (4), Brand (4).

**`components/`** — 16 React primitives (namespace
`window.PolarisDesignSystem_ff4f72`):
- `buttons/` — **Button**, **IconButton**
- `card/` — **Card**
- `badge/` — **Badge**, **Tag**
- `avatar/` — **Avatar**, **AvatarGroup**
- `input/` — **Input**, **Textarea**
- `select/` — **Select**
- `toggles/` — **Checkbox**, **Radio**, **Switch**
- `tabs/` — **Tabs**
- `dialog/` — **Dialog**
- `tooltip/` — **Tooltip**

Each directory has `<Name>.jsx`, `<Name>.d.ts`, a `.prompt.md`, and a
`@dsCard` showcase HTML.

**`ui_kits/website/`** — the marketing site recreation (single-scroll
narrative). See its `README.md`.

**Starting points** (for consuming projects): Button, Card, Input, and the
marketing-site screen.
