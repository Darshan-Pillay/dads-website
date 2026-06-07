/* Polaris landing — top of the scroll: Nav · Hero · The Shift · Who we are */

function Nav({ onNav }) {
  const { Button } = window.PolarisDesignSystem_ff4f72;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['The shift', 'Who we are', 'What we do', 'How we work'];
  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-nav__inner">
        <a className="site-nav__brand" href="#top" onClick={onNav}>
          <img src="assets/polaris-horizontal-dark.png" alt="Polaris" />
        </a>
        <nav className="site-nav__links">
          {links.map((l) => (
            <a key={l} href={'#' + l.toLowerCase().replace(/\s+/g, '-')} onClick={onNav}>{l}</a>
          ))}
        </nav>
        <div className="site-nav__cta">
          <Button variant="primary" size="sm" as="a" href="#contact" onClick={onNav}>
            Connect with a specialist
          </Button>
        </div>
      </div>
    </header>
  );
}

/* Hero — the calm, centered opener. Star treatment is tweakable. */
function Hero({ t }) {
  const { Button } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  const treatment = t.heroStar; // 'glow' | 'orbit' | 'constellation'
  // satellite dots for the constellation treatment
  const dots = [
    { top: '20%', left: '30%', d: '0s' }, { top: '32%', left: '72%', d: '1.2s' },
    { top: '64%', left: '22%', d: '0.6s' }, { top: '70%', left: '78%', d: '1.8s' },
    { top: '48%', left: '12%', d: '2.4s' }, { top: '24%', left: '54%', d: '0.9s' },
  ];
  return (
    <section className="hero" id="top">
      {treatment === 'constellation' && (
        <div className="hero__constellation" aria-hidden="true">
          {dots.map((p, i) => (
            <span key={i} style={{ top: p.top, left: p.left, animationDelay: p.d }} />
          ))}
        </div>
      )}
      <div className="hero__inner">
        <span className={`hero__star ${treatment === 'orbit' ? 'hero__star--orbit' : ''} reveal`} aria-hidden="true">
          <img src="assets/polaris-mark-gold.png" alt="" />
        </span>
        <div className="hero__wordmark reveal" style={{ '--d': '40ms' }}>Polaris<span className="gold">.</span></div>
        <h1 className="hero__title reveal" style={{ '--d': '90ms' }}>
          Your fixed point in a<br />shifting landscape<span className="gold">.</span>
        </h1>
        <p className="hero__lead reveal" style={{ '--d': '160ms' }}>
          Independent, senior IT consultants who guide growing businesses through digital
          transformation — and recommend what's right for <em>you</em>, not for a vendor.
        </p>
        <div className="hero__actions reveal" style={{ '--d': '240ms' }}>
          <Button variant="primary" size="lg" as="a" href="#contact"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Find your north
          </Button>
          <Button variant="ghost" size="lg" as="a" href="#how-we-work">See how we work</Button>
        </div>
      </div>
      <a className="hero__scroll" href="#the-shift" aria-label="Scroll to begin">
        <span>the story begins</span>
        <Icon name="chevron-down" size={20} />
      </a>
    </section>
  );
}

/* The Shift — name the visitor's anxiety in their own voice. */
function Shift() {
  const Icon = window.Icon;
  const tiles = [
    { icon: 'box', t: 'Vendors push their own stack' },
    { icon: 'receipt', t: 'Big consultancies bill big fees' },
    { icon: 'user-search', t: 'Specialist talent is scarce' },
  ];
  return (
    <section className="section section--center" id="the-shift">
      <div className="container">
        <p className="eyebrow reveal">The shift</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          AI is everywhere. The landscape won't sit still.
        </h2>
        <p className="fp-quote reveal" style={{ '--d': '120ms' }}>
          "I can't tell hype from substance — and choosing wrong is expensive."
        </p>
        <div className="anx">
          {tiles.map((x, i) => (
            <div className="anx__tile reveal" key={x.t} style={{ '--d': (i * 80) + 'ms' }}>
              <Icon name={x.icon} size={22} />
              <span className="t">{x.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Who we are — the emotional pivot. */
function WhoWeAre() {
  const { Card } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  const points = [
    { icon: 'shield-check', title: 'No agenda', body: 'No badges, no affiliations, no kickbacks. We recommend what works best for you.' },
    { icon: 'compass', title: 'Always pointing north', body: "We don't just diagnose — we hand you a clear, prioritised plan you can act on." },
    { icon: 'users', title: 'Inside your team', body: 'Senior consultants who work shoulder-to-shoulder with your people, not over the top.' },
  ];
  return (
    <section className="section section--center" id="who-we-are">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Who we are</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            The honest underdog. Small, senior, conflict-free.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            We're the small fish that takes on the giants — senior, independent thinking
            without the agenda or the markup. We don't sell badges. We sell judgement.
          </p>
        </div>
        <div className="grid-3">
          {points.map((p, i) => (
            <Card key={p.title} padding="lg" className="reveal" style={{ '--d': (i * 80) + 'ms', textAlign: 'left' }}>
              <span className="feature__icon"><Icon name={p.icon} size={22} /></span>
              <h3 className="feature__title">{p.title}</h3>
              <p className="feature__body">{p.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Shift, WhoWeAre });
