import { Card } from '../ds.tsx';
import { Icon } from '../icons.tsx';

const SERVICES = [
  { slug: 'sap',        icon: 'box',          tag: 'SAP',         title: 'SAP Consulting Services',         lead: 'Transform and optimise enterprise operations across the SAP ecosystem.',         items: ['SAP S/4HANA','SAP ECC','SAP Finance','SAP Supply Chain','SAP SuccessFactors','SAP Analytics','SAP Integration','Migrations & Upgrades','SAP Cloud Solutions'] },
  { slug: 'microsoft',  icon: 'square-stack', tag: 'Microsoft',   title: 'Microsoft Consulting Services',   lead: 'Drive productivity, collaboration, and automation across the Microsoft ecosystem.', items: ['Microsoft Azure','Microsoft 365','Dynamics 365','Power Platform','Power BI','SharePoint','Teams','Enterprise Security','Application Modernisation'] },
  { slug: 'oracle',     icon: 'database',     tag: 'Oracle',      title: 'Oracle Consulting Services',      lead: 'Enable enterprise performance and operational excellence with Oracle technologies.', items: ['Oracle Cloud Infrastructure','Oracle ERP','Oracle HCM','Oracle Database','Oracle Analytics','Oracle Integration','Performance Optimisation','Migrations'] },
  { slug: 'ibm',        icon: 'server',       tag: 'IBM',         title: 'IBM Consulting Services',         lead: 'Enterprise-grade technologies for innovation, resilience, and transformation.',     items: ['IBM Cloud','IBM Integration Solutions','IBM Automation','IBM Data Platforms','IBM Security','IBM Middleware','Enterprise Integration'] },
  { slug: 'ai',         icon: 'sparkles',     tag: 'AI',          title: 'Artificial Intelligence',          lead: 'Turn data into intelligence and intelligence into business value.',                 items: ['AI Strategy Development','Machine Learning Solutions','Predictive Analytics','Generative AI','Intelligent Automation','Natural Language Processing','AI Governance','AI Integration'] },
  { slug: 'cloud',      icon: 'cloud',        tag: 'Cloud',       title: 'Cloud Computing',                  lead: 'Accelerate innovation with secure, scalable, cost-effective cloud solutions.',      items: ['Cloud Strategy & Assessment','Cloud Migration','Hybrid Cloud','Multi-Cloud Architecture','Cloud Security','Cloud Governance','Infrastructure Modernisation','Cloud Operations'] },
  { slug: 'data',       icon: 'bar-chart-3',  tag: 'Data',        title: 'Big Data & Analytics',             lead: 'Turn data into actionable business insights — faster, smarter, more informed.',     items: ['Data Strategy','Data Architecture','Data Warehousing','Data Lakes','Advanced Analytics','Business Intelligence','Real-Time Data Processing','Data Governance'] },
  { slug: 'blockchain', icon: 'link',         tag: 'Blockchain',  title: 'Blockchain Solutions',             lead: 'Build trust, transparency, and security into digital business processes.',          items: ['Blockchain Strategy','Distributed Ledger Solutions','Smart Contracts','Digital Identity','Supply Chain Traceability','Asset Tokenisation','Blockchain Integration'] },
  { slug: 'mobile',     icon: 'smartphone',   tag: 'Mobile',      title: 'Mobile Application Development',   lead: 'Engaging digital experiences across iOS, Android, and cross-platform.',             items: ['Native Android','Native iOS','Cross-Platform','Mobile Security','UX/UI Design','API Integration','Mobile Modernisation','App Maintenance & Support'] },
];

export default function ServicesFull() {
  return (
    <section className="section" id="what-we-do">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Technology expertise</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Deep expertise across leading enterprise platforms and emerging technologies.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Whether you're modernising core systems, adopting cloud, leveraging data and AI,
            or running a large-scale digital transformation — our consultants bring the
            expertise, objectivity, and practical experience needed to deliver results.
          </p>
        </div>
        <div className="service-grid">
          {SERVICES.map((s, i) => (
            <Card key={s.tag} padding="lg" className="service reveal" style={{ '--d': (i * 50) + 'ms', textAlign: 'left' }}>
              <div className="service__head">
                <span className="feature__icon"><Icon name={s.icon} size={22} /></span>
                <span className="service__tag">{s.tag}</span>
              </div>
              <h3 className="service__title">{s.title}</h3>
              <p className="service__lead">{s.lead}</p>
              <ul className="service__items">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <a className="service__link" href={`services/${s.slug}.html`}>
                Explore {s.tag} services
                <Icon name="arrow-right" size={16} />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
