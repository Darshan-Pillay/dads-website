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
  const links = ['The conflict', 'Who we are', 'What we do', 'How we work'];
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
          Zero loyalty.<br />Zero lock-in.<br />Zero<span className="gold"> compromise.</span>
        </h1>
        <p className="hero__lead reveal" style={{ '--d': '160ms' }}>
          We don't sell software — we sell the <em>freedom to choose it</em>. The only
          consultancy in the room with zero financial incentive to push AWS, Azure, Oracle,
          or any proprietary stack.
        </p>
        <div className="hero__actions reveal" style={{ '--d': '240ms' }}>
          <Button variant="primary" size="lg" as="a" href="#contact"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Get an unbiased health check
          </Button>
          <Button variant="ghost" size="lg" as="a" href="#who-we-are">Read our philosophy</Button>
        </div>
      </div>
      <a className="hero__scroll" href="#the-shift" aria-label="Scroll to begin">
        <span>see the conflict</span>
        <Icon name="chevron-down" size={20} />
      </a>
    </section>
  );
}

/* The Conflict — name the structural conflict of interest in the industry. */
function Shift() {
  const Icon = window.Icon;
  const tiles = [
    { icon: 'badge-percent', t: 'Many consultancies get up to 20% of revenue from vendor rebates' },
    { icon: 'lock', t: 'A "best practice" recommendation is often legally tied to a partner' },
    { icon: 'banknote', t: "You pay for certifications and kickbacks you'll never see on an invoice" },
  ];
  return (
    <section className="section section--center" id="the-conflict">
      <div className="container">
        <p className="eyebrow reveal">The conflict of interest</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          When a consultancy lives on AWS credits and Microsoft licensing margins,<br />
          they stop being consultants.
        </h2>
        <p className="fp-quote reveal" style={{ '--d': '120ms' }}>
          They become <span className="gold">salespeople</span>.
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
    { icon: 'ban', title: 'No partner referral fees', body: "We don't accept reseller margins, partner kickbacks, or vendor-sponsored trips. Our revenue is yours, end-to-end." },
    { icon: 'puzzle', title: 'Technology polyglots', body: 'Senior architects who have battle-tested every major cloud, every database type — SQL, NoSQL, Graph, Time-Series — and every paradigm.' },
    { icon: 'unlock', title: 'Deliberately portable', body: 'We design loosely coupled, deeply portable systems — because the only constant in IT is change, and you should be free to dance with whoever leads in five years.' },
  ];
  return (
    <section className="section section--center" id="who-we-are">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">The Unaffiliated Advantage</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            We took a different route.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            In an industry obsessed with certifications and partnerships, we deliberately chose
            not to tie our fate to any single multi-billion-dollar vendor. Our only loyalty is
            to your balance sheet, your uptime, and your team's sanity.
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
