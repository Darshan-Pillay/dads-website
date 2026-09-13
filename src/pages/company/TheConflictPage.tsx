import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

export default function TheConflictPage() {
  useEffect(() => { document.title = "When a consultancy lives on AWS credits and Microsoft licensing margins, they stop being consultants — Softfinity Consulting"; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; The conflict</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">The conflict</span></div>
          <h1 className="sp-hero__title">When a consultancy lives on AWS credits and Microsoft licensing margins, they stop being consultants.</h1>
          <p className="sp-hero__lead">The structural conflict of interest in the IT consulting industry is hiding in plain sight. It shapes every "best practice" recommendation a vendor-aligned firm puts in front of you.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">The 20% problem</p>
            <h2 className="sp-section__title">Up to 1 in 5 dollars of consultancy revenue comes from vendor rebates.</h2>
          </div>
          <p className="pg-prose">Many consultancies get up to 20% of their annual revenue from vendor rebates. That means when they recommend a specific cloud or ERP system, they are legally obligated to push you toward their partner — even if it isn't right for you. The rebate doesn't appear on your invoice, but it does shape what ends up on it.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">The certification trap</p>
            <h2 className="sp-section__title">"Best practice" becomes whatever the certification covers.</h2>
          </div>
          <p className="pg-prose">When a firm's training budget goes into proprietary certifications, their people think in terms of click-ops in a specific dashboard rather than fundamental computer science. Their definition of "best practice" narrows to whatever their certification catalogue covers, and so does their definition of your options.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Our position</p>
            <h2 className="sp-section__title">We opted out.</h2>
          </div>
          <p className="pg-prose">We don't accept partner referral fees, reseller margins, or vendor-sponsored trips. Our revenue comes exclusively from your success. We invest our training budget in protocols and open standards — Kubernetes, Terraform, REST/GraphQL, zero-trust security — rather than proprietary certifications. That means our team thinks in terms of fundamental computer science rather than click-ops in a specific dashboard. The result: we solve problems other consultancies can't even see — because we aren't blinded by vendor Kool-Aid.</p>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Want an unbiased read on your stack?</h2>
          <CtaButton label="Diagnose my stack" />
        </div>
      </section>
    </SubpageLayout>
  );
}
