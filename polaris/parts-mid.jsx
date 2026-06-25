/* Polaris landing — middle: What we do · Why independent · How we work */

const DOMAINS = [
  { name: 'SAP', out: 'S/4HANA · Finance · Supply Chain · SuccessFactors · Analytics · Migration' },
  { name: 'Microsoft', out: 'Azure · M365 · Dynamics 365 · Power Platform · SharePoint · Security' },
  { name: 'Oracle', out: 'OCI · ERP · HCM · Database · Analytics · Integration · Migrations' },
  { name: 'IBM', out: 'Cloud · Integration · Automation · Data platforms · Security · Middleware' },
  { name: 'Artificial Intelligence', out: 'Strategy · ML · Generative AI · NLP · Governance · Integration' },
  { name: 'Cloud Computing', out: 'Strategy · Migration · Hybrid · Multi-cloud · Security · Operations' },
  { name: 'Big Data & Analytics', out: 'Strategy · Architecture · Warehousing · Lakes · BI · Governance' },
  { name: 'Blockchain', out: 'Strategy · Distributed ledger · Smart contracts · Tokenisation · Identity' },
  { name: 'Mobile Development', out: 'Native iOS · Native Android · Cross-platform · Security · UX/UI' },
];

function WhatWeDo({ t }) {
  const { Tag } = window.PolarisDesignSystem_ff4f72;
  const layout = t.whatWeDo; // 'grid' | 'index' | 'tags'
  return (
    <section className="section section--alt" id="what-we-do">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">What we do</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Deep expertise across leading enterprise platforms and emerging technologies.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Whether you're modernising core systems, adopting cloud, leveraging data and AI,
            or undertaking large-scale digital transformation — our consultants bring the
            expertise, objectivity, and practical experience needed to deliver results.
          </p>
        </div>

        {layout === 'grid' && (
          <div className="domain-grid">
            {DOMAINS.map((d, i) => (
              <div className="domain reveal" key={d.name} style={{ '--d': (i * 50) + 'ms' }}>
                <h3 className="domain__name">{d.name}</h3>
                <p className="domain__out">{d.out}</p>
              </div>
            ))}
          </div>
        )}

        {layout === 'index' && (
          <ol className="idxlist reveal">
            {DOMAINS.map((d, i) => (
              <li key={d.name}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>{d.name}</span>
                <span className="o">{d.out}</span>
              </li>
            ))}
          </ol>
        )}

        {layout === 'tags' && (
          <div className="domains reveal">
            {DOMAINS.map((d) => (<Tag key={d.name}>{d.name}</Tag>))}
          </div>
        )}
      </div>
    </section>
  );
}

function WhyIndependent({ t }) {
  const Icon = window.Icon;
  const style = t.ledger; // 'two-col' | 'three-way' | 'stacked'

  const them = ['Aligned to one vendor or platform', 'Bias toward their partner stack', 'Badges, kickbacks, vendor lock-in', 'Roadmaps that serve the seller'];
  const us = ['Unbiased recommendations', 'Best-of-breed solutions', 'Reduced technology risk', 'Business-centric decision making'];

  return (
    <section className="section section--center" id="why-independent">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Why independent matters</p>
          <h2 className="section__statement reveal" style={{ '--d': '60ms', maxWidth: '24ch', marginInline: 'auto' }}>
            We recommend what works best for <span className="gold">you</span> — not for a vendor.
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
              <p>Bills big. Steers you to its own partners and its own roadmap.</p>
            </div>
            <div className="ledger__col ledger__col--them">
              <p className="ledger__label">The vendors</p>
              <p>Sell their stack, their badges, their lock-in — not your outcome.</p>
            </div>
            <div className="ledger__col ledger__col--us">
              <p className="ledger__label">Softfinity</p>
              <p>No agenda. Senior, independent judgement, priced like a partner.</p>
            </div>
          </div>
        )}

        <blockquote className="pull-quote reveal" style={{ '--d': '200ms' }}>
          Technology decisions should be driven by business outcomes — not vendor preferences.
        </blockquote>
      </div>
    </section>
  );
}

function HowWeWork() {
  const Icon = window.Icon;
  const steps = [
    { n: '01', icon: 'search', title: 'Strategy & Assessment', body: 'Roadmap development, technology assessment and selection — grounded in your business goals.' },
    { n: '02', icon: 'navigation', title: 'Architecture & Design', body: 'Solution architecture, system integration, data migration and modernisation, change management.' },
    { n: '03', icon: 'handshake', title: 'Delivery & Enablement', body: 'Programme and project delivery, knowledge transfer, skills enablement, managed transformation support.' },
  ];
  return (
    <section className="section" id="how-we-work">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">How we work</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Working together to deliver results.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            We partner with clients throughout the entire transformation journey — combining
            our consultants, our IP, and your team into one cross-functional delivery unit.
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
