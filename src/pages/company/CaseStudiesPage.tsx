import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

const CASES = [
  {
    tag: 'Mid-market retailer',
    title: '32% cloud spend cut in 90 days.',
    items: [
      { dt: 'Challenge', dd: 'Three years of accumulated cloud sprawl — unused modules, oversized instances, duplicate workloads across two providers.' },
      { dt: 'Approach', dd: 'Vendor-Neutral Stack Audit. We mapped current architecture against three futures: Cost-Optimised, Best-in-Breed, Fully Portable. Leadership picked Cost-Optimised for year one.' },
      { dt: 'Outcome', dd: '32% annual cloud spend reduction. Right-sized instances, decommissioned shelfware, consolidated to one provider for the workloads where consolidation made sense.' },
    ],
  },
  {
    tag: 'Regional manufacturer',
    title: 'AI roadmap shipped in 6 weeks.',
    items: [
      { dt: 'Challenge', dd: "Board mandate to 'do something with AI' — but no clarity on which use cases would actually move revenue or cost." },
      { dt: 'Approach', dd: "AI Strategy Development phase. We mapped 14 candidate use cases against business value, technical readiness, and data availability. Recommended the 3 that were ready, said no to the 11 that weren't." },
      { dt: 'Outcome', dd: 'Production-ready roadmap with 3 prioritised use cases, ROI projections, and a no-list explaining why the other 11 were declined. Board approved unanimously.' },
    ],
  },
  {
    tag: 'Logistics SaaS',
    title: 'SAP S/4HANA migration — zero downtime.',
    items: [
      { dt: 'Challenge', dd: 'Legacy SAP ECC reaching end-of-life. Migration window had to be invisible to customers running critical operations 24/7.' },
      { dt: 'Approach', dd: 'Phased migration with parallel run. Solution architecture for cutover; system integration with their existing platform; change management for internal teams; managed support through the long tail.' },
      { dt: 'Outcome', dd: 'Zero customer-facing downtime over the cutover weekend. Internal team owned the new platform from week one — knowledge transfer was measured as a deliverable, not assumed.' },
    ],
  },
];

export default function CaseStudiesPage() {
  useEffect(() => { document.title = 'What independent advice has delivered — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; Case studies</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">Case studies</span></div>
          <h1 className="sp-hero__title">What independent advice has delivered.</h1>
          <p className="sp-hero__lead">Placeholder case studies showing the shape of the work — anonymised to protect client identities. Real results will be added as our clients give us permission to publish.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Selected work</p>
            <h2 className="sp-section__title">Three illustrative engagements.</h2>
            <p className="sp-section__lead">Names and figures are placeholders — the shape of the work is real.</p>
          </div>
          <div className="pg-cases">
            {CASES.map(c => (
              <article className="pg-case" key={c.title}>
                <span className="pg-case__tag">{c.tag}</span>
                <h3 className="pg-case__title">{c.title}</h3>
                <dl className="pg-case__dl">
                  {c.items.map(item => (
                    <>
                      <dt key={`dt-${item.dt}`}>{item.dt}</dt>
                      <dd key={`dd-${item.dt}`}>{item.dd}</dd>
                    </>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Want to discuss what we could deliver for you?</h2>
          <CtaButton label="Connect with a specialist" />
        </div>
      </section>
    </SubpageLayout>
  );
}
