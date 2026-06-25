import { useEffect, useRef, useState } from 'react';
import { Button, Dialog } from './ds.jsx';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import FeatureBand from './sections/FeatureBand.jsx';
import Shift from './sections/Shift.jsx';
import WhoWeAre from './sections/WhoWeAre.jsx';
import Vision from './sections/Vision.jsx';
import Approach from './sections/Approach.jsx';
import ServicesFull from './sections/ServicesFull.jsx';
import Industries from './sections/Industries.jsx';
import Principles from './sections/Principles.jsx';
import SoftwareFactory from './sections/SoftwareFactory.jsx';
import WhyIndependent from './sections/WhyIndependent.jsx';
import HowWeWork from './sections/HowWeWork.jsx';
import Proof from './sections/Proof.jsx';
import Closing from './sections/Closing.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

// Layout/visual settings, formerly driven by the in-page Tweaks panel.
// See docs/architecture.md for why the panel was removed from production.
const TWEAKS = {
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

const DENSITY_PY = {
  airy: 'clamp(5rem, 11vw, 11rem)',
  regular: 'clamp(4rem, 9vw, 8rem)',
  tight: 'clamp(3rem, 6vw, 5.5rem)',
};

function hexToRgb(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(x, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function App() {
  const [sent, setSent] = useState(false);
  const rootRef = useRef(null);

  // Re-render Lucide icons after every React render.
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
  });

  // Scroll-reveal observer.
  useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;
    scope.classList.add('reveal-on');
    const els = scope.querySelectorAll('.reveal:not(.is-visible)');
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

  const onNav = (e) => {
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
  const styleVars = {
    '--hero-glow': TWEAKS.glow / 100,
    '--field-opacity': TWEAKS.starfield / 100,
    '--heading-scale': TWEAKS.headingScale / 100,
    '--section-py': DENSITY_PY[TWEAKS.density],
    '--color-gold': a,
    '--color-gold-light': aLight,
    '--color-gold-deep': aDeep,
    '--color-gold-a08': `rgba(${rgb}, 0.08)`,
    '--color-gold-a16': `rgba(${rgb}, 0.16)`,
    '--color-gold-a32': `rgba(${rgb}, 0.32)`,
  };

  return (
    <div className={`pl-site bands-${TWEAKS.bands}`} ref={rootRef} style={styleVars}>
      <Nav onNav={onNav} />
      <main>
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
