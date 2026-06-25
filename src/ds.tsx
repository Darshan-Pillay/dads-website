// Bridge to the Polaris design system bundle.
//
// The DS lives in public/_ds/ and is loaded synchronously via a plain
// <script> tag in index.html, so by the time Vite's React entry runs,
// window.PolarisDesignSystem_ff4f72 is already populated. Components
// import from here instead of touching `window` directly.
//
// The DS itself is untyped (it predates this project), so each wrapper
// accepts a permissive props bag.

import type { FC } from 'react';

type AnyProps = Record<string, unknown>;
const ds = () => window.PolarisDesignSystem_ff4f72;

export const Button = (props: AnyProps) => { const C = ds().Button as unknown as FC<AnyProps>; return <C {...props} />; };
export const Card   = (props: AnyProps) => { const C = ds().Card   as unknown as FC<AnyProps>; return <C {...props} />; };
export const Tag    = (props: AnyProps) => { const C = ds().Tag    as unknown as FC<AnyProps>; return <C {...props} />; };
export const Input    = (props: AnyProps) => { const C = ds().Input    as unknown as FC<AnyProps>; return <C {...props} />; };
export const Textarea = (props: AnyProps) => { const C = ds().Textarea as unknown as FC<AnyProps>; return <C {...props} />; };
export const Select   = (props: AnyProps) => { const C = ds().Select   as unknown as FC<AnyProps>; return <C {...props} />; };
export const Dialog   = (props: AnyProps) => { const C = ds().Dialog   as unknown as FC<AnyProps>; return <C {...props} />; };
