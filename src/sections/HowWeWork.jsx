import { Icon } from '../icons.jsx';

export default function HowWeWork() {
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
