import type { ReactNode } from 'react';
import { Card } from '../ds.tsx';
import { Icon } from '../icons.tsx';

type Concept = { icon: string; tag: string; title: string; body: ReactNode };
type Footnote = { id: string; term: string; body: string; backRef?: string };

// Celestial constellation — five linked stars around a brighter centre,
// echoing the Polaris/north-star motif from the hero. Decorative; supports
// the "alliance of interconnected IP" idea visually without restating it.
function PrinciplesConstellation() {
  return (
    <svg viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      {/* faint background stars */}
      <g fill="var(--color-gold-deep)">
        <circle cx="60"  cy="80"  r="1.3" opacity="0.5" />
        <circle cx="320" cy="60"  r="1"   opacity="0.4" />
        <circle cx="140" cy="170" r="1"   opacity="0.4" />
        <circle cx="280" cy="200" r="1"   opacity="0.45" />
        <circle cx="40"  cy="260" r="1"   opacity="0.4" />
        <circle cx="360" cy="290" r="1.3" opacity="0.5" />
        <circle cx="180" cy="320" r="1"   opacity="0.4" />
        <circle cx="250" cy="430" r="1.3" opacity="0.5" />
        <circle cx="90"  cy="470" r="1"   opacity="0.4" />
        <circle cx="340" cy="500" r="1"   opacity="0.4" />
      </g>
      {/* constellation lines */}
      <g stroke="var(--color-gold)" strokeWidth="0.7" fill="none" opacity="0.45">
        <line x1="130" y1="130" x2="290" y2="110" />
        <line x1="130" y1="130" x2="200" y2="240" />
        <line x1="290" y1="110" x2="200" y2="240" />
        <line x1="200" y1="240" x2="110" y2="360" />
        <line x1="200" y1="240" x2="310" y2="390" />
        <line x1="110" y1="360" x2="310" y2="390" />
      </g>
      {/* glow under centre */}
      <circle cx="200" cy="240" r="26" fill="var(--color-gold)" opacity="0.10" />
      <circle cx="200" cy="240" r="14" fill="var(--color-gold)" opacity="0.18" />
      {/* main stars */}
      <g fill="var(--color-gold)">
        <circle cx="130" cy="130" r="3.5" />
        <circle cx="290" cy="110" r="3" />
        <circle cx="200" cy="240" r="5" />
        <circle cx="110" cy="360" r="3" />
        <circle cx="310" cy="390" r="3.5" />
      </g>
    </svg>
  );
}

export default function Principles() {
  const concepts: Concept[] = [
    { icon: 'layers-3', tag: 'MCIP', title: 'Massed Core Intellectual Property', body: 'The undifferentiated mass of intellectual property and information available to execute on any client project — drawn from Softfinity, our partners, our clients, and the market. The core grows with every engagement.' },
    { icon: 'cloud-fog', tag: 'IPVF', title: 'Intellectual Property Vapour Fusion',
      body: (
        <>
          The methodologies, best practices, and mechanisms we use to capture{' '}
          <a className="fn-ref" id="fn-ref-2" href="#fn-2">
            derived IP<sup>2</sup>
          </a>
          {' '}and fuse it back into the Massed Core — enriching it further with every project.
        </>
      ) },
    { icon: 'target', tag: 'SIPA', title: 'Singular Intellectual Property Assimilation',
      body: (
        <>
          The methodologies we use to extract unique IP from the Massed Core and assimilate it
          into a particular client engagement. Works in tandem with{' '}
          <a className="fn-ref" id="fn-ref-1" href="#fn-1">
            ienrichment<sup>1</sup>
          </a>
          {' '}to deliver competitive advantage.
        </>
      ) },
    { icon: 'eye', tag: 'Translucent', title: 'Translucent Engagement Model', body: 'Non-hierarchical, cross-functional teams composed of client representatives, Softfinity consultants, and partner resources — focused, cross-pollinated, infused with the IP each engagement requires.' },
  ];
  const supportingTerms: Footnote[] = [
    { id: 'fn-1', term: 'ienrichment', backRef: 'fn-ref-1',
      body: 'Intellectual Property Enrichment — a methodology in which IP, either as part of an overall solution or embedded in our consultants and partners, is blended into the execution of every client engagement, tailored to its unique needs.' },
    { id: 'fn-2', term: 'Nextelligence', backRef: 'fn-ref-2',
      body: 'The cognitive application of derivative intellectual property — the leap from raw knowledge to actionable, contextual insight that compounds across engagements.' },
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
            <PrinciplesConstellation />
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

            <ol className="principles__supporting" aria-label="Footnotes">
              {supportingTerms.map((t, i) => (
                <li id={t.id} className="supporting reveal" key={t.id} style={{ '--d': (600 + i * 70) + 'ms' }}>
                  <h4 className="supporting__term">
                    <span className="supporting__num" aria-hidden="true">{i + 1}</span>
                    {t.term}
                    {t.backRef && (
                      <a href={`#${t.backRef}`} className="supporting__back" aria-label={`Back to reference for ${t.term}`}>↩</a>
                    )}
                  </h4>
                  <p className="supporting__body">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
