/* Polaris landing — middle: What we do · Why independent · How we work */

const DOMAINS = [
  { slug: 'sap',        name: 'SAP',        out: 'Without the SAP-only blinkers' },
  { slug: 'microsoft',  name: 'Microsoft',  out: 'Beyond the licensing margin' },
  { slug: 'oracle',     name: 'Oracle',     out: 'No partner referral fee' },
  { slug: 'ibm',        name: 'IBM',        out: 'Modernise on your terms' },
  { slug: 'ai',         name: 'AI',         out: 'Real value, not vendor hype' },
  { slug: 'cloud',      name: 'Cloud',      out: 'Multi-cloud, or no cloud' },
  { slug: 'data',       name: 'Big Data',   out: 'Best DB for the workload' },
  { slug: 'blockchain', name: 'Blockchain', out: 'Only when it earns its place' },
  { slug: 'mobile',     name: 'Mobile',     out: 'Native or cross-platform — your call' },
];

function WhatWeDo({ t }) {
  const Icon = window.Icon;
  const layout = t.whatWeDo; // 'grid' | 'index' | 'tags'
  return (
    <section className="section section--alt" id="what-we-do">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">What we do</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            The Agnostic Tech Stack Audit.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Stop paying for unused cloud modules. Stop overpaying for proprietary databases
            because "that's what your partner sells." We're polyglots across every major
            platform — and we'll tell you when to walk away.
          </p>
        </div>

        {layout === 'grid' && (
          <div className="domain-grid">
            {DOMAINS.map((d, i) => (
              <a className="domain domain--link reveal" key={d.name} href={`services/${d.slug}.html`} style={{ '--d': (i * 50) + 'ms' }}>
                <h3 className="domain__name">{d.name}</h3>
                <p className="domain__out">{d.out}</p>
                <span className="domain__cta">See the unbiased read <Icon name="arrow-right" size={14} /></span>
              </a>
            ))}
          </div>
        )}

        {layout === 'index' && (
          <ol className="idxlist reveal">
            {DOMAINS.map((d, i) => (
              <li key={d.name}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <a className="idxlist__name" href={`services/${d.slug}.html`}>{d.name}</a>
                <span className="o">{d.out}</span>
              </li>
            ))}
          </ol>
        )}

        {layout === 'tags' && (
          <div className="domains reveal">
            {DOMAINS.map((d) => (
              <a className="pl-tag" key={d.name} href={`services/${d.slug}.html`}>{d.name}</a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WhyIndependent({ t }) {
  const Icon = window.Icon;
  const style = t.ledger; // 'two-col' | 'three-way' | 'stacked'

  const them = ['Pushed toward their partner stack — by contract', 'Sell their roadmap, not yours', '20% of revenue from vendor rebates', "Click-ops thinkers, not architects"];
  const us = ['Zero partner referral fees', 'Investment in open standards: K8s, Terraform, GraphQL', 'Fundamental CS thinking, not vendor Kool-Aid', 'Recommendations 100% sterile, clinical, and yours'];

  return (
    <section className="section section--center" id="why-independent">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Why independent matters</p>
          <h2 className="section__statement reveal" style={{ '--d': '60ms', maxWidth: '28ch', marginInline: 'auto' }}>
            The hidden cost of <span className="gold">"free"</span> certifications.
          </h2>
        </div>

        {(style === 'two-col' || style === 'stacked') && (
          <div className={`ledger reveal ${style === 'stacked' ? 'ledger--stack' : ''}`} style={{ '--d': '120ms' }}>
            <div className="ledger__col ledger__col--them">
              <p className="ledger__label">The giants &amp; the vendors</p>
              <ul className="ledger__list">
                {them.map((x) => <li key={x}><Icon name="x" size={18} /> {x}</li>)}
              </ul>
            </div>
            <div className="ledger__col ledger__col--us">
              <p className="ledger__label">Softfinity</p>
              <ul className="ledger__list">
                {us.map((x) => <li key={x}><Icon name="check" size={18} /> {x}</li>)}
              </ul>
            </div>
          </div>
        )}

        {style === 'three-way' && (
          <div className="ledger ledger--three reveal" style={{ '--d': '120ms' }}>
            <div className="ledger__col ledger__col--them">
              <p className="ledger__label">Big consultancy</p>
              <p>Legally obligated to push partner vendors. Up to 20% of revenue from rebates you're paying for, hidden.</p>
            </div>
            <div className="ledger__col ledger__col--them">
              <p className="ledger__label">Vendor-aligned firm</p>
              <p>"Best practice" = whatever their certification ecosystem covers. Click-ops in a specific dashboard.</p>
            </div>
            <div className="ledger__col ledger__col--us">
              <p className="ledger__label">Softfinity</p>
              <p>Zero partner referral fees. Battle-tested across every cloud, every DB type. Loyalty to your balance sheet — full stop.</p>
            </div>
          </div>
        )}

        <blockquote className="pull-quote reveal" style={{ '--d': '200ms' }}>
          We solve problems other consultancies can't even see — because we aren't blinded by vendor Kool-Aid.
        </blockquote>
      </div>
    </section>
  );
}

function HowWeWork() {
  const Icon = window.Icon;
  const steps = [
    { n: '01', icon: 'wallet-cards', title: 'Cost-Optimised', body: 'Staying where you are — but trimming the fat. We map every unused module, every overpaid licence, and hand you the receipts.' },
    { n: '02', icon: 'replace', title: 'Best-in-Breed', body: "Swapping specific components for superior alternatives. If a niche open-source DB is 40% faster on your workload, we'll champion it." },
    { n: '03', icon: 'door-open', title: 'Fully Portable', body: 'Rebuilding your middleware so you can leave any provider within 30 days. The ultimate insurance policy.' },
  ];
  return (
    <section className="section" id="how-we-work">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">How we work</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Three viable paths. Honest pros, cons, and 5-year costs.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Every engagement starts with a Vendor-Neutral Stack Audit. We map your current
            architecture against three distinct futures — and let your leadership make the
            final call. That's partnership. Not vendor-push.
          </p>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step reveal" key={s.n} style={{ '--d': (i * 90) + 'ms' }}>
              <div className="step__top">
                <span className="step__icon"><Icon name={s.icon} size={22} /></span>
                <span className="step__n">{s.n}</span>
              </div>
              <h3 className="feature__title">{s.title}</h3>
              <p className="feature__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WhatWeDo, WhyIndependent, HowWeWork });
