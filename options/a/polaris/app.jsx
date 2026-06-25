/* Polaris landing — App shell: tweak state, scroll-reveal, contact dialog. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroStar": "glow",
  "glow": 16,
  "starfield": 55,
  "whatWeDo": "grid",
  "ledger": "two-col",
  "bands": "alternate",
  "density": "airy",
  "headingScale": 100,
  "accent": ["#C6A15B", "#DCBD82", "#9C7C3E"],
  "showProof": true
}/*EDITMODE-END*/;

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

function App() {
  const {
    useTweaks, TweaksPanel, TweakSection, TweakSlider,
    TweakRadio, TweakToggle, TweakColor, TweakButton,
  } = window;
  const { Dialog, Button } = window.PolarisDesignSystem_ff4f72;
  const { Nav, Hero, Shift, WhoWeAre, WhatWeDo, WhyIndependent, HowWeWork, Proof, Contact, Footer } = window;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [sent, setSent] = React.useState(false);
  const rootRef = React.useRef(null);

  // Re-render Lucide icons after every React render.
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
  });

  // Scroll-reveal (opt-in via .reveal-on so no-JS shows everything).
  React.useEffect(() => {
    const scope = rootRef.current;
    if (!scope) return;
    scope.classList.add('reveal-on');
    const observe = () => {
      const els = scope.querySelectorAll('.reveal:not(.is-visible)');
      if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('is-visible'));
        return null;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
      els.forEach((el) => io.observe(el));
      return io;
    };
    const io = observe();
    return () => io && io.disconnect();
  }, [t.whatWeDo, t.ledger, t.showProof]); // re-scan when layout swaps add/remove nodes

  // Tweak-driven custom properties on the wrapper.
  const [a, aLight, aDeep] = t.accent;
  const [r, g, b] = hexToRgb(a);
  const rgb = `${r}, ${g}, ${b}`;
  const styleVars = {
    '--hero-glow': t.glow / 100,
    '--field-opacity': t.starfield / 100,
    '--heading-scale': t.headingScale / 100,
    '--section-py': DENSITY_PY[t.density],
    '--color-gold': a,
    '--color-gold-light': aLight,
    '--color-gold-deep': aDeep,
    '--color-gold-a08': `rgba(${rgb}, 0.08)`,
    '--color-gold-a16': `rgba(${rgb}, 0.16)`,
    '--color-gold-a32': `rgba(${rgb}, 0.32)`,
  };

  return (
    <div className={`pl-site bands-${t.bands}`} ref={rootRef} style={styleVars}>
      <Nav />
      <main>
        <Hero t={t} />
        <Shift />
        <WhoWeAre />
        <WhatWeDo t={t} />
        <WhyIndependent t={t} />
        <HowWeWork />
        {t.showProof && <Proof />}
        <Contact onSubmit={() => setSent(true)} />
      </main>
      <Footer />

      <Dialog open={sent} onClose={() => setSent(false)}
        title="We've got it."
        description="A senior consultant will reach out within one business day — with a straight read on what you actually need. (Demo only — the form isn't wired to a backend yet.)"
        footer={<Button variant="primary" onClick={() => setSent(false)}>Close</Button>} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="North-star treatment" value={t.heroStar}
          options={[{ value: 'glow', label: 'Glow' }, { value: 'orbit', label: 'Orbit' }, { value: 'constellation', label: 'Stars' }]}
          onChange={(v) => setTweak('heroStar', v)} />
        <TweakSlider label="Glow strength" value={t.glow} min={0} max={36} unit="%"
          onChange={(v) => setTweak('glow', v)} />

        <TweakSection label="Atmosphere" />
        <TweakSlider label="Starfield" value={t.starfield} min={0} max={100} unit="%"
          onChange={(v) => setTweak('starfield', v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="What we do" value={t.whatWeDo}
          options={[{ value: 'grid', label: 'Grid' }, { value: 'index', label: 'Index' }, { value: 'tags', label: 'Tags' }]}
          onChange={(v) => setTweak('whatWeDo', v)} />
        <TweakRadio label="Independent" value={t.ledger}
          options={[{ value: 'two-col', label: '2-col' }, { value: 'three-way', label: '3-way' }, { value: 'stacked', label: 'Stack' }]}
          onChange={(v) => setTweak('ledger', v)} />
        <TweakRadio label="Section bands" value={t.bands}
          options={[{ value: 'alternate', label: 'Alt' }, { value: 'minimal', label: 'Min' }, { value: 'off', label: 'Off' }]}
          onChange={(v) => setTweak('bands', v)} />
        <TweakRadio label="Density" value={t.density}
          options={[{ value: 'airy', label: 'Airy' }, { value: 'regular', label: 'Reg' }, { value: 'tight', label: 'Tight' }]}
          onChange={(v) => setTweak('density', v)} />
        <TweakToggle label="Proof section" value={t.showProof}
          onChange={(v) => setTweak('showProof', v)} />

        <TweakSection label="Type & accent" />
        <TweakSlider label="Heading size" value={t.headingScale} min={82} max={118} unit="%"
          onChange={(v) => setTweak('headingScale', v)} />
        <TweakColor label="Accent" value={t.accent}
          options={[
            ['#C6A15B', '#DCBD82', '#9C7C3E'],
            ['#DCBD82', '#ECD7A6', '#B7944E'],
            ['#B9C0C7', '#D7DCE1', '#8A929B'],
            ['#7FA8C9', '#A9C7E0', '#5E84A3'],
          ]}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="" />
        <TweakButton label="Reset to defaults" secondary
          onClick={() => setTweak({ ...TWEAK_DEFAULTS })} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
