import { Icon } from '../icons.jsx';

export default function Approach() {
  const phases = [
    { n: '01', icon: 'compass', t: 'Strategy & Roadmap Development', b: 'We anchor the journey in your business goals — not the latest vendor cycle.' },
    { n: '02', icon: 'gauge', t: 'Technology Assessment & Selection', b: 'Objective evaluation of options against your risk, budget, and operations.' },
    { n: '03', icon: 'layout-template', t: 'Solution Architecture & Design', b: 'Standards-based, componentised architectures that flex as you grow.' },
    { n: '04', icon: 'route', t: 'Program & Project Delivery', b: 'Senior delivery alongside your team — outcomes measured, not assumed.' },
    { n: '05', icon: 'workflow', t: 'System Integration', b: 'Unifying the alliance: vendors, services, partners — into one whole.' },
    { n: '06', icon: 'database-zap', t: 'Data Migration & Modernisation', b: 'Lifting legacy data into modern platforms safely and without disruption.' },
    { n: '07', icon: 'users-2', t: 'Change Management', b: 'Bringing your people with the work — the most underestimated success factor.' },
    { n: '08', icon: 'graduation-cap', t: 'Knowledge Transfer & Skills Enablement', b: 'Measured as a deliverable. Your team owns what we built, together.' },
    { n: '09', icon: 'life-buoy', t: 'Managed Transformation Support', b: 'Hands-on partnership through the long tail of any complex programme.' },
  ];
  return (
    <section className="section section--alt" id="approach">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Our consulting approach</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Working together to deliver results.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Our consultants integrate seamlessly with your teams to provide expertise where
            and when it is needed most. We partner with you throughout the entire transformation
            journey — combining our consultants, our IP, and your people into one delivery unit.
          </p>
        </div>
        <ol className="phases">
          {phases.map((p, i) => (
            <li className="phase reveal" key={p.n} style={{ '--d': (i * 60) + 'ms' }}>
              <div className="phase__num">{p.n}</div>
              <div className="phase__icon"><Icon name={p.icon} size={20} /></div>
              <div className="phase__body">
                <h3 className="phase__title">{p.t}</h3>
                <p className="phase__copy">{p.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
