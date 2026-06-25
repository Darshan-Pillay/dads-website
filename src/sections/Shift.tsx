import { Icon } from '../icons.tsx';

export default function Shift() {
  const tiles = [
    { icon: 'shield-check', t: 'Unbiased recommendations, driven by your business goals' },
    { icon: 'layers', t: 'Best-of-breed selection from across the entire market' },
    { icon: 'compass', t: 'Reduced risk and vendor lock-in, greater long-term flexibility' },
  ];
  return (
    <section className="section section--center" id="the-shift">
      <div className="container">
        <p className="eyebrow reveal">Why technology-agnostic matters</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          The freedom to choose what's best for your business.
        </h2>
        <p className="fp-quote reveal" style={{ '--d': '120ms' }}>
          Many consulting firms are aligned to specific vendors. We're not.
        </p>
        <div className="anx">
          {tiles.map((x, i) => (
            <div className="anx__tile reveal" key={x.t} style={{ '--d': (i * 80) + 'ms' }}>
              <Icon name={x.icon} size={22} />
              <span className="t">{x.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
