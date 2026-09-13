import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

const PROFILES = [
  { role: 'Lead Enterprise Architect', body: 'Standards-first architecture across SAP, Oracle, Microsoft. 20+ years across financial services, telco, and utilities. Specialises in untangling multi-vendor estates.' },
  { role: 'Principal AI Consultant', body: "Production ML, generative AI, governance. Brings hard-won judgement on what AI can and can't do today — and what's actually worth building." },
  { role: 'Cloud & Platform Engineer', body: 'Multi-cloud architecture, Kubernetes, Terraform. Designs for portability so you can leave any provider in 30 days.' },
  { role: 'Data Platform Lead', body: 'Modern data warehousing, lakehouse, governance, real-time. Picks the right engine for the actual workload — SQL, NoSQL, columnar, graph.' },
  { role: 'Programme Director', body: 'Runs the unglamorous middle of complex programmes. Specialises in change management, knowledge transfer, and managed transformation support.' },
  { role: 'Integration Specialist', body: "Middleware, APIs, event-driven architectures. Where the alliance actually starts working as one — or doesn't." },
];

export default function ConsultantsPage() {
  useEffect(() => { document.title = 'Senior consultants — embedded in your team — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; Consultants</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">Consultants</span></div>
          <h1 className="sp-hero__title">Senior consultants — embedded in your team.</h1>
          <p className="sp-hero__lead">Softfinity's consultants are senior practitioners with decades of combined experience across enterprise platforms, cloud, data, and emerging technologies. We don't graduate juniors on your engagement. The names below are illustrative placeholders for the kinds of profiles we bring.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Profiles</p>
            <h2 className="sp-section__title">The kinds of people we bring.</h2>
          </div>
          <div className="pg-profile-grid">
            {PROFILES.map(p => (
              <div className="pg-profile" key={p.role}>
                <span className="pg-profile__role">{p.role}</span>
                <p className="pg-profile__body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Want to meet the team that would lead your engagement?</h2>
          <CtaButton label="Set up an intro call" />
        </div>
      </section>
    </SubpageLayout>
  );
}
