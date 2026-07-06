import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';

function CtaButton({ label }: { label: string }) {
  const { openModal } = useContactModal();
  return <button className="sp-cta__btn" type="button" onClick={openModal}>{label}</button>;
}

export default function ContactPage() {
  useEffect(() => { document.title = "Tell us where you're stuck. We'll bring the experience — Softfinity Consulting"; }, []);

  return (
    <SubpageLayout>
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb"><Link to="/">Softfinity</Link> &nbsp;/&nbsp; Contact</p>
          <div className="sp-hero__head"><span className="sp-hero__tag">Contact</span></div>
          <h1 className="sp-hero__title">Tell us where you're stuck. We'll bring the experience.</h1>
          <p className="sp-hero__lead">We're an independent, technology-agnostic consultancy. No pitch, no agenda, no partner referral fee. Just an honest read on what your business actually needs.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Get in touch</p>
            <h2 className="sp-section__title">Three ways to reach us.</h2>
          </div>
          <p className="pg-prose">Email us directly at christopher.pillay@softfinity.co.za, connect with us on LinkedIn, or use the contact form below. A senior consultant will reach out within one business day, with a straight read on what you actually need, not a sales pitch.</p>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">What to expect</p>
            <h2 className="sp-section__title">An honest first conversation.</h2>
          </div>
          <p className="pg-prose">Our first call is a structured 30-minute conversation: we listen, ask questions, and tell you what we'd do — even if that's "you don't need us for this." There's no obligation and no awkward sales follow-up. If we're the right partner, we'll both know within that half hour.</p>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">Ready to talk now?</h2>
          <CtaButton label="Connect with a specialist" />
        </div>
      </section>
    </SubpageLayout>
  );
}
