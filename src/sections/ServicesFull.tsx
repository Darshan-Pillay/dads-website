import { Card } from '../ds.tsx';
import { Icon } from '../icons.tsx';

const SERVICES = [
  { slug: 'sap',        icon: 'box',          tag: 'SAP',         title: 'SAP Consulting Services',         lead: 'Optimise enterprise operations across the full SAP platform, from migrations to day-to-day performance.',         items: ['SAP S/4HANA','SAP ECC','SAP Finance','SAP Supply Chain','SAP SuccessFactors','SAP Analytics','SAP Integration','Migrations & Upgrades','SAP Cloud Solutions'] },
  { slug: 'microsoft',  icon: 'square-stack', tag: 'Microsoft',   title: 'Microsoft Consulting Services',   lead: 'Get the most from the Microsoft platform: productivity, collaboration, and automation working together.', items: ['Microsoft Azure','Microsoft 365','Dynamics 365','Power Platform','Power BI','SharePoint','Teams','Enterprise Security','Application Modernisation'] },
  { slug: 'oracle',     icon: 'database',     tag: 'Oracle',      title: 'Oracle Consulting Services',      lead: 'Run Oracle technologies at full capability: performance, integration, and enterprise-grade reliability.', items: ['Oracle Cloud Infrastructure','Oracle ERP','Oracle HCM','Oracle Database','Oracle Analytics','Oracle Integration','Performance Optimisation','Migrations'] },
  { slug: 'ibm',        icon: 'server',       tag: 'IBM',         title: 'IBM Consulting Services',         lead: "IBM's enterprise stack, implemented and integrated by consultants who know it well.",     items: ['IBM Cloud','IBM Integration Solutions','IBM Automation','IBM Data Platforms','IBM Security','IBM Middleware','Enterprise Integration'] },
  { slug: 'ai',         icon: 'sparkles',     tag: 'AI',          title: 'Artificial Intelligence',          lead: 'Turn data into intelligence and intelligence into business decisions.',                 items: ['AI Strategy Development','Machine Learning Solutions','Predictive Analytics','Generative AI','Intelligent Automation','Natural Language Processing','AI Governance','AI Integration'] },
  { slug: 'cloud',      icon: 'cloud',        tag: 'Cloud',       title: 'Cloud Computing',                  lead: 'Move to the cloud with confidence: secure, cost-managed, and built to hold up over time.',      items: ['Cloud Strategy & Assessment','Cloud Migration','Hybrid Cloud','Multi-Cloud Architecture','Cloud Security','Cloud Governance','Infrastructure Modernisation','Cloud Operations'] },
  { slug: 'data',       icon: 'bar-chart-3',  tag: 'Data',        title: 'Big Data & Analytics',             lead: 'Turn data into business decisions: the right architecture, the right governance, the right results.',     items: ['Data Strategy','Data Architecture','Data Warehousing','Data Lakes','Advanced Analytics','Business Intelligence','Real-Time Data Processing','Data Governance'] },
  { slug: 'blockchain', icon: 'link',         tag: 'Blockchain',  title: 'Blockchain Solutions',             lead: 'Add trust and traceability to your digital processes: distributed, auditable, and built for the long run.',          items: ['Blockchain Strategy','Distributed Ledger Solutions','Smart Contracts','Digital Identity','Supply Chain Traceability','Asset Tokenisation','Blockchain Integration'] },
  { slug: 'mobile',     icon: 'smartphone',   tag: 'Mobile',      title: 'Mobile Application Development',   lead: 'Native and cross-platform apps built to work: iOS, Android, and everything in between.',             items: ['Native Android','Native iOS','Cross-Platform','Mobile Security','UX/UI Design','API Integration','Mobile Modernisation','App Maintenance & Support'] },
];

export default function ServicesFull() {
  return (
    <section className="section" id="what-we-do">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Technology expertise</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Hands-on expertise across enterprise platforms and newer technologies.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Modernising core systems, moving to cloud, or putting data and AI to work:
            our consultants bring the knowledge, objectivity, and hands-on experience
            to get it done.
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
