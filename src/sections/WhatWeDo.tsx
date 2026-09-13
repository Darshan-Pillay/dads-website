import { Tag } from '../ds.tsx';
import type { Tweaks } from '../types.ts';

const DOMAINS = [
  { name: 'SAP', out: 'S/4HANA · Finance · Supply Chain · SuccessFactors · Analytics · Migration' },
  { name: 'Microsoft', out: 'Azure · M365 · Dynamics 365 · Power Platform · SharePoint · Security' },
  { name: 'Oracle', out: 'OCI · ERP · HCM · Database · Analytics · Integration · Migrations' },
  { name: 'IBM', out: 'Cloud · Integration · Automation · Data platforms · Security · Middleware' },
  { name: 'Artificial Intelligence', out: 'Strategy · ML · Generative AI · NLP · Governance · Integration' },
  { name: 'Cloud Computing', out: 'Strategy · Migration · Hybrid · Multi-cloud · Security · Operations' },
  { name: 'Big Data & Analytics', out: 'Strategy · Architecture · Warehousing · Lakes · BI · Governance' },
  { name: 'Blockchain', out: 'Strategy · Distributed ledger · Smart contracts · Tokenisation · Identity' },
  { name: 'Mobile Development', out: 'Native iOS · Native Android · Cross-platform · Security · UX/UI' },
];

export default function WhatWeDo({ t }: { t: Tweaks }) {
  const layout = t.whatWeDo;
  return (
    <section className="section section--alt" id="what-we-do">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">What we do</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Hands-on expertise across enterprise platforms and newer technologies.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Modernising core systems, moving to cloud, or putting data and AI to work:
            our consultants bring the knowledge, objectivity, and hands-on experience
            to get it done.
          </p>
        </div>

        {layout === 'grid' && (
          <div className="domain-grid">
            {DOMAINS.map((d, i) => (
              <div className="domain reveal" key={d.name} style={{ '--d': (i * 50) + 'ms' }}>
                <h3 className="domain__name">{d.name}</h3>
                <p className="domain__out">{d.out}</p>
              </div>
            ))}
          </div>
        )}

        {layout === 'index' && (
          <ol className="idxlist reveal">
            {DOMAINS.map((d, i) => (
              <li key={d.name}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>{d.name}</span>
                <span className="o">{d.out}</span>
              </li>
            ))}
          </ol>
        )}

        {layout === 'tags' && (
          <div className="domains reveal">
            {DOMAINS.map((d) => (<Tag key={d.name}>{d.name}</Tag>))}
          </div>
        )}
      </div>
    </section>
  );
}
