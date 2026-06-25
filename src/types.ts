// Layout/visual settings consumed by the section components.
// Defaults live in src/App.tsx.

export type Tweaks = {
  heroStar: 'glow' | 'orbit' | 'constellation';
  glow: number;
  starfield: number;
  whatWeDo: 'grid' | 'index' | 'tags';
  ledger: 'two-col' | 'three-way' | 'stacked';
  bands: 'alternate' | 'minimal' | 'off';
  density: 'airy' | 'regular' | 'tight';
  headingScale: number;
  accent: [string, string, string];
  showProof: boolean;
};
