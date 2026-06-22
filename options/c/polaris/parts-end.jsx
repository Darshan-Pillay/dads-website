/* Polaris landing — close: Proof · Contact · Footer */

function Proof() {
  const Icon = window.Icon;
  // PLACEHOLDER metrics — swap for real case data when available.
  const metrics = [
    { num: '0%', label: 'Vendor rebates accepted', sub: 'Every year, on principle' },
    { num: '40%', label: 'Faster on the right DB', sub: 'Niche open-source vs. market leader (typical workload)' },
    { num: '30d', label: 'To leave any provider', sub: 'When portable architecture is the goal' },
  ];
  return (
    <section className="section section--alt section--center" id="proof">
      <div className="container">
        <div className="section__head">
          <span className="placeholder-pill reveal"><Icon name="flask-conical" size={13} /> Placeholder data</span>
          <p className="eyebrow reveal">Proof</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>The receipts don't lie.</h2>
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
        <p className="eyebrow reveal" style={{ '--d': '40ms' }}>Diagnose my stack</p>
        <h2 className="section__title reveal" style={{ '--d': '80ms', maxWidth: '26ch', marginInline: 'auto' }}>
          Tell us your stack. We'll tell you what you're overpaying for.
        </h2>
        {/* Backend wiring: replace onSubmit handler / add `action` + `method`.
            Fields use real name="" attributes so a POST works as-is. */}
        <form className="contact__card contact__form reveal" style={{ '--d': '140ms' }}
          name="contact" onSubmit={(e) => { e.preventDefault(); onSubmit?.(new FormData(e.target)); }}>
          <div className="contact__row">
            <Input label="Name" name="name" placeholder="Jordan Maré" autoComplete="name" required />
            <Input label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
          </div>
          <Select label="What do you need help with?" name="domain" placeholder="Choose your stack pain"
            options={['Cloud bill is bleeding', 'Locked into a vendor', 'SAP / Oracle / Microsoft stack', 'AI roadmap — is the hype real?', 'Database is wrong for the workload', 'Not sure yet']} />
          <Input label="What's on your mind?" name="message" placeholder="A line about where you're headed…" />
          <Button variant="primary" size="lg" block type="submit"
            iconRight={<Icon name="arrow-right" size={18} />}>
            Connect with a specialist
          </Button>
        </form>
        <p className="contact__note reveal" style={{ '--d': '200ms' }}>No partner referral fee. No sponsored trip. Just an honest read on your stack.</p>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: 'Stack audit', items: [
      { label: 'The three paths',  href: 'pages/stack-audit.html' },
      { label: 'Cost-Optimised',   href: 'pages/stack-audit.html#cost-optimised' },
      { label: 'Best-in-Breed',    href: 'pages/stack-audit.html#best-in-breed' },
      { label: 'Fully Portable',   href: 'pages/stack-audit.html#fully-portable' },
    ]},
    { h: 'Polyglots in', items: [
      { label: 'Cloud',                          href: 'services/cloud.html' },
      { label: 'SAP',                            href: 'services/sap.html' },
      { label: 'Oracle',                         href: 'services/oracle.html' },
      { label: 'Microsoft',                      href: 'services/microsoft.html' },
      { label: 'AI & Data',                      href: 'services/ai.html' },
      { label: 'Open standards (K8s, Terraform)', href: 'pages/principles.html' },
    ]},
    { h: 'Company', items: [
      { label: 'Who we are',  href: 'pages/about.html' },
      { label: 'The conflict', href: 'pages/the-conflict.html' },
      { label: 'Case studies', href: 'pages/case-studies.html' },
      { label: 'Insights',     href: 'pages/insights.html' },
      { label: 'Contact',      href: 'pages/contact.html' },
      { label: 'LinkedIn',     href: 'https://www.linkedin.com/', target: '_blank', rel: 'noopener' },
    ]},
  ];
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting" />
          <p>Zero loyalty. Zero lock-in. Zero compromise.</p>
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
        <span>© 2026 Softfinity Consulting (Pty) Ltd. Vendor-agnostic. Solution-obsessed.</span>
        <span>The only thing we're married to is your ROI.</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Proof, Contact, Footer });
