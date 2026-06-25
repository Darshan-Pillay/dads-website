import { Card } from '../ds.jsx';
import { Icon } from '../icons.jsx';

export default function Principles() {
  const concepts = [
    { icon: 'layers-3', tag: 'MCIP', title: 'Massed Core Intellectual Property', body: 'The undifferentiated mass of intellectual property and information available to execute on any client project — drawn from Softfinity, our partners, our clients, and the market. The core grows with every engagement.' },
    { icon: 'cloud-fog', tag: 'IPVF', title: 'Intellectual Property Vapour Fusion', body: 'The methodologies, best practices, and mechanisms we use to capture derived IP and fuse it back into the Massed Core — enriching it further with every project.' },
    { icon: 'target', tag: 'SIPA', title: 'Singular Intellectual Property Assimilation', body: 'The methodologies we use to extract unique IP from the Massed Core and assimilate it into a particular client engagement. Works in tandem with ienrichment to deliver competitive advantage.' },
    { icon: 'eye', tag: 'Translucent', title: 'Translucent Engagement Model', body: 'Non-hierarchical, cross-functional teams composed of client representatives, Softfinity consultants, and partner resources — focused, cross-pollinated, infused with the IP each engagement requires.' },
  ];
  const supportingTerms = [
    { term: 'ienrichment', body: 'Intellectual Property Enrichment — a methodology in which IP, either as part of an overall solution or embedded in our consultants and partners, is blended into the execution of every client engagement, tailored to its unique needs.' },
    { term: 'Nextelligence', body: 'The cognitive application of derivative intellectual property — the leap from raw knowledge to actionable, contextual insight that compounds across engagements.' },
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
            concepts. MCIP, IPVF, and SIPA aren't slogans — they're the operating system
            behind every engagement, ensuring knowledge and skills transfer is a tangible,
            measured deliverable.
          </p>
        </div>

        <div className="principles__grid">
          <figure className="principles__figure reveal" style={{ '--d': '180ms' }}>
            <img src="assets/unrivalled-principles.jpg" alt="Unrivalled principles and concepts diagram" loading="lazy" />
            <figcaption>An unrivalled set of principles and concepts — refined across three decades of engagements.</figcaption>
          </figure>
          <div className="concept-list">
            {concepts.map((c, i) => (
              <Card key={c.tag} padding="lg" className="concept reveal" style={{ '--d': (240 + i * 70) + 'ms', textAlign: 'left' }}>
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

        <div className="principles__supporting">
          {supportingTerms.map((t, i) => (
            <div className="supporting reveal" key={t.term} style={{ '--d': (600 + i * 70) + 'ms' }}>
              <h4 className="supporting__term">{t.term}</h4>
              <p className="supporting__body">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
