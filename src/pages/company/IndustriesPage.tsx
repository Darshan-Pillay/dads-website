import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

const INDUSTRIES = [
  { title: 'Financial Services', body: 'Core banking modernisation, regulatory reporting, real-time risk, payments infrastructure. We work alongside CIOs managing both modernisation programmes and a moving regulatory floor.' },
  { title: 'Insurance', body: 'Underwriting modernisation, claims automation, actuarial data platforms, customer experience. Vendor-neutral selection across the insurance tech stack.' },
  { title: 'Healthcare', body: 'Clinical systems integration, patient data platforms, HL7 / FHIR, compliance. Independent advice in a market full of vendor-aligned recommendations.' },
  { title: 'Telecommunications & Media', body: "OSS / BSS, network data platforms, customer 360. We've helped telcos consolidate decades-old estates into manageable, modern architectures." },
  { title: 'Retail & FMCG', body: "Omnichannel commerce, supply chain visibility, customer data platforms, demand forecasting. Pragmatic about what AI can move and what it can't, yet." },
  { title: 'Manufacturing', body: 'Industry 4.0, MES integration, IoT data pipelines, predictive maintenance. Senior engineering judgement applied to OT/IT convergence.' },
  { title: 'Government', body: 'Citizen services platforms, secure data architectures, modernisation under fixed budgets. Standards-based architectures that survive procurement cycles.' },
  { title: 'Energy & Utilities', body: 'Grid data, regulatory reporting, asset management, sustainability reporting. We help utilities modernise without disrupting safety-critical operations.' },
  { title: 'Transportation & Logistics', body: 'Real-time fleet, route optimisation, customer-facing tracking, ERP integration. SAP, Oracle, and Microsoft estates all welcome.' },
  { title: 'Education', body: 'Student information systems, learning platforms, identity and access, analytics. Pragmatic modernisation under tight institutional budgets.' },
  { title: 'Professional Services', body: 'Practice management, knowledge platforms, time and billing modernisation, AI-augmented client work. We use what we recommend.' },
];

export default function IndustriesPage() {
  useEffect(() => { document.title = 'Cross-industry experience. Practical business knowledge — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; Industries</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">Industries</span></div>
          <h1 className="sp-hero__title">Cross-industry experience. Practical business knowledge.</h1>
          <p className="sp-hero__lead">Our consultants combine deep technical expertise with hands-on experience across multiple industries, bringing proven practices, fresh perspectives, and concrete answers to every engagement.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Sectors</p>
            <h2 className="sp-section__title">Where we've worked.</h2>
          </div>
          <div className="pg-industries">
            {INDUSTRIES.map(i => (
              <article className="pg-industry" key={i.title}>
                <h3 className="pg-industry__title">{i.title}</h3>
                <p className="pg-industry__body">{i.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Your industry not listed? We've probably done adjacent work.</h2>
          <CtaButton label="Tell us about your sector" />
        </div>
      </section>
    </SubpageLayout>
  );
}
