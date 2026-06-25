# ADR 0004 — Adopt TypeScript

- **Status:** Accepted (supersedes [ADR-0002](0002-defer-typescript.md))
- **Date:** 2026-06-25

## Context

[ADR-0002](0002-defer-typescript.md) chose to stay on plain JavaScript to keep
the learning surface small. Same day, on reflection, we reversed that.

The deciding factor: payments and a database are imminent
([ADR-0003](0003-future-backend-vercel-functions.md)). Once `/api/` handlers
exist, the most valuable thing TypeScript gives us is **shared types between
client and server** — request/response shapes, Stripe payloads, DB row
types. Adopting TS *after* the backend ships means duplicating those shapes
once in JS, then porting them. Adopting *before* means writing them once.

A second factor: the codebase is still 20 small files. Migration cost now is
half a day. Migration cost in six months, with API handlers, database
queries, and form validation logic, is several days.

## Decision

Migrate the existing `.jsx`/`.js` files to TypeScript with `strict: true`.

## What changed

- Added `typescript`, `@types/react`, `@types/react-dom` as dev dependencies.
- Added `tsconfig.json` (strict, `jsx: react-jsx`, `moduleResolution: bundler`).
- Renamed every `src/*.jsx` to `.tsx`.
- Added `src/types.ts` holding the `Tweaks` type (layout settings consumed
  by several sections).
- Added `src/globals.d.ts` declaring window globals (React, lucide, the DS
  bundle namespace) and allowing CSS custom properties (`--d`) in inline
  style objects.
- Added `npm run typecheck` (`tsc --noEmit`) and wired `tsc --noEmit` into
  `npm run build` so type errors fail CI / Vercel.

## Why these specific choices

- **`strict: true`.** Standard for new TS projects. The migration was small
  enough to absorb it in one pass.
- **`@types/react` pinned to `^18.3`** — we're on `react@18.3.1`. The v19
  types would lie about hooks that don't exist yet in our runtime.
- **DS bridge stays typed as `Record<string, unknown>`.** The Polaris design
  system bundle predates this project, has no types, and we don't own its
  source. Trying to manually type its surface area is more work than it's
  worth; we let `src/ds.tsx` swallow `any`-ish props at the bridge.
- **`noUncheckedSideEffectImports: false`.** Lets `import './styles/site.css'`
  in `main.tsx` work without a per-file shim. Vite handles the CSS bundling
  regardless; TS just needs to not complain.

## Consequences

- Editor autocomplete and rename refactors now work on our own components,
  not just on React's APIs.
- `npm run build` fails on type errors (caught at CI time, not in production).
- Build artefact sizes are unchanged (~57 KB gzipped JS) — TS is stripped
  at build time.

## Why we'd revisit

- If the build feels slow at scale, swap `tsc --noEmit` for `vue-tsc`-style
  parallelisation or run typecheck only in CI, not on every local `build`.
- If the DS bundle ever ships types, replace the `Record<string, unknown>`
  bridge in `src/ds.tsx` with real types.
