#!/usr/bin/env python3
"""Generate the 9 service detail pages from a single template + per-service data.

Run from the project root:  python3 services/_generate.py
Idempotent — overwrites the page files in services/.

Content sourced from dad's "Hero Section + Services Content.docx" with the
9 detailed service sections.
"""
from pathlib import Path
import html

OUT = Path(__file__).resolve().parent

# ---------- design system + main site CSS (loaded relative to /services/) ----------
DS = "_ds/polaris-design-system-ff4f726e-aab1-4c1d-81b4-8d99d607ad69"
STYLES = "\n".join([
    f'  <link rel="stylesheet" href="../{DS}/tokens/fonts.css">',
    f'  <link rel="stylesheet" href="../{DS}/tokens/colors.css">',
    f'  <link rel="stylesheet" href="../{DS}/tokens/typography.css">',
    f'  <link rel="stylesheet" href="../{DS}/tokens/spacing.css">',
    f'  <link rel="stylesheet" href="../{DS}/tokens/effects.css">',
    f'  <link rel="stylesheet" href="../{DS}/tokens/base.css">',
    f'  <link rel="stylesheet" href="../{DS}/styles.css">',
    '  <link rel="stylesheet" href="../polaris/site.css">',
    '  <link rel="stylesheet" href="service-page.css">',
])

# ---------- per-service data ----------
SERVICES = [
    {
        "slug": "sap",
        "tag": "SAP",
        "title": "SAP Consulting Services",
        "lead": (
            "Transform and optimise enterprise operations with expert SAP consulting. "
            "Our specialists help organisations streamline business processes, improve "
            "operational efficiency, and maximise return on investment across the SAP ecosystem."
        ),
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Areas of expertise",
        "areas": [
            "SAP S/4HANA", "SAP ECC", "SAP Finance", "SAP Supply Chain",
            "SAP SuccessFactors", "SAP Analytics", "SAP Integration",
            "SAP Migration & Upgrades", "SAP Cloud Solutions",
        ],
        "closer": "We help organisations modernise ERP environments while ensuring business continuity and long-term scalability.",
        "outcomes": [
            ("ERP that fits", "Modernise core systems without forcing your business to twist around the platform."),
            ("Lower TCO", "Right-size licensing, modules, and infrastructure — pay for what you actually use."),
            ("Continuity first", "Migration and upgrade paths that protect operational continuity end-to-end."),
        ],
    },
    {
        "slug": "microsoft",
        "tag": "Microsoft",
        "title": "Microsoft Consulting Services",
        "lead": (
            "Leverage the power of the Microsoft ecosystem to drive productivity, "
            "collaboration, automation, and digital transformation. Our consultants assist "
            "organisations in designing, implementing, and optimising Microsoft-based solutions."
        ),
        "image": "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Areas of expertise",
        "areas": [
            "Microsoft Azure", "Microsoft 365", "Dynamics 365", "Power Platform",
            "Power BI", "SharePoint", "Teams", "Enterprise Security",
            "Application Modernisation",
        ],
        "closer": "We help businesses unlock greater value from their Microsoft investments through practical, scalable solutions.",
        "outcomes": [
            ("Productivity, raised", "Modern collaboration that your people actually adopt — not another tool they ignore."),
            ("Cloud done right", "Azure architectures that scale with you, with cost control built in from day one."),
            ("Automation that earns", "Power Platform workflows tied to measurable business outcomes — no shelfware."),
        ],
    },
    {
        "slug": "oracle",
        "tag": "Oracle",
        "title": "Oracle Consulting Services",
        "lead": (
            "Enable enterprise performance and operational excellence with Oracle technologies. "
            "Our Oracle specialists support organisations in implementing and optimising solutions "
            "that improve financial management, operational efficiency, and business intelligence."
        ),
        "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Areas of expertise",
        "areas": [
            "Oracle Cloud Infrastructure", "Oracle ERP", "Oracle HCM", "Oracle Database",
            "Oracle Analytics", "Oracle Integration", "Oracle Performance Optimisation",
            "Oracle Migrations",
        ],
        "closer": "Our expertise helps organisations maximise the value of their Oracle investments while supporting future growth.",
        "outcomes": [
            ("Finance, modernised", "Oracle ERP and HCM deployments aligned with how your finance and HR teams actually work."),
            ("Performance you can feel", "Database and infrastructure tuning that turns slow systems into competitive advantage."),
            ("Smooth migrations", "Lift-and-shift or re-platform — with continuity, governance, and roll-back planned in."),
        ],
    },
    {
        "slug": "ibm",
        "tag": "IBM",
        "title": "IBM Consulting Services",
        "lead": (
            "Harness enterprise-grade technologies to support innovation, resilience, and "
            "digital transformation. Our consultants bring extensive experience across IBM "
            "solutions that help organisations manage complex business and technology environments."
        ),
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Areas of expertise",
        "areas": [
            "IBM Cloud", "IBM Integration Solutions", "IBM Automation",
            "IBM Data Platforms", "IBM Security Solutions", "IBM Middleware",
            "Enterprise Integration",
        ],
        "closer": "We help clients modernise legacy environments and build scalable, future-ready technology ecosystems.",
        "outcomes": [
            ("Integrate without rip-and-replace", "Make heterogeneous estates speak the same language — without an 18-month re-platform."),
            ("Resilient by design", "Architectures and security postures that absorb shocks instead of cascading them."),
            ("Modernise legacy, safely", "Stage modernisation so risk drops at every step — not all at the end."),
        ],
    },
    {
        "slug": "ai",
        "tag": "AI",
        "title": "Artificial Intelligence",
        "lead": (
            "Transform data into intelligence and intelligence into business value. AI is "
            "rapidly changing how organisations operate, make decisions, and engage with "
            "customers. Our consultants help businesses identify, design, and implement AI "
            "solutions that deliver measurable results."
        ),
        "image": "../assets/ai-humans.jpg",
        "areas_title": "AI services",
        "areas": [
            "AI Strategy Development", "Machine Learning Solutions", "Predictive Analytics",
            "Generative AI", "Intelligent Automation", "Natural Language Processing",
            "AI Governance", "AI Integration",
        ],
        "closer": "We help organisations adopt AI responsibly while maximising business impact and competitive advantage.",
        "outcomes": [
            ("Hype, separated from substance", "An honest read on what AI can do for you today — and what it can't, yet."),
            ("Production over pilots", "AI that ships into real workflows with monitoring, governance, and ROI tracked."),
            ("Adoption, not just deployment", "We bring your people with the work so the model doesn't become a science project."),
        ],
    },
    {
        "slug": "cloud",
        "tag": "Cloud",
        "title": "Cloud Computing",
        "lead": (
            "Accelerate innovation with secure, scalable, cost-effective cloud solutions. "
            "Cloud technologies enable organisations to improve agility, optimise costs, and "
            "rapidly respond to changing business requirements."
        ),
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Cloud services",
        "areas": [
            "Cloud Strategy & Assessment", "Cloud Migration", "Hybrid Cloud Solutions",
            "Multi-Cloud Architecture", "Cloud Security", "Cloud Governance",
            "Infrastructure Modernisation", "Cloud Operations",
        ],
        "closer": "Our cloud experts help organisations build resilient platforms that support growth and innovation.",
        "outcomes": [
            ("Right-sized, not oversold", "Stop paying for unused modules and over-provisioned instances. We map every dollar."),
            ("Portable by design", "Architectures that can leave any one provider — your insurance policy against lock-in."),
            ("Operationally sound", "FinOps, observability, and security baked in from week one — not bolted on later."),
        ],
    },
    {
        "slug": "data",
        "tag": "Data",
        "title": "Big Data & Analytics",
        "lead": (
            "Turn data into actionable business insights. Organisations generate vast amounts "
            "of data every day. Our consultants help clients unlock the value of that data "
            "through advanced analytics, modern data platforms, and intelligent reporting solutions."
        ),
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Big data services",
        "areas": [
            "Data Strategy", "Data Architecture", "Data Warehousing", "Data Lakes",
            "Advanced Analytics", "Business Intelligence", "Real-Time Data Processing",
            "Data Governance",
        ],
        "closer": "We enable organisations to make faster, smarter, and more informed decisions.",
        "outcomes": [
            ("Decisions you can trust", "Data quality, lineage, and governance that make the dashboard a tool, not a debate."),
            ("Best DB for the workload", "We pick the right engine — SQL, NoSQL, columnar, graph — for the actual question."),
            ("From hindsight to foresight", "Move from rear-view reporting to predictive analytics that change how you operate."),
        ],
    },
    {
        "slug": "blockchain",
        "tag": "Blockchain",
        "title": "Blockchain Solutions",
        "lead": (
            "Build trust, transparency, and security into digital business processes. "
            "Blockchain technology offers opportunities to improve traceability, security, "
            "and operational efficiency across industries."
        ),
        "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Blockchain services",
        "areas": [
            "Blockchain Strategy", "Distributed Ledger Solutions", "Smart Contracts",
            "Digital Identity Solutions", "Supply Chain Traceability", "Asset Tokenisation",
            "Blockchain Integration",
        ],
        "closer": "Our experts help organisations evaluate and implement blockchain solutions that deliver practical business value.",
        "outcomes": [
            ("Use it when it earns its place", "Honest assessment of whether blockchain is the right tool — and the courage to say no."),
            ("Traceability you can prove", "Provenance, audit, and supply-chain integrity that holds up to regulator scrutiny."),
            ("Identity and contracts", "Digital identity and smart contracts that automate real business processes — not whitepapers."),
        ],
    },
    {
        "slug": "mobile",
        "tag": "Mobile",
        "title": "Mobile Application Development",
        "lead": (
            "Create engaging digital experiences across mobile platforms. Today's customers and "
            "employees expect seamless mobile experiences. Our specialists design and develop "
            "applications that improve engagement, productivity, and customer satisfaction."
        ),
        "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
        "areas_title": "Mobile expertise",
        "areas": [
            "Native Android Development", "Native iOS Development", "Cross-Platform Development",
            "Mobile Security", "UX/UI Design", "API Integration",
            "Mobile Modernisation", "App Maintenance & Support",
        ],
        "closer": "We create mobile solutions that align technology capabilities with business objectives.",
        "outcomes": [
            ("Native or cross-platform — your call", "We help you weigh performance, cost, and team skills — and recommend the right path."),
            ("Secure by default", "Mobile security postures built for regulated industries, not bolted on at launch."),
            ("Beyond the launch", "Maintenance and modernisation plans that keep your app relevant over years, not months."),
        ],
    },
]


def render_page(svc, others):
    slug = svc["slug"]
    other_cards = "\n".join(
        f'''<a class="sp-other__card" href="{o["slug"]}.html">
            <span class="tag">{o["tag"]}</span>
            <span class="name">{html.escape(o["title"])}</span>
          </a>'''
        for o in others
    )
    areas_html = "\n".join(f"          <li>{html.escape(a)}</li>" for a in svc["areas"])
    outcomes_html = "\n".join(
        f'''<div class="sp-outcome">
              <div class="sp-outcome__num">{i+1:02d}</div>
              <h3 class="sp-outcome__title">{html.escape(t)}</h3>
              <p class="sp-outcome__body">{html.escape(b)}</p>
            </div>'''
        for i, (t, b) in enumerate(svc["outcomes"])
    )
    approach_html = "\n".join(
        f"          <li>{html.escape(s)}</li>"
        for s in [
            "Strategy & Roadmap Development",
            "Technology Assessment & Selection",
            "Solution Architecture & Design",
            "Programme & Project Delivery",
            "System Integration",
            "Data Migration & Modernisation",
            "Change Management",
            "Knowledge Transfer & Skills Enablement",
            "Managed Transformation Support",
        ]
    )

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(svc["title"])} — Softfinity Consulting</title>
  <link rel="icon" href="../assets/favicon-32.png">
{STYLES}
</head>
<body class="sp-body">

  <header class="sp-nav">
    <div class="sp-nav__inner">
      <a class="sp-nav__brand" href="../index.html">
        <img src="../assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting">
      </a>
      <a class="sp-nav__back" href="../index.html#what-we-do">← All services</a>
    </div>
  </header>

  <main>
    <section class="sp-hero">
      <div class="container">
        <p class="sp-hero__crumb"><a href="../index.html">Softfinity</a> &nbsp;/&nbsp; <a href="../index.html#what-we-do">Services</a> &nbsp;/&nbsp; {html.escape(svc["tag"])}</p>
        <div class="sp-hero__head">
          <span class="sp-hero__tag">{html.escape(svc["tag"])}</span>
        </div>
        <h1 class="sp-hero__title">{html.escape(svc["title"])}</h1>
        <p class="sp-hero__lead">{html.escape(svc["lead"])}</p>
        <div class="sp-hero__media">
          <img src="{svc["image"]}" alt="" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="sp-section sp-section--alt">
      <div class="container">
        <div class="sp-section__head">
          <p class="eyebrow">{html.escape(svc["areas_title"])}</p>
          <h2 class="sp-section__title">What we cover.</h2>
        </div>
        <ul class="sp-areas">
{areas_html}
        </ul>
        <p class="sp-section__lead">{html.escape(svc["closer"])}</p>
      </div>
    </section>

    <section class="sp-section">
      <div class="container">
        <div class="sp-section__head">
          <p class="eyebrow">Outcomes you can expect</p>
          <h2 class="sp-section__title">What &ldquo;done&rdquo; looks like.</h2>
        </div>
        <div class="sp-outcomes">
          {outcomes_html}
        </div>
      </div>
    </section>

    <section class="sp-section sp-section--alt">
      <div class="container">
        <div class="sp-section__head">
          <p class="eyebrow">How we work together</p>
          <h2 class="sp-section__title">The 9-phase engagement.</h2>
          <p class="sp-section__lead">
            Every {html.escape(svc["tag"])} engagement follows the Softfinity consulting approach —
            our consultants integrate seamlessly with your team and stay through the full journey.
          </p>
        </div>
        <ol class="sp-approach">
{approach_html}
        </ol>
      </div>
    </section>

    <section class="sp-cta">
      <div class="container-narrow">
        <h2 class="sp-cta__title">
          Ready to explore <span class="gold">{html.escape(svc["tag"])}</span> with an independent partner?
        </h2>
        <a class="sp-cta__btn" href="../index.html#contact">
          Connect with a specialist
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>

    <section class="sp-other">
      <div class="container">
        <div class="sp-other__head">
          <h2 class="sp-other__title">Other technology services</h2>
          <a class="sp-other__all" href="../index.html#what-we-do">View all services &nbsp;→</a>
        </div>
        <div class="sp-other__grid">
{other_cards}
        </div>
      </div>
    </section>
  </main>

  <footer class="sp-footer">
    <div class="sp-footer__inner">
      <span>© 2026 Softfinity Consulting (Pty) Ltd. Technology-agnostic. Business-focused.</span>
      <a href="../index.html">← Back to home</a>
    </div>
  </footer>

</body>
</html>
'''


def main():
    for svc in SERVICES:
        others = [s for s in SERVICES if s["slug"] != svc["slug"]][:4]
        page = render_page(svc, others)
        out_path = OUT / f"{svc['slug']}.html"
        out_path.write_text(page, encoding="utf-8")
        print(f"  wrote {out_path.relative_to(OUT.parent)}  ({len(page)} bytes)")
    print(f"  generated {len(SERVICES)} service pages")


if __name__ == "__main__":
    main()
