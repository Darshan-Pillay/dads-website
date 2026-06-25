import { Icon } from '../icons.jsx';

export default function WhyIndependent({ t }) {
  const style = t.ledger;
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
