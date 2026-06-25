# ADR 0002 — Defer TypeScript adoption

- **Status:** Accepted
- **Date:** 2026-06-25

## Context

Most modern React projects use TypeScript. It catches a class of bugs at
compile time, gives autocomplete in editors, and is the standard at most
shops.

## Decision

Stay on **plain JavaScript (.jsx)** for now.

## Why

- The owner is learning frontend. Adding type annotations adds a second
  language to learn (TS) on top of React + Vite + Vercel.
- The site is small. The bugs TypeScript catches (passing a number where a
  string was expected, etc.) are easy to spot in ~20 component files.
- Migrating later is mechanical: rename `.jsx` → `.tsx`, add a `tsconfig.json`,
  fix the errors file by file. We can do it in an afternoon when the project
  is bigger.

## Consequences

- No compile-time type checking on props.
- Editor autocomplete works on React APIs (because `react` ships its own
  types in node_modules) but not on our own components.
- Refactors are slightly riskier — renaming a prop requires searching usages
  by hand.

## Revisit if

- We hire a contributor who expects TypeScript.
- We start using a backend API client whose types we want to share between
  client and server (see [ADR-0003](0003-future-backend-vercel-functions.md)).
- A bug ships that TypeScript would have caught.
