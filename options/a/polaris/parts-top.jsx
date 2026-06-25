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
          <img src="assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting" />
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
          <img src="assets/softfinity-mark-gold.svg" alt="" />
        </span>
        <div className="hero__wordmark reveal" style={{ '--d': '40ms' }}>Softfinity<span className="gold">.</span></div>
        <h1 className="hero__title reveal" style={{ '--d': '90ms' }}>
          Technology-agnostic consulting.<br />Business-focused<span className="gold"> outcomes.</span>
        </h1>
        <p className="hero__lead reveal" style={{ '--d': '160ms' }}>
          Highly experienced consultants who work alongside your teams — recommending
          and implementing solutions based on what serves <em>your</em> business, not a vendor.
        </p>
        <div className="hero__actions reveal" style={{ '--d': '240ms' }}>
          <Button variant="primary" size="lg" as="a" href="#contact"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Connect with a specialist
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
          The landscape won't sit still. Vendors keep pushing their own agenda.
        </h2>
        <p className="fp-quote reveal" style={{ '--d': '120ms' }}>
          "I need advice I can trust — not another sales pitch dressed as strategy."
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
    { icon: 'shield-check', title: 'No vendor agenda', body: "No badges, no affiliations, no kickbacks. Every recommendation is driven by your business — not by who's paying us margin." },
    { icon: 'compass', title: 'Best-of-breed by default', body: 'We pick the most suitable technology from across the market — never forcing a one-size-fits-all stack on your team.' },
    { icon: 'users', title: 'Inside your team', body: 'Senior consultants who integrate with your people, transfer knowledge, and leave you stronger than they found you.' },
  ];
  return (
    <section className="section section--center" id="who-we-are">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Who we are</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Independent advice. Trusted expertise. Proven outcomes.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Softfinity is an independent, technology-agnostic consultancy. We're not tied to
            any single vendor, platform, or product — so every recommendation is grounded in
            what's right for your business, your budget, and your long-term success.
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
