import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

const PATHS = [
  {
    num: '01',
    title: 'Cost-Optimised',
    lead: 'Staying where you are — but trimming the fat.',
    body: "We map every unused module, every overpaid licence, every oversized instance, every duplicate workload. You stay on your current vendor footprint, but you stop paying for things you're not actually using. Lowest risk path; quickest payback; smallest scope of change.",
  },
  {
    num: '02',
    title: 'Best-in-Breed',
    lead: 'Swapping specific components for superior alternatives.',
    body: "If a niche open-source database is 40% faster on your workload than the market leader, we'll champion it. If a smaller cloud provider gives you 30% better economics for your specific data egress pattern, we'll recommend it. Medium risk, medium payback, scoped to specific components rather than the whole estate.",
  },
  {
    num: '03',
    title: 'Fully Portable',
    lead: 'Rebuilding your middleware so you can leave any provider within 30 days.',
    body: "The ultimate insurance policy. We rebuild your integration layer around open standards — Kubernetes, Terraform, GraphQL, zero-trust — so that any vendor can be swapped without rewriting business logic. Highest investment, highest long-term flexibility, the only path that fully eliminates vendor lock-in.",
  },
];

export default function StackAuditPage() {
  useEffect(() => { document.title = 'Three viable paths. Honest pros, cons, and 5-year costs — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; The Stack Audit</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">The Stack Audit</span></div>
          <h1 className="sp-hero__title">Three viable paths. Honest pros, cons, and 5-year costs.</h1>
          <p className="sp-hero__lead">Every Softfinity engagement starts with a Vendor-Neutral Stack Audit. We map your current architecture against three distinct futures, deliver a roadmap with multiple viable paths complete with honest pros, cons, and 5-year cost projections for each, and let your leadership make the final call. That's partnership. Not vendor-push.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">The three paths</p>
            <h2 className="sp-section__title">Pick the future that fits.</h2>
          </div>
          <div className="pg-paths">
            {PATHS.map(p => (
              <article className="pg-path" key={p.num}>
                <span className="pg-path__num">{p.num}</span>
                <h3 className="pg-path__title">{p.title}</h3>
                <p className="pg-path__lead">{p.lead}</p>
                <p className="pg-path__body">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Ready to see the three paths for your architecture?</h2>
          <CtaButton label="Request a Stack Audit" />
        </div>
      </section>
    </SubpageLayout>
  );
}
