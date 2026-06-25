/* Softfinity — corporate sections: Vision · Approach · ServicesFull · Industries ·
   Principles · SoftwareFactory · Closing.

   Copy is sourced from the email attachments dad sent:
   - "Hero Section + Services Content.docx"
   - "Softfinity Consulting - Your Dream our Reality.docx"
   - "Softfinity Consulting Corporate Overview.docx"
   - "Softfinity Glossary - Concepts and Definitions.docx"
   - "Principles and concepts.docx"
*/

/* ---------- 1. Feature band — sets the tone right after the hero. */
function FeatureBand() {
  return (
    <section className="feature-band" aria-label="Intelligence working with people">
      <div className="feature-band__media">
        <img src="assets/ai-humans.png" alt="" loading="lazy" />
        <div className="feature-band__scrim" />
      </div>
      <div className="feature-band__caption container reveal">
        <p className="eyebrow">A new kind of partnership</p>
        <h2 className="feature-band__title">
          Where intelligence works <em>with</em> people — not over them.
        </h2>
        <p className="feature-band__lead">
          Our consultants embed with your team, blending human judgement with technology
          that earns its keep. Every engagement leaves your people stronger than it found them.
        </p>
      </div>
    </section>
  );
}

/* ---------- 2. Our Vision (from "Your Dream our Reality") */
function Vision() {
  return (
    <section className="section vision" id="vision">
      <div className="container vision__grid">
        <div className="vision__copy">
          <p className="eyebrow reveal">Our vision</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Practical, collaborative, intellectual property–driven solutions to your IT needs.
          </h2>
          <p className="vision__body reveal" style={{ '--d': '120ms' }}>
            SOFTFINITY Consulting is driven by a clear aspiration: to respond to the recurring
            call from our clients for solutions that are <em>actually theirs</em>. Too often,
            clients are overwhelmed by vendors pursuing their own agendas. In reality, the most
            effective solutions require the integration of multiple products, unified through
            a single role-based architecture.
          </p>
          <p className="vision__body reveal" style={{ '--d': '180ms' }}>
            The primary obstacle is the lack of effective collaboration among independent
            software vendors, service providers, and internal project teams. Each party tends
            to view itself as a complete solution provider — rather than as one component
            within a larger, integrated whole.
          </p>
          <p className="vision__body reveal" style={{ '--d': '240ms' }}>
            SOFTFINITY understands this dilemma. Our role is to harness and combine these
            specialised capabilities, supplementing the common elements with our own resources,
            while pooling the collective intellectual property of the alliance for our client's
            ultimate benefit. We call this <strong>Singular Intellectual Property Assimilation</strong>
            {' '}— and it delivers a decisive competitive advantage.
          </p>
          <p className="vision__pull reveal" style={{ '--d': '300ms' }}>
            Our long-term objective: enable clients to implement robust, standards-based
            enterprise architectures that link diverse business units, suppliers, customers,
            and partners — with real-time access to information at the point of service.
          </p>
        </div>
        <figure className="vision__figure reveal" style={{ '--d': '160ms' }}>
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="A cross-functional team collaborating around a laptop"
            loading="lazy"
          />
          <figcaption>Cross-functional IP teams — client, Softfinity consultants, and partner resources, working as one.</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------- 3. Our Consulting Approach (the 9 phases) */
function Approach() {
  const Icon = window.Icon;
  const phases = [
    { n: '01', icon: 'compass', t: 'Strategy & Roadmap Development', b: 'We anchor the journey in your business goals — not the latest vendor cycle.' },
    { n: '02', icon: 'gauge', t: 'Technology Assessment & Selection', b: 'Objective evaluation of options against your risk, budget, and operations.' },
    { n: '03', icon: 'layout-template', t: 'Solution Architecture & Design', b: 'Standards-based, componentised architectures that flex as you grow.' },
    { n: '04', icon: 'route', t: 'Program & Project Delivery', b: 'Senior delivery alongside your team — outcomes measured, not assumed.' },
    { n: '05', icon: 'workflow', t: 'System Integration', b: 'Unifying the alliance: vendors, services, partners — into one whole.' },
    { n: '06', icon: 'database-zap', t: 'Data Migration & Modernisation', b: 'Lifting legacy data into modern platforms safely and without disruption.' },
    { n: '07', icon: 'users-2', t: 'Change Management', b: 'Bringing your people with the work — the most underestimated success factor.' },
    { n: '08', icon: 'graduation-cap', t: 'Knowledge Transfer & Skills Enablement', b: 'Measured as a deliverable. Your team owns what we built, together.' },
    { n: '09', icon: 'life-buoy', t: 'Managed Transformation Support', b: 'Hands-on partnership through the long tail of any complex programme.' },
  ];
  return (
    <section className="section section--alt" id="approach">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Our consulting approach</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Working together to deliver results.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Our consultants integrate seamlessly with your teams to provide expertise where
            and when it is needed most. We partner with you throughout the entire transformation
            journey — combining our consultants, our IP, and your people into one delivery unit.
          </p>
        </div>
        <ol className="phases">
          {phases.map((p, i) => (
            <li className="phase reveal" key={p.n} style={{ '--d': (i * 60) + 'ms' }}>
              <div className="phase__num">{p.n}</div>
              <div className="phase__icon"><Icon name={p.icon} size={20} /></div>
              <div className="phase__body">
                <h3 className="phase__title">{p.t}</h3>
                <p className="phase__copy">{p.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 4. Services — full catalogue with sub-areas, per dad's doc */
function ServicesFull() {
  const { Card } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  const services = [
    {
      slug: 'sap', icon: 'box', tag: 'SAP',
      title: 'SAP Consulting Services',
      lead: 'Transform and optimise enterprise operations across the SAP ecosystem.',
      items: ['SAP S/4HANA', 'SAP ECC', 'SAP Finance', 'SAP Supply Chain', 'SAP SuccessFactors', 'SAP Analytics', 'SAP Integration', 'Migrations & Upgrades', 'SAP Cloud Solutions'],
    },
    {
      slug: 'microsoft', icon: 'square-stack', tag: 'Microsoft',
      title: 'Microsoft Consulting Services',
      lead: 'Drive productivity, collaboration, and automation across the Microsoft ecosystem.',
      items: ['Microsoft Azure', 'Microsoft 365', 'Dynamics 365', 'Power Platform', 'Power BI', 'SharePoint', 'Teams', 'Enterprise Security', 'Application Modernisation'],
    },
    {
      slug: 'oracle', icon: 'database', tag: 'Oracle',
      title: 'Oracle Consulting Services',
      lead: 'Enable enterprise performance and operational excellence with Oracle technologies.',
      items: ['Oracle Cloud Infrastructure', 'Oracle ERP', 'Oracle HCM', 'Oracle Database', 'Oracle Analytics', 'Oracle Integration', 'Performance Optimisation', 'Migrations'],
    },
    {
      slug: 'ibm', icon: 'server', tag: 'IBM',
      title: 'IBM Consulting Services',
      lead: 'Enterprise-grade technologies for innovation, resilience, and transformation.',
      items: ['IBM Cloud', 'IBM Integration Solutions', 'IBM Automation', 'IBM Data Platforms', 'IBM Security', 'IBM Middleware', 'Enterprise Integration'],
    },
    {
      slug: 'ai', icon: 'sparkles', tag: 'AI',
      title: 'Artificial Intelligence',
      lead: 'Turn data into intelligence and intelligence into business value.',
      items: ['AI Strategy Development', 'Machine Learning Solutions', 'Predictive Analytics', 'Generative AI', 'Intelligent Automation', 'Natural Language Processing', 'AI Governance', 'AI Integration'],
    },
    {
      slug: 'cloud', icon: 'cloud', tag: 'Cloud',
      title: 'Cloud Computing',
      lead: 'Accelerate innovation with secure, scalable, cost-effective cloud solutions.',
      items: ['Cloud Strategy & Assessment', 'Cloud Migration', 'Hybrid Cloud', 'Multi-Cloud Architecture', 'Cloud Security', 'Cloud Governance', 'Infrastructure Modernisation', 'Cloud Operations'],
    },
    {
      slug: 'data', icon: 'bar-chart-3', tag: 'Data',
      title: 'Big Data & Analytics',
      lead: 'Turn data into actionable business insights — faster, smarter, more informed.',
      items: ['Data Strategy', 'Data Architecture', 'Data Warehousing', 'Data Lakes', 'Advanced Analytics', 'Business Intelligence', 'Real-Time Data Processing', 'Data Governance'],
    },
    {
      slug: 'blockchain', icon: 'link', tag: 'Blockchain',
      title: 'Blockchain Solutions',
      lead: 'Build trust, transparency, and security into digital business processes.',
      items: ['Blockchain Strategy', 'Distributed Ledger Solutions', 'Smart Contracts', 'Digital Identity', 'Supply Chain Traceability', 'Asset Tokenisation', 'Blockchain Integration'],
    },
    {
      slug: 'mobile', icon: 'smartphone', tag: 'Mobile',
      title: 'Mobile Application Development',
      lead: 'Engaging digital experiences across iOS, Android, and cross-platform.',
      items: ['Native Android', 'Native iOS', 'Cross-Platform', 'Mobile Security', 'UX/UI Design', 'API Integration', 'Mobile Modernisation', 'App Maintenance & Support'],
    },
  ];
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
          {services.map((s, i) => (
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

/* ---------- 5. Industries we serve */
function Industries() {
  const Icon = window.Icon;
  const industries = [
    { icon: 'landmark', name: 'Financial Services' },
    { icon: 'shield', name: 'Insurance' },
    { icon: 'stethoscope', name: 'Healthcare' },
    { icon: 'radio-tower', name: 'Telecommunications & Media' },
    { icon: 'shopping-bag', name: 'Retail & FMCG' },
    { icon: 'factory', name: 'Manufacturing' },
    { icon: 'building-2', name: 'Government' },
    { icon: 'zap', name: 'Energy & Utilities' },
    { icon: 'truck', name: 'Transportation & Logistics' },
    { icon: 'graduation-cap', name: 'Education' },
    { icon: 'briefcase', name: 'Professional Services' },
  ];
  return (
    <section className="section section--center" id="industries">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Industries we serve</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Cross-industry experience. Practical business knowledge.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Our consultants combine deep technical expertise with hands-on experience across
            multiple industries — bringing proven practices, fresh perspectives, and
            innovative solutions to every engagement.
          </p>
        </div>
        <div className="industries-grid reveal" style={{ '--d': '180ms' }}>
          {industries.map((it) => (
            <div className="industry" key={it.name}>
              <span className="industry__icon"><Icon name={it.icon} size={20} /></span>
              <span className="industry__name">{it.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Principles & Concepts — MCIP, IPVF, SIPA, Translucent + ienrichment, Nextelligence */
function Principles() {
  const { Card } = window.PolarisDesignSystem_ff4f72;
  const Icon = window.Icon;
  const concepts = [
    {
      icon: 'layers-3', tag: 'MCIP',
      title: 'Massed Core Intellectual Property',
      body: 'The undifferentiated mass of intellectual property and information available to execute on any client project — drawn from Softfinity, our partners, our clients, and the market. The core grows with every engagement.',
    },
    {
      icon: 'cloud-fog', tag: 'IPVF',
      title: 'Intellectual Property Vapour Fusion',
      body: 'The methodologies, best practices, and mechanisms we use to capture derived IP and fuse it back into the Massed Core — enriching it further with every project.',
    },
    {
      icon: 'target', tag: 'SIPA',
      title: 'Singular Intellectual Property Assimilation',
      body: 'The methodologies we use to extract unique IP from the Massed Core and assimilate it into a particular client engagement. Works in tandem with ienrichment to deliver competitive advantage.',
    },
    {
      icon: 'eye', tag: 'Translucent',
      title: 'Translucent Engagement Model',
      body: 'Non-hierarchical, cross-functional teams composed of client representatives, Softfinity consultants, and partner resources — focused, cross-pollinated, infused with the IP each engagement requires.',
    },
  ];
  const supportingTerms = [
    { term: 'ienrichment', body: 'Intellectual Property Enrichment — a methodology in which IP, either as part of an overall solution or embedded in our consultants and partners, is blended into the execution of every client engagement, tailored to its unique needs.' },
    { term: 'Nextelligence', body: 'The cognitive application of derivative intellectual property — the leap from raw knowledge to actionable, contextual insight that compounds across engagements.' },
  ];
  return (
    <section className="section section--alt" id="principles">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow reveal">Our principles &amp; concepts</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            Methodologies that turn knowledge into a deliverable.
          </h2>
          <p className="section__lead reveal" style={{ '--d': '120ms' }}>
            Our consultants embody a unique blend of entrepreneurial spirit and pioneering
            concepts. MCIP, IPVF, and SIPA aren't slogans — they're the operating system
            behind every engagement, ensuring knowledge and skills transfer is a tangible,
            measured deliverable.
          </p>
        </div>

        <div className="principles__grid">
          <figure className="principles__figure reveal" style={{ '--d': '180ms' }}>
            <img src="assets/unrivalled-principles.jpg" alt="Unrivalled principles and concepts diagram" loading="lazy" />
            <figcaption>An unrivalled set of principles and concepts — refined across three decades of engagements.</figcaption>
          </figure>
          <div className="concept-list">
            {concepts.map((c, i) => (
              <Card key={c.tag} padding="lg" className="concept reveal" style={{ '--d': (240 + i * 70) + 'ms', textAlign: 'left' }}>
                <div className="concept__head">
                  <span className="feature__icon"><Icon name={c.icon} size={22} /></span>
                  <span className="concept__tag">{c.tag}</span>
                </div>
                <h3 className="feature__title">{c.title}</h3>
                <p className="feature__body">{c.body}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="principles__supporting">
          {supportingTerms.map((t, i) => (
            <div className="supporting reveal" key={t.term} style={{ '--d': (600 + i * 70) + 'ms' }}>
              <h4 className="supporting__term">{t.term}</h4>
              <p className="supporting__body">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Software Factory & Solutions Centre */
function SoftwareFactory() {
  const Icon = window.Icon;
  const capabilities = [
    { icon: 'cpu', t: 'Standards-based engineering' },
    { icon: 'shuffle', t: 'Componentised, portable architectures' },
    { icon: 'rocket', t: 'Accelerated time-to-market' },
    { icon: 'shield-check', t: 'Built-in governance &amp; security' },
  ];
  return (
    <section className="section sf" id="software-factory">
      <div className="container sf__grid">
        <figure className="sf__figure reveal">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="A modern, well-lit collaborative workspace"
            loading="lazy"
          />
        </figure>
        <div className="sf__copy">
          <p className="eyebrow reveal">Software Factory &amp; Solutions Centre</p>
          <h2 className="section__title reveal" style={{ '--d': '60ms' }}>
            The innovation engine behind every Softfinity engagement.
          </h2>
          <p className="sf__lead reveal" style={{ '--d': '120ms' }}>
            Our dedicated Software Factory and Solutions Centre is where we design, build, and
            deliver scalable, standards-based enterprise solutions — supporting digital
            transformation and accelerating time-to-market for our clients.
          </p>
          <ul className="sf__capabilities reveal" style={{ '--d': '180ms' }}>
            {capabilities.map((c) => (
              <li key={c.t}>
                <span className="sf__capability-icon"><Icon name={c.icon} size={18} /></span>
                <span dangerouslySetInnerHTML={{ __html: c.t }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Closing statement — the promise */
function Closing() {
  return (
    <section className="section section--center closing" id="closing">
      <div
        className="closing__bg"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(11,11,18,0.86), rgba(11,11,18,0.92)), url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1800&q=80')" }}
      />
      <div className="container-narrow closing__inner">
        <p className="eyebrow reveal">Your trusted technology partner</p>
        <h2 className="section__statement reveal" style={{ '--d': '60ms' }}>
          Whatever your technology landscape,<br />
          our focus remains the same.
        </h2>
        <p className="closing__lead reveal" style={{ '--d': '140ms' }}>
          Independent expertise across leading enterprise platforms and emerging technologies.
          Experienced consultants, deep industry knowledge, and a collaborative delivery model
          — combined to help organisations navigate complexity, reduce risk, and achieve
          meaningful business results that create <em>lasting value</em>.
        </p>
      </div>
    </section>
  );
}

Object.assign(window, {
  FeatureBand, Vision, Approach, ServicesFull, Industries, Principles, SoftwareFactory, Closing,
});
