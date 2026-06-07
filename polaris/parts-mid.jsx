/* Polaris landing — middle: What we do · Why independent · How we work */

const DOMAINS = [
  { name: 'AI', out: 'From hype to a roadmap' },
  { name: 'Big Data', out: 'Decisions you can trust' },
  { name: 'Cloud', out: 'Right-sized, not oversold' },
  { name: 'SAP', out: 'Migrations without drama' },
  { name: 'Microsoft', out: 'Tools that fit the team' },
  { name: 'Oracle', out: 'Untangle the estate' },
  { name: 'IBM', out: 'Modernise with care' },
  { name: 'Enterprise Architecture', out: 'A plan that holds' },
  { name: 'Software Development', out: 'Built for outcomes' },
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
            One team across the whole stack.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Nine domains, framed as outcomes — never vendor names. One agenda: yours.
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

  const them = ['Steer you to partners that pay them', 'Sell their roadmap, not yours', 'Badges, kickbacks, lock-in', 'Giant invoices'];
  const us = ['No badges, no affiliations', 'Your roadmap, your outcomes', 'Honest advice you can trust', 'Senior calibre, no markup'];

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
              <p className="ledger__label">Polaris</p>
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
              <p className="ledger__label">Polaris</p>
              <p>No agenda. Senior, independent judgement, priced like a partner.</p>
            </div>
          </div>
        )}

        <blockquote className="pull-quote reveal" style={{ '--d': '200ms' }}>
          When the landscape keeps shifting, we're the point that doesn't move.
        </blockquote>
      </div>
    </section>
  );
}

function HowWeWork() {
  const Icon = window.Icon;
  const steps = [
    { n: '01', icon: 'search', title: 'Find your north', body: 'We plug into your team and map the real picture — honestly, fast.' },
    { n: '02', icon: 'navigation', title: 'Chart the course', body: 'A clear, prioritised plan: what to do, in what order, and why.' },
    { n: '03', icon: 'handshake', title: 'Steer together', body: 'Senior hands alongside yours until the outcome is real.' },
  ];
  return (
    <section className="section" id="how-we-work">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">How we work</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Senior consultants inside your team — not above it.
          </h2>
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
