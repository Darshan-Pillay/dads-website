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
        <img className="contact__star reveal" src="assets/polaris-mark-gold.png" alt="" aria-hidden="true" />
        <p className="eyebrow reveal" style={{ '--d': '40ms' }}>Find your north</p>
        <h2 className="section__title reveal" style={{ '--d': '80ms', maxWidth: '20ch', marginInline: 'auto' }}>
          Tell us where you're stuck. We'll point the way.
        </h2>
        {/* Backend wiring: replace onSubmit handler / add `action` + `method`.
            Fields use real name="" attributes so a POST works as-is. */}
        <form className="contact__card contact__form reveal" style={{ '--d': '140ms' }}
          name="contact" onSubmit={(e) => { e.preventDefault(); onSubmit?.(new FormData(e.target)); }}>
          <div className="contact__row">
            <Input label="Name" name="name" placeholder="Jordan Maré" autoComplete="name" required />
            <Input label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required />
          </div>
          <Select label="What do you need help with?" name="domain" placeholder="Choose a domain"
            options={['AI & Data', 'Cloud', 'SAP', 'Oracle', 'Microsoft', 'Enterprise Architecture', 'Not sure yet']} />
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
    { h: 'Services', items: ['AI & Data', 'Cloud', 'SAP', 'Oracle', 'Enterprise Architecture'] },
    { h: 'Company', items: ['About', 'Our approach', 'Consultants', 'Case studies'] },
    { h: 'Connect', items: ['Contact', 'LinkedIn', 'Insights'] },
  ];
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="assets/polaris-horizontal-dark.png" alt="Polaris" />
          <p>Your fixed point in a shifting landscape.</p>
        </div>
        <div className="site-footer__cols">
          {cols.map((c) => (
            <div key={c.h} className="site-footer__col">
              <h4>{c.h}</h4>
              <ul>{c.items.map((it) => <li key={it}><a href="#contact">{it}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container site-footer__base">
        <span>© 2026 Polaris. Independent IT consultancy.</span>
        <span>Independent expertise. Real solutions. No agenda.</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Proof, Contact, Footer });
