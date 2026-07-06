import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/SubpageLayout.tsx';
import { useContactModal } from '../../components/ContactModalContext.tsx';
import type { ServicePageData } from '../../types.ts';
import { SERVICES } from '../../data/services.ts';

const APPROACH_STEPS = [
  'Strategy & Roadmap Development',
  'Technology Assessment & Selection',
  'Solution Architecture & Design',
  'Programme & Project Delivery',
  'System Integration',
  'Data Migration & Modernisation',
  'Change Management',
  'Knowledge Transfer & Skills Enablement',
  'Managed Transformation Support',
];

interface Props {
  data: ServicePageData;
}

function CtaButton() {
  const { openModal } = useContactModal();
  return (
    <button className="sp-cta__btn" type="button" onClick={openModal}>
      Connect with a specialist
    </button>
  );
}

export default function ServicePage({ data }: Props) {
  useEffect(() => {
    document.title = data.pageTitle;
  }, [data.pageTitle]);

  const others = SERVICES.filter(s => s.slug !== data.slug).slice(0, 4);

  return (
    <SubpageLayout backLabel="← All services" backHref="/#what-we-do">
      <section className="sp-hero">
        <div className="container">
          <p className="sp-hero__crumb">
            <Link to="/">Softfinity</Link>
            {'  /  '}
            <Link to="/#what-we-do">Services</Link>
            {'  /  '}
            {data.tag}
          </p>
          <div className="sp-hero__head">
            <span className="sp-hero__tag">{data.tag}</span>
          </div>
          <h1 className="sp-hero__title">{data.title}</h1>
          <p className="sp-hero__lead">{data.lead}</p>
          <div className="sp-hero__media">
            <img src={data.heroImage} alt="" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">{data.areasEyebrow}</p>
            <h2 className="sp-section__title">What we cover.</h2>
          </div>
          <ul className="sp-areas">
            {data.areas.map(area => <li key={area}>{area}</li>)}
          </ul>
          <p className="sp-section__lead">{data.areasLead}</p>
        </div>
      </section>

      <section className="sp-section">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">Outcomes you can expect</p>
            <h2 className="sp-section__title">What &ldquo;done&rdquo; looks like.</h2>
          </div>
          <div className="sp-outcomes">
            {data.outcomes.map(o => (
              <div className="sp-outcome" key={o.num}>
                <div className="sp-outcome__num">{o.num}</div>
                <h3 className="sp-outcome__title">{o.title}</h3>
                <p className="sp-outcome__body">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section sp-section--alt">
        <div className="container">
          <div className="sp-section__head">
            <p className="eyebrow">How we work together</p>
            <h2 className="sp-section__title">The 9-phase engagement.</h2>
            <p className="sp-section__lead">{data.approachLead}</p>
          </div>
          <ol className="sp-approach">
            {APPROACH_STEPS.map(step => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </section>

      <section className="sp-cta">
        <div className="container-narrow">
          <h2 className="sp-cta__title">
            Ready to explore <span className="gold">{data.tag}</span> with an independent partner?
          </h2>
          <CtaButton />
        </div>
      </section>

      <section className="sp-other">
        <div className="container">
          <div className="sp-other__head">
            <h2 className="sp-other__title">Other technology services</h2>
            <Link className="sp-other__all" to="/#what-we-do">View all services &nbsp;→</Link>
          </div>
          <div className="sp-other__grid">
            {others.map(s => (
              <Link className="sp-other__card" to={`/services/${s.slug}`} key={s.slug}>
                <span className="tag">{s.tag}</span>
                <span className="name">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
