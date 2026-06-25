import { Icon } from '../icons.jsx';

export default function SoftwareFactory() {
  const capabilities = [
    { icon: 'cpu', t: 'Standards-based engineering' },
    { icon: 'shuffle', t: 'Componentised, portable architectures' },
    { icon: 'rocket', t: 'Accelerated time-to-market' },
    { icon: 'shield-check', t: 'Built-in governance &amp; security' },
  ];
  return (
    <section className="section sf" id="software-factory">
      <div className="container sf__grid">
        <figure className="sf__figure reveal">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="A modern, well-lit collaborative workspace"
            loading="lazy"
          />
        </figure>
        <div className="sf__copy">
          <p className="eyebrow reveal">Software Factory &amp; Solutions Centre</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            The innovation engine behind every Softfinity engagement.
          </h2>
          <p className="sf__lead reveal" style={{ '--d': '120ms' }}>
            Our dedicated Software Factory and Solutions Centre is where we design, build, and
            deliver scalable, standards-based enterprise solutions — supporting digital
            transformation and accelerating time-to-market for our clients.
          </p>
          <ul className="sf__capabilities reveal" style={{ '--d': '180ms' }}>
            {capabilities.map((c) => (
              <li key={c.t}>
                <span className="sf__capability-icon"><Icon name={c.icon} size={18} /></span>
                <span dangerouslySetInnerHTML={{ __html: c.t }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
