import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

const PHASES = [
  { title: 'Strategy & Roadmap Development', body: "We anchor the journey in your business goals — not the latest vendor cycle. Outputs are decision-grade artefacts your board can endorse." },
  { title: 'Technology Assessment & Selection', body: "Objective evaluation of options against your risk, budget, and operations. Bias toward best-of-breed; bias against vendor lock-in." },
  { title: 'Solution Architecture & Design', body: "Standards-based, componentised architectures that flex as you grow. We design for the next platform shift, not just this one." },
  { title: 'Programme & Project Delivery', body: "Senior delivery alongside your team — outcomes measured, not assumed. We don't graduate junior consultants on your dime." },
  { title: 'System Integration', body: "Unifying the alliance: vendors, services, partners — into one whole. The hardest, least glamorous, most valuable phase." },
  { title: 'Data Migration & Modernisation', body: "Lifting legacy data into modern platforms safely and without disruption. Migration is data hygiene at scale." },
  { title: 'Change Management', body: "Bringing your people with the work — the most underestimated success factor. Tech adoption is a human problem." },
  { title: 'Knowledge Transfer & Skills Enablement', body: "Measured as a deliverable. Your team owns what we built, together. We leave you stronger than we found you." },
  { title: 'Managed Transformation Support', body: "Hands-on partnership through the long tail of any complex programme. We're around for the unglamorous middle, too." },
];

export default function ApproachPage() {
  useEffect(() => { document.title = 'Working together to deliver results — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; Approach</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">Approach</span></div>
          <h1 className="sp-hero__title">Working together to deliver results.</h1>
          <p className="sp-hero__lead">We partner with clients throughout the entire engagement, combining our consultants, our IP, and your team into one cross-functional delivery unit. Below is the nine-phase rhythm every Softfinity engagement follows.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">The Translucent Engagement Model</p>
            <h2 className="sp-section__title">Non-hierarchical, cross-pollinated, transparent.</h2>
          </div>
          <p className="pg-prose">Our consultants integrate directly with your teams to provide expertise where and when it is needed most. We don't bring an org chart that mirrors yours — we bring a structure that absorbs yours. Every engagement is a translucent collaboration: client representatives, Softfinity consultants, and partner resources operating as a single, focused team with shared ownership of outcomes and shared access to information.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">The nine phases</p>
            <h2 className="sp-section__title">From strategy through to managed support.</h2>
          </div>
          <ol className="pg-phases">
            {PHASES.map(p => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">What this looks like in practice</p>
            <h2 className="sp-section__title">An engagement is one team, one rhythm.</h2>
          </div>
          <p className="pg-prose">Phases overlap, repeat, and recombine — they aren't a waterfall. What stays constant is the rhythm: regular forums, transparent backlogs, and a shared definition of done. Knowledge transfer is built into every phase, not saved for the end. By the time our consultants step back, your team owns the playbook, the architecture, and the operational know-how.</p>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Curious how this would land for your transformation?</h2>
          <CtaButton label="Connect with a specialist" />
        </div>
      </section>
    </SubpageLayout>
  );
}
