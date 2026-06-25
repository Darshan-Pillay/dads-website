import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { Button, Dialog } from './ds.tsx';
import Nav from './sections/Nav.tsx';
import Hero from './sections/Hero.tsx';
import FeatureBand from './sections/FeatureBand.tsx';
import Shift from './sections/Shift.tsx';
import WhoWeAre from './sections/WhoWeAre.tsx';
import Vision from './sections/Vision.tsx';
import Approach from './sections/Approach.tsx';
import ServicesFull from './sections/ServicesFull.tsx';
import Industries from './sections/Industries.tsx';
import Principles from './sections/Principles.tsx';
import SoftwareFactory from './sections/SoftwareFactory.tsx';
import WhyIndependent from './sections/WhyIndependent.tsx';
import HowWeWork from './sections/HowWeWork.tsx';
import Proof from './sections/Proof.tsx';
import Closing from './sections/Closing.tsx';
import Contact from './sections/Contact.tsx';
import Footer from './sections/Footer.tsx';
import type { Tweaks } from './types.ts';

// Layout/visual settings, formerly driven by the in-page Tweaks panel.
// See docs/architecture.md for why the panel was removed from production.
const TWEAKS: Tweaks = {
  heroStar: 'glow',
  glow: 16,
  starfield: 55,
  whatWeDo: 'grid',
  ledger: 'two-col',
  bands: 'alternate',
  density: 'airy',
  headingScale: 100,
  accent: ['#C6A15B', '#DCBD82', '#9C7C3E'],
  showProof: true,
};

const DENSITY_PY: Record<Tweaks['density'], string> = {
  airy: 'clamp(5rem, 11vw, 11rem)',
  regular: 'clamp(4rem, 9vw, 8rem)',
  tight: 'clamp(3rem, 6vw, 5.5rem)',
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(x, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function App() {
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Scroll-reveal observer.
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;
    scope.classList.add('reveal-on');
    const els = scope.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Re-apply the URL hash after first paint so CTAs from subpages
  // (../index.html#contact) land on the right section.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, []);

  const onNav = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
  };

  const [a, aLight, aDeep] = TWEAKS.accent;
  const [r, g, b] = hexToRgb(a);
  const rgb = `${r}, ${g}, ${b}`;
  const styleVars: CSSProperties = {
    ['--hero-glow' as string]: TWEAKS.glow / 100,
    ['--field-opacity' as string]: TWEAKS.starfield / 100,
    ['--heading-scale' as string]: TWEAKS.headingScale / 100,
    ['--section-py' as string]: DENSITY_PY[TWEAKS.density],
    ['--color-gold' as string]: a,
    ['--color-gold-light' as string]: aLight,
    ['--color-gold-deep' as string]: aDeep,
    ['--color-gold-a08' as string]: `rgba(${rgb}, 0.08)`,
    ['--color-gold-a16' as string]: `rgba(${rgb}, 0.16)`,
    ['--color-gold-a32' as string]: `rgba(${rgb}, 0.32)`,
  };

  return (
    <div className={`pl-site bands-${TWEAKS.bands}`} ref={rootRef} style={styleVars}>
      <Nav onNav={onNav} />
      <main id="main-content">
        <Hero t={TWEAKS} />
        <FeatureBand />
        <Shift />
        <WhoWeAre />
        <Vision />
        <Approach />
        <ServicesFull />
        <Industries />
        <Principles />
        <SoftwareFactory />
        <WhyIndependent t={TWEAKS} />
        <HowWeWork />
        {TWEAKS.showProof && <Proof />}
        <Closing />
        <Contact onSubmit={() => setSent(true)} />
      </main>
      <Footer />

      <Dialog open={sent} onClose={() => setSent(false)}
        title="We've got it."
        description="A senior consultant will reach out within one business day — with a straight read on what you actually need. (Demo only — the form isn't wired to a backend yet.)"
        footer={<Button variant="primary" onClick={() => setSent(false)}>Close</Button>} />
    </div>
  );
}
