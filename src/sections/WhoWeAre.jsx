import { Card } from '../ds.jsx';
import { Icon } from '../icons.jsx';

export default function WhoWeAre() {
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
