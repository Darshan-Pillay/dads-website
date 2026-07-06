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

export type Outcome = {
  num: string;
  title: string;
  body: string;
};

export type ServicePageData = {
  slug: string;
  tag: string;
  pageTitle: string;
  title: string;
  lead: string;
  heroImage: string;
  areasEyebrow: string;
  areas: string[];
  areasLead: string;
  outcomes: [Outcome, Outcome, Outcome];
  approachLead: string;
};
