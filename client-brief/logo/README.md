# Polaris — Logo assets

Master format is **SVG** (vector, infinitely scalable, recolourable). PNGs are convenience exports; the favicon is for browser tabs. The wordmark is **outlined to paths**, so the files render identically everywhere even without Space Grotesk installed.

## Files

| File | Use |
|---|---|
| `polaris-horizontal-dark.svg` | Primary lockup on dark backgrounds (white wordmark, gold star + dot) |
| `polaris-horizontal-light.svg` | Primary lockup on light backgrounds (obsidian wordmark, gold star + dot) |
| `polaris-stacked-dark.svg` | Stacked lockup for square / centred spaces (social avatars, splash) |
| `polaris-mark-gold.svg` | The star mark alone — app icon, favicon source, accents |
| `polaris-mark-white.svg` | Mark in mono white for busy or single-colour contexts |
| `favicon.ico` | Browser favicon (16 / 32 / 48 / 64 px) |
| `png/` | Raster exports (mark 512/1024, lockups 1200w, favicon 16/32) — use only where SVG isn't supported |

## Usage rules

- **Clear space:** keep empty space equal to the star's height on all sides. Nothing intrudes.
- **Minimum size:** mark ≥ 20px; horizontal lockup ≥ 120px wide. Below that, use the mark alone.
- **Colour:** star and the wordmark period are always Star Gold `#C6A15B`. Wordmark is White `#FFFFFF` on dark, Obsidian `#0B0B12` on light. Text/icons never sit on gold in white.
- **Don't:** recolour the star outside the brand golds, stretch or rotate the logo, add effects (shadows/glows), or place the dark lockup on a busy or low-contrast background — switch to the mono-white mark instead.

## Regenerating / editing

The wordmark is set in **Space Grotesk Medium (500)**, outlined. To change the wordmark, re-set the text in Space Grotesk, convert to outlines in a vector editor (or re-run the build), and keep the gold period. The star geometry is a simple 4-point path and can be edited directly in any SVG editor.
