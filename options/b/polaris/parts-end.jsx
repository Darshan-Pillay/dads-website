/* Polaris landing — close: Proof · Contact · Footer */

function Proof() {
  const Icon = window.Icon;
  // PLACEHOLDER metrics — swap for real case data when available.
  const metrics = [
    { num: '32%', label: 'Cloud spend cut', sub: 'Mid-market retailer · 90 days' },
    { num: '6 wks', label: 'AI roadmap shipped', sub: 'Regional manufacturer' },
    { num: '0', label: 'Downtime on SAP move', sub: 'Logistics SaaS' },
  ];
  return (
    <section className="section section--alt section--center" id="proof">
      <div className="container">
        <div className="section__head">
          <span className="placeholder-pill reveal"><Icon name="flask-conical" size={13} /> Placeholder data</span>
          <p className="eyebrow reveal">Proof</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>Direction that delivered.</h2>
        </div>
        <div className="metrics">
          {metrics.map((m, i) => (
            <div className="metric reveal" key={m.label} style={{ '--d': (i * 80) + 'ms' }}>
              <div className="metric__num">{m.num}</div>
              <div className="metric__label">{m.label}</div>
              <p className="metric__sub">{m.sub}</p>
            </div>
          ))}
        </div>
        <p className="proof-quote reveal" style={{ '--d': '120ms' }}>
          "They told us what <em>not</em> to buy. That's when we trusted them."
        </p>
        <p className="proof-cite reveal" style={{ '--d': '180ms' }}>— Head of IT, mid-market retailer (placeholder)</p>
      </div>
    </section>
  );
}

function Contact({ onSubmit }) {
  const { Button, Input, Select } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  return (
    <section className="section section--center" id="contact">
      <div className="container">
        <img className="contact__star reveal" src="assets/softfinity-mark-gold.svg" alt="" aria-hidden="true" />
        <p className="eyebrow reveal" style={{ '--d': '40ms' }}>Connect with a specialist</p>
        <h2 className="section__title reveal" style={{ '--d': '80ms', maxWidth: '26ch', marginInline: 'auto' }}>
          Tell us about your transformation. We'll bring the experience.
        </h2>
        {/* Backend wiring: replace onSubmit handler / add `action` + `method`.
            Fields use real name="" attributes so a POST works as-is. */}
        <form className="contact__card contact__form reveal" style={{ '--d': '140ms' }}
          name="contact" onSubmit={(e) => { e.preventDefault(); onSubmit?.(new FormData(e.target)); }}>
          <div className="contact__row">
            <Input label="Name" name="name" placeholder="Jordan Maré" autoComplete="name" required />
            <Input label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
          </div>
          <Select label="What do you need help with?" name="domain" placeholder="Choose a technology area"
            options={['SAP', 'Microsoft', 'Oracle', 'IBM', 'AI', 'Cloud Computing', 'Big Data & Analytics', 'Blockchain', 'Mobile Development', 'Not sure yet']} />
          <Input label="What's on your mind?" name="message" placeholder="A line about where you're headed…" />
          <Button variant="primary" size="lg" block type="submit"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Connect with a specialist
          </Button>
        </form>
        <p className="contact__note reveal" style={{ '--d': '200ms' }}>No pitch. No agenda. Just honest direction.</p>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: 'Services', items: [
      { label: 'SAP',        href: 'services/sap.html' },
      { label: 'Microsoft',  href: 'services/microsoft.html' },
      { label: 'Oracle',     href: 'services/oracle.html' },
      { label: 'IBM',        href: 'services/ibm.html' },
      { label: 'AI',         href: 'services/ai.html' },
      { label: 'Cloud',      href: 'services/cloud.html' },
      { label: 'Big Data',   href: 'services/data.html' },
      { label: 'Blockchain', href: 'services/blockchain.html' },
      { label: 'Mobile',     href: 'services/mobile.html' },
    ]},
    { h: 'Company', items: [
      { label: 'Who we are',   href: 'pages/about.html' },
      { label: 'Our approach', href: 'pages/approach.html' },
      { label: 'Principles',   href: 'pages/principles.html' },
      { label: 'Industries',   href: 'pages/industries.html' },
      { label: 'Consultants',  href: 'pages/consultants.html' },
      { label: 'Case studies', href: 'pages/case-studies.html' },
    ]},
    { h: 'Connect', items: [
      { label: 'Contact',  href: 'pages/contact.html' },
      { label: 'Insights', href: 'pages/insights.html' },
      { label: 'Email',    href: 'mailto:hello@softfinity.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/', target: '_blank', rel: 'noopener' },
    ]},
  ];
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting" />
          <p>Independent advice. Trusted expertise. Proven outcomes.</p>
        </div>
        <div className="site-footer__cols">
          {cols.map((c) => (
            <div key={c.h} className="site-footer__col">
              <h4>{c.h}</h4>
              <ul>
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} {...(it.target ? { target: it.target, rel: it.rel } : {})}>
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container site-footer__base">
        <span>© 2026 Softfinity Consulting (Pty) Ltd. Business &amp; technology consulting and systems integration.</span>
        <span>Technology-agnostic. Business-focused.</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Proof, Contact, Footer });
