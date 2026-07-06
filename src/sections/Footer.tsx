import { Link } from 'react-router-dom';

export default function Footer() {
  const cols = [
    { h: 'Company', items: [
      { label: 'Who we are',   to: '/about' },
      { label: 'Our approach', to: '/approach' },
      { label: 'Principles',   to: '/principles' },
      { label: 'Industries',   to: '/industries' },
      { label: 'Consultants',  to: '/consultants' },
      { label: 'Case studies', to: '/case-studies' },
    ]},
    { h: 'Software', items: [
      { label: 'SAP',       to: '/services/sap' },
      { label: 'Microsoft', to: '/services/microsoft' },
      { label: 'Oracle',    to: '/services/oracle' },
      { label: 'IBM',       to: '/services/ibm' },
    ]},
    { h: 'Technology', items: [
      { label: 'AI',         to: '/services/ai' },
      { label: 'Cloud',      to: '/services/cloud' },
      { label: 'Big Data',   to: '/services/data' },
      { label: 'Blockchain', to: '/services/blockchain' },
      { label: 'Mobile',     to: '/services/mobile' },
    ]},
  ];
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting" width="780" height="200" />
          <p className="site-footer__credentials">Est. 1996 · 30 years in practice<br />Independent · Vendor-agnostic</p>
        </div>
        <div className="site-footer__cols">
          {cols.map((c) => (
            <div key={c.h} className="site-footer__col">
              <h4>{c.h}</h4>
              <ul>
                {c.items.map((it) => (
                  <li key={it.label}>
                    <Link to={it.to}>{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container site-footer__base">
        <span>© 2026 Softfinity Consulting (Pty) Ltd. Business &amp; technology consulting and systems integration.</span>
        <span>Technology-agnostic. Business-focused.</span>
      </div>
    </footer>
  );
}
