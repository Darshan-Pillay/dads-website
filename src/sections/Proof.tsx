import { Icon } from '../icons.tsx';

export default function Proof() {
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
