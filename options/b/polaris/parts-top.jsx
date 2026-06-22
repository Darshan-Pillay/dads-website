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
  const links = ['Who we are', 'What we do', 'Principles', 'Industries', 'How we work'];
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
          We help organisations achieve their strategic objectives by providing highly experienced
          consultants who work alongside client teams to deliver measurable business outcomes —
          independent of any vendor, platform, or product.
        </p>
        <div className="hero__actions reveal" style={{ '--d': '240ms' }}>
          <Button variant="primary" size="lg" as="a" href="#contact"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Connect with a specialist
          </Button>
          <Button variant="ghost" size="lg" as="a" href="#principles">Our philosophy</Button>
        </div>
      </div>
      <a className="hero__scroll" href="#who-we-are" aria-label="Scroll to begin">
        <span>begin</span>
        <Icon name="chevron-down" size={20} />
      </a>
    </section>
  );
}

/* Why agnostic matters — corporate framing of vendor neutrality. */
function Shift() {
  const Icon = window.Icon;
  const tiles = [
    { icon: 'shield-check', t: 'Unbiased recommendations, driven by your business goals' },
    { icon: 'layers', t: 'Best-of-breed selection from across the entire market' },
    { icon: 'compass', t: 'Reduced risk and vendor lock-in, greater long-term flexibility' },
  ];
  return (
    <section className="section section--center" id="the-shift">
      <div className="container">
        <p className="eyebrow reveal">Why technology-agnostic matters</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          The freedom to choose what's best for your business.
        </h2>
        <p className="fp-quote reveal" style={{ '--d': '120ms' }}>
          Many consulting firms are aligned to specific vendors. We're not.
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
    { icon: 'shield-check', title: 'Independent', body: 'We recommend and implement solutions based solely on what serves your business — never tied to any single vendor, platform, or product.' },
    { icon: 'users', title: 'Collaborative', body: 'Our consultants integrate seamlessly with your internal teams, transferring knowledge to ensure long-term sustainability.' },
    { icon: 'compass', title: 'Outcome-led', body: 'Our goal is not to implement technology, but to help organisations realise measurable, lasting business value.' },
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
            Softfinity Consulting is a business and technology consulting and systems
            integration firm. Through our Translucent Engagement Model, we deliver value-driven
            solutions across Transportation &amp; Logistics, Telecommunications &amp; Media,
            Financial Services, Government, Energy, and beyond.
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
