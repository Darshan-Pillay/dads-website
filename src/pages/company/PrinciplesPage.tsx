import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

const CONCEPTS = [
  {
    title: 'MCIP — Massed Core Intellectual Property',
    body: "The undifferentiated mass of intellectual property and information available to execute on any client project. It is composed of Softfinity, our partners, our clients, and the market. The IP core continues to grow on the basis of derived IP generated on the back of every project — each engagement enriches the core for every future engagement.",
  },
  {
    title: 'IPVF — Intellectual Property Vapour Fusion',
    body: "The set of methodologies, best practices, and mechanisms we use to capture derived intellectual property and fuse it back into the Massed Core. IPVF is the process that ensures lessons learned and frameworks built during one engagement become an accelerator for the next. Without IPVF, IP evaporates with people; with it, IP compounds.",
  },
  {
    title: 'SIPA — Singular Intellectual Property Assimilation',
    body: "The methodologies we use to extract unique IP from the Massed Core and assimilate it into a particular client engagement. SIPA works in tandem with ienrichment to enable stakeholders and deliver a decisive competitive advantage. Every client engagement is bespoke, but never starting from zero.",
  },
  {
    title: 'Translucent Engagement Model',
    body: "Our engagement framework: non-hierarchical, cross-functional teams composed of client representatives, Softfinity consultants, and partner resources — focused, cross-pollinated, infused with the IP each engagement requires. Translucent because decisions, IP, and information flow freely across organisational boundaries.",
  },
  {
    title: 'ienrichment — Intellectual Property Enrichment',
    body: "A methodology in which intellectual property — either as part of an overall solution or embedded in our consultants and partners — is blended into the execution of every client engagement. The enrichment process is tailored to the unique needs of each engagement.",
  },
  {
    title: 'Nextelligence',
    body: "The cognitive application of derivative intellectual property: the leap from raw knowledge to concrete, contextual insight that compounds across engagements. Nextelligence is what turns a project's lessons-learned document into the next project's accelerator.",
  },
];

export default function PrinciplesPage() {
  useEffect(() => { document.title = 'Methodologies that turn knowledge into a deliverable — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; Principles</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">Principles</span></div>
          <h1 className="sp-hero__title">Methodologies that turn knowledge into a deliverable.</h1>
          <p className="sp-hero__lead">Central to our approach are the concepts of MCIP, IPVF, and SIPA. These principles run through every aspect of our work. They are the operating system behind every engagement, ensuring knowledge and skills transfer is a tangible, measured deliverable rather than an incidental output.</p>
          <div className="sp-hero__media sp-hero__media--constellation">
            <svg viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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
              <g stroke="var(--color-gold)" strokeWidth="0.7" fill="none" opacity="0.45">
                <line x1="130" y1="130" x2="290" y2="110" />
                <line x1="130" y1="130" x2="200" y2="240" />
                <line x1="290" y1="110" x2="200" y2="240" />
                <line x1="200" y1="240" x2="110" y2="360" />
                <line x1="200" y1="240" x2="310" y2="390" />
                <line x1="110" y1="360" x2="310" y2="390" />
              </g>
              <circle cx="200" cy="240" r="26" fill="var(--color-gold)" opacity="0.10" />
              <circle cx="200" cy="240" r="14" fill="var(--color-gold)" opacity="0.18" />
              <g fill="var(--color-gold)">
                <circle cx="130" cy="130" r="3.5" />
                <circle cx="290" cy="110" r="3" />
                <circle cx="200" cy="240" r="5" />
                <circle cx="110" cy="360" r="3" />
                <circle cx="310" cy="390" r="3.5" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">The six terms</p>
            <h2 className="sp-section__title">The operating system behind every engagement.</h2>
          </div>
          <div className="pg-concepts">
            {CONCEPTS.map(c => (
              <article className="pg-concept" key={c.title}>
                <h3 className="pg-concept__title">{c.title}</h3>
                <p className="pg-concept__body">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Want to see these principles applied to your environment?</h2>
          <CtaButton label="Connect with a specialist" />
        </div>
      </section>
    </SubpageLayout>
  );
}
