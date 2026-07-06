import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

export default function AboutPage() {
  useEffect(() => { document.title = 'Who we are — Softfinity Consulting'; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; About</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">About</span></div>
          <h1 className="sp-hero__title">Who we are.</h1>
          <p className="sp-hero__lead">Softfinity Consulting is a business and technology consulting and systems integration firm, specialising in intellectually enriched consulting and turnkey solutions tailored to the diverse needs of our clients. We have spent three decades refining what an unaffiliated, IP-driven engagement looks like.</p>
          <div className="sp-hero__media">
            <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80" alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Our story</p>
            <h2 className="sp-section__title">Built on a refusal to take a side.</h2>
          </div>
          <p className="pg-prose">In an industry obsessed with certifications and partnerships, we deliberately chose not to tie our fate to any single multi-billion-dollar vendor. When a consultancy relies on AWS credits or Microsoft licensing margins to survive, they stop being consultants and start being salespeople. We opted out of that game entirely. Our practice is built around the only loyalty that matters: your balance sheet, your uptime, and your team's sanity.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Our operating model</p>
            <h2 className="sp-section__title">Self-assimilating IP teams.</h2>
          </div>
          <p className="pg-prose">Our model is deliberately non-hierarchical. Instead of traditional divisions, we work through self-assimilating IP teams — dynamic, cross-functional groups composed of client representatives, Softfinity consultants, and partner resources. These teams are highly focused, cross-pollinated, and infused with the intellectual property and information required by each engagement. This collective structure keeps us focused and closely aligned with client objectives.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Our commitment</p>
            <h2 className="sp-section__title">Consulting that builds capability, not just advice.</h2>
          </div>
          <p className="pg-prose">We believe consulting must go beyond advice. By embedding knowledge transfer, IP creation, and collaborative execution into every project, we ensure our clients leave with solutions and the capability to run them. Our vision is to help organisations implement flexible, componentised, standards-based enterprise architectures that connect business units, suppliers, customers, and partners without friction.</p>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Want to know how we'd run your next engagement?</h2>
          <CtaButton label="Talk to a senior consultant" />
        </div>
      </section>
    </SubpageLayout>
  );
}
