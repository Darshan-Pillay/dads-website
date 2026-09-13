import { Icon } from '../icons.tsx';

export default function Industries() {
  const industries = [
    { icon: 'landmark', name: 'Financial Services' },
    { icon: 'shield', name: 'Insurance' },
    { icon: 'stethoscope', name: 'Healthcare' },
    { icon: 'radio-tower', name: 'Telecommunications & Media' },
    { icon: 'shopping-bag', name: 'Retail & FMCG' },
    { icon: 'factory', name: 'Manufacturing' },
    { icon: 'building-2', name: 'Government' },
    { icon: 'zap', name: 'Energy & Utilities' },
    { icon: 'truck', name: 'Transportation & Logistics' },
    { icon: 'graduation-cap', name: 'Education' },
    { icon: 'briefcase', name: 'Professional Services' },
  ];
  return (
    <section className="section section--center" id="industries">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Industries we serve</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Cross-industry experience. Practical business knowledge.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Our consultants bring technical depth and direct industry experience. They've
            worked in these sectors before, which means fewer surprises and faster time
            to results for you.
          </p>
        </div>
        <div className="industries-grid reveal" style={{ '--d': '180ms' }}>
          {industries.map((it) => (
            <div className="industry" key={it.name}>
              <span className="industry__icon"><Icon name={it.icon} size={20} /></span>
              <span className="industry__name">{it.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
