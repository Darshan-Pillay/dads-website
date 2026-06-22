/* Softfinity — corporate sections: Principles · Industries · Closing.
   Sourced from dad's Glossary, Corporate Overview, and Closing Statement docs. */

/* ---------- Principles & Concepts (SIPA / MCIP / IPVF / Translucent Engagement Model) */
function Principles() {
  const { Card } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  const concepts = [
    {
      icon: 'layers-3',
      tag: 'MCIP',
      title: 'Massed Core Intellectual Property',
      body: 'The undifferentiated mass of intellectual property and information available to execute on any client project — drawn from Softfinity, our partners, our clients, and the market. The core grows with every engagement.',
    },
    {
      icon: 'cloud-fog',
      tag: 'IPVF',
      title: 'Intellectual Property Vapour Fusion',
      body: 'The methodologies, best practices, and mechanisms we use to capture derived intellectual property and fuse it back into the Massed Core — enriching it further with every project.',
    },
    {
      icon: 'target',
      tag: 'SIPA',
      title: 'Singular Intellectual Property Assimilation',
      body: 'The methodologies we use to extract unique intellectual property from the Massed Core and assimilate it into a particular client engagement. It works in tandem with ienrichment to empower stakeholders and deliver competitive advantage.',
    },
    {
      icon: 'eye',
      tag: 'Translucent',
      title: 'Translucent Engagement Model',
      body: 'Our engagement framework: non-hierarchical, cross-functional teams composed of client representatives, Softfinity consultants, and partner resources — focused, cross-pollinated, and infused with the IP each engagement requires.',
    },
  ];
  return (
    <section className="section section--alt" id="principles">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Our principles &amp; concepts</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Methodologies that turn knowledge into a deliverable.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Our consultants embody a unique blend of entrepreneurial spirit and pioneering
            concepts. MCIP, IPVF and SIPA aren't slogans — they're the operating system
            behind every engagement, ensuring knowledge transfer is a tangible deliverable.
          </p>
        </div>
        <div className="concept-grid">
          {concepts.map((c, i) => (
            <Card key={c.tag} padding="lg" className="concept reveal" style={{ '--d': (i * 90) + 'ms', textAlign: 'left' }}>
              <div className="concept__head">
                <span className="feature__icon"><Icon name={c.icon} size={22} /></span>
                <span className="concept__tag">{c.tag}</span>
              </div>
              <h3 className="feature__title">{c.title}</h3>
              <p className="feature__body">{c.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries we serve */
function Industries() {
  const Icon = window.Icon;
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
            Our consultants combine deep technical expertise with hands-on experience across
            multiple industries — bringing proven practices, fresh perspectives, and
            innovative solutions to every engagement.
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

/* ---------- Closing statement — the promise */
function Closing() {
  return (
    <section className="section section--center closing" id="closing">
      <div className="container-narrow">
        <p className="eyebrow reveal">Your trusted technology partner</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          Whatever your technology landscape,<br />
          our focus remains the same.
        </h2>
        <p className="closing__lead reveal" style={{ '--d': '140ms' }}>
          Independent expertise across leading enterprise platforms and emerging technologies.
          Experienced consultants, deep industry knowledge, and a collaborative delivery model
          — combined to help organisations navigate complexity, reduce risk, and achieve
          meaningful business results that create <em>lasting value</em>.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { Principles, Industries, Closing });
