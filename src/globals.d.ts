// Globals injected outside the module graph:
//
// - React is set on window in src/main.tsx so the Polaris design system
//   bundle (a plain <script> tag in index.html) can resolve it at render time.
// - PolarisDesignSystem_ff4f72 is the design system bundle's namespace —
//   src/ds.tsx is the only file that reads it.
// - lucide is loaded from CDN by index.html and renders icons after each
//   React commit (see App.tsx).

import type * as React from 'react';

type ComponentLike = (props: Record<string, unknown>) => unknown;

declare global {
  interface Window {
    React: typeof React;
    PolarisDesignSystem_ff4f72: {
      Button: ComponentLike;
      Card: ComponentLike;
      Tag: ComponentLike;
      Input: ComponentLike;
      Select: ComponentLike;
      Dialog: ComponentLike;
    };
    lucide?: { createIcons: (opts?: { attrs?: Record<string, string> }) => void };
  }
}

// Allow CSS custom properties (--foo) in inline style objects.
// Without this, TS rejects `style={{ '--d': '40ms' }}` everywhere.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

// Side-effect CSS imports.
declare module '*.css' {
  const content: string;
  export default content;
}

export {};
