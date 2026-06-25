export default function Footer() {
  const cols = [
    { h: 'Services', items: [
      { label: 'SAP',        href: 'services/sap.html' },
      { label: 'Microsoft',  href: 'services/microsoft.html' },
      { label: 'Oracle',     href: 'services/oracle.html' },
      { label: 'IBM',        href: 'services/ibm.html' },
      { label: 'AI',         href: 'services/ai.html' },
      { label: 'Cloud',      href: 'services/cloud.html' },
      { label: 'Big Data',   href: 'services/data.html' },
      { label: 'Blockchain', href: 'services/blockchain.html' },
      { label: 'Mobile',     href: 'services/mobile.html' },
    ]},
    { h: 'Company', items: [
      { label: 'Who we are',   href: 'pages/about.html' },
      { label: 'Our approach', href: 'pages/approach.html' },
      { label: 'Principles',   href: 'pages/principles.html' },
      { label: 'Industries',   href: 'pages/industries.html' },
      { label: 'Consultants',  href: 'pages/consultants.html' },
      { label: 'Case studies', href: 'pages/case-studies.html' },
    ]},
    { h: 'Connect', items: [
      { label: 'Contact',  href: 'pages/contact.html' },
      { label: 'Insights', href: 'pages/insights.html' },
      { label: 'Email',    href: 'mailto:hello@softfinity.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/', target: '_blank', rel: 'noopener' },
    ]},
  ];
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <img src="assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting" width="780" height="200" />
          <p>Independent advice. Trusted expertise. Proven outcomes.</p>
        </div>
        <div className="site-footer__cols">
          {cols.map((c) => (
            <div key={c.h} className="site-footer__col">
              <h4>{c.h}</h4>
              <ul>
                {c.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} {...(it.target ? { target: it.target, rel: it.rel } : {})}>
                      {it.label}
                    </a>
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
