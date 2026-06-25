#!/usr/bin/env python3
"""Generate the footer link detail pages (about, approach, consultants,
case-studies, principles, industries, insights, contact, the-conflict,
stack-audit) from a single template + per-page data tables.

Run from project root:  python3 pages/_generate.py
Idempotent — overwrites the page files in pages/.

Reuses services/service-page.css for styling and the design-system tokens
already loaded by the main site.
"""
from pathlib import Path
import html

OUT = Path(__file__).resolve().parent
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
    '  <link rel="stylesheet" href="../services/service-page.css">',
    '  <link rel="stylesheet" href="page.css">',
])


# ---------- per-page data ----------
PAGES = {
    "about": {
        "tag": "About",
        "title": "Who we are.",
        "lead": (
            "Softfinity Consulting is a business and technology consulting and systems "
            "integration firm — specialising in intellectually enriched consulting and turnkey "
            "solutions tailored to the diverse needs of our clients. We have spent three decades "
            "refining what an unaffiliated, IP-driven engagement looks like."
        ),
        "image": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        "sections": [
            {
                "eyebrow": "Our story",
                "title": "Built on a refusal to take a side.",
                "body": (
                    "In an industry obsessed with certifications and partnerships, we deliberately "
                    "chose not to tie our fate to any single multi-billion-dollar vendor. When a "
                    "consultancy relies on AWS credits or Microsoft licensing margins to survive, "
                    "they stop being consultants and start being salespeople. We opted out of that "
                    "game entirely — and built our practice around the only loyalty that matters: "
                    "your balance sheet, your uptime, and your team's sanity."
                ),
            },
            {
                "eyebrow": "Our operating model",
                "title": "Self-assimilating IP teams.",
                "body": (
                    "Our model is deliberately non-hierarchical. Instead of traditional divisions, "
                    "we work through self-assimilating IP teams — dynamic, cross-functional groups "
                    "composed of client representatives, Softfinity consultants, and partner "
                    "resources. These teams are highly focused, cross-pollinated, and infused with "
                    "the intellectual property and information required by each engagement. This "
                    "collective structure keeps us agile, collaborative, and deeply aligned with "
                    "client objectives."
                ),
            },
            {
                "eyebrow": "Our commitment",
                "title": "Consulting that empowers, not just advises.",
                "body": (
                    "We believe consulting in the modern era must go beyond advice — it must "
                    "empower. By embedding knowledge transfer, intellectual property creation, and "
                    "collaborative execution into every project, we ensure our clients gain not "
                    "only solutions but also sustainable competitive advantage. Our vision is to "
                    "help organisations implement flexible, componentised, and standards-based "
                    "enterprise architectures that seamlessly connect business units, suppliers, "
                    "customers, and partners."
                ),
            },
        ],
        "cta_title": "Want to know how we'd run your next engagement?",
        "cta_label": "Talk to a senior consultant",
        "cta_href": "../index.html#contact",
    },
    "approach": {
        "tag": "Approach",
        "title": "Working together to deliver results.",
        "lead": (
            "We partner with clients throughout the entire transformation journey — combining our "
            "consultants, our IP, and your team into one cross-functional delivery unit. Below is "
            "the nine-phase rhythm every Softfinity engagement follows."
        ),
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
        "sections": [
            {
                "eyebrow": "The Translucent Engagement Model",
                "title": "Non-hierarchical, cross-pollinated, transparent.",
                "body": (
                    "Our consultants integrate seamlessly with your teams to provide expertise "
                    "where and when it is needed most. We don't bring an org chart that mirrors "
                    "yours — we bring a structure that absorbs yours. Every engagement is a "
                    "translucent collaboration: client representatives, Softfinity consultants, "
                    "and partner resources operating as a single, focused team with shared "
                    "ownership of outcomes and shared access to information."
                ),
            },
            {
                "eyebrow": "The nine phases",
                "title": "From strategy through to managed support.",
                "phases": [
                    ("Strategy & Roadmap Development", "We anchor the journey in your business goals — not the latest vendor cycle. Outputs are decision-grade artefacts your board can endorse."),
                    ("Technology Assessment & Selection", "Objective evaluation of options against your risk, budget, and operations. Bias toward best-of-breed; bias against vendor lock-in."),
                    ("Solution Architecture & Design", "Standards-based, componentised architectures that flex as you grow. We design for the next platform shift, not just this one."),
                    ("Programme & Project Delivery", "Senior delivery alongside your team — outcomes measured, not assumed. We don't graduate junior consultants on your dime."),
                    ("System Integration", "Unifying the alliance: vendors, services, partners — into one whole. The hardest, least glamorous, most valuable phase."),
                    ("Data Migration & Modernisation", "Lifting legacy data into modern platforms safely and without disruption. Migration is data hygiene at scale."),
                    ("Change Management", "Bringing your people with the work — the most underestimated success factor. Tech adoption is a human problem."),
                    ("Knowledge Transfer & Skills Enablement", "Measured as a deliverable. Your team owns what we built, together. We leave you stronger than we found you."),
                    ("Managed Transformation Support", "Hands-on partnership through the long tail of any complex programme. We're around for the unglamorous middle, too."),
                ],
            },
            {
                "eyebrow": "What this looks like in practice",
                "title": "An engagement is one team, one rhythm.",
                "body": (
                    "Phases overlap, repeat, and recombine — they aren't a waterfall. What stays "
                    "constant is the rhythm: regular forums, transparent backlogs, and a shared "
                    "definition of done. Knowledge transfer is built into every phase, not "
                    "saved for the end. By the time our consultants step back, your team owns "
                    "the playbook, the architecture, and the operational know-how."
                ),
            },
        ],
        "cta_title": "Curious how this would land for your transformation?",
        "cta_label": "Connect with a specialist",
        "cta_href": "../index.html#contact",
    },
    "consultants": {
        "tag": "Consultants",
        "title": "Senior consultants — embedded in your team.",
        "lead": (
            "Softfinity's consultants are senior practitioners with decades of combined experience "
            "across enterprise platforms, cloud, data, and emerging technologies. We don't graduate "
            "juniors on your engagement. The names below are illustrative placeholders for the "
            "kinds of profiles we bring."
        ),
        "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1600&q=80",
        "profiles": [
            ("Lead Enterprise Architect", "Standards-first architecture across SAP, Oracle, Microsoft. 20+ years across financial services, telco, and utilities. Specialises in untangling multi-vendor estates."),
            ("Principal AI Consultant", "Production ML, generative AI, governance. Brings hard-won judgement on what AI can and can't do today — and what's worth the investment."),
            ("Cloud & Platform Engineer", "Multi-cloud architecture, Kubernetes, Terraform. Designs for portability so you can leave any provider in 30 days."),
            ("Data Platform Lead", "Modern data warehousing, lakehouse, governance, real-time. Picks the right engine for the actual workload — SQL, NoSQL, columnar, graph."),
            ("Programme Director", "Runs the unglamorous middle of complex programmes. Specialises in change management, knowledge transfer, and managed transformation support."),
            ("Integration Specialist", "Middleware, APIs, event-driven architectures. Where the alliance actually starts working as one — or doesn't."),
        ],
        "cta_title": "Want to meet the team that would lead your engagement?",
        "cta_label": "Set up an intro call",
        "cta_href": "../index.html#contact",
    },
    "case-studies": {
        "tag": "Case studies",
        "title": "What independent advice has delivered.",
        "lead": (
            "Placeholder case studies showing the shape of the work — anonymised to protect "
            "client identities. Real results will be added as our clients give us permission "
            "to publish."
        ),
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
        "cases": [
            {
                "tag": "Mid-market retailer",
                "title": "32% cloud spend cut in 90 days.",
                "challenge": "Three years of accumulated cloud sprawl — unused modules, oversized instances, duplicate workloads across two providers.",
                "approach": "Vendor-Neutral Stack Audit. We mapped current architecture against three futures: Cost-Optimised, Best-in-Breed, Fully Portable. Leadership picked Cost-Optimised for year one.",
                "outcome": "32% annual cloud spend reduction. Right-sized instances, decommissioned shelfware, consolidated to one provider for the workloads where consolidation made sense.",
            },
            {
                "tag": "Regional manufacturer",
                "title": "AI roadmap shipped in 6 weeks.",
                "challenge": "Board mandate to 'do something with AI' — but no clarity on which use cases would actually move revenue or cost.",
                "approach": "AI Strategy Development phase. We mapped 14 candidate use cases against business value, technical readiness, and data availability. Recommended the 3 that were ready, said no to the 11 that weren't.",
                "outcome": "Production-ready roadmap with 3 prioritised use cases, ROI projections, and a no-list explaining why the other 11 were declined. Board approved unanimously.",
            },
            {
                "tag": "Logistics SaaS",
                "title": "SAP S/4HANA migration — zero downtime.",
                "challenge": "Legacy SAP ECC reaching end-of-life. Migration window had to be invisible to customers running critical operations 24/7.",
                "approach": "Phased migration with parallel run. Solution architecture for cutover; system integration with their existing platform; change management for internal teams; managed support through the long tail.",
                "outcome": "Zero customer-facing downtime over the cutover weekend. Internal team owned the new platform from week one — knowledge transfer was measured as a deliverable, not assumed.",
            },
        ],
        "cta_title": "Want to discuss what we could deliver for you?",
        "cta_label": "Connect with a specialist",
        "cta_href": "../index.html#contact",
    },
    "principles": {
        "tag": "Principles",
        "title": "Methodologies that turn knowledge into a deliverable.",
        "lead": (
            "Central to our approach are the concepts of MCIP, IPVF, and SIPA. These principles "
            "permeate every aspect of our work — they're the operating system behind every "
            "engagement, ensuring knowledge and skills transfer is a tangible, measured "
            "deliverable rather than an incidental output."
        ),
        "image": "../assets/unrivalled-principles.jpg",
        "concepts": [
            ("MCIP — Massed Core Intellectual Property",
             "The undifferentiated mass of intellectual property and information available to "
             "execute on any client project. It is composed of Softfinity, our partners, our "
             "clients, and the market. The IP core continues to grow on the basis of derived IP "
             "generated on the back of every project — each engagement enriches the core for "
             "every future engagement."),
            ("IPVF — Intellectual Property Vapour Fusion",
             "The set of methodologies, best practices, and mechanisms we use to capture derived "
             "intellectual property and fuse it back into the Massed Core. IPVF is the process "
             "that ensures lessons learned and frameworks built during one engagement become "
             "leverage for the next. Without IPVF, IP evaporates with people; with it, IP "
             "compounds."),
            ("SIPA — Singular Intellectual Property Assimilation",
             "The methodologies we use to extract unique IP from the Massed Core and assimilate "
             "it into a particular client engagement. SIPA works in tandem with ienrichment to "
             "empower stakeholders and deliver a decisive competitive advantage — every client "
             "engagement is bespoke, but never starting from zero."),
            ("Translucent Engagement Model",
             "Our engagement framework: non-hierarchical, cross-functional teams composed of "
             "client representatives, Softfinity consultants, and partner resources — focused, "
             "cross-pollinated, infused with the IP each engagement requires. Translucent because "
             "decisions, IP, and information flow freely across organisational boundaries."),
            ("ienrichment — Intellectual Property Enrichment",
             "A methodology in which intellectual property — either as part of an overall "
             "solution or embedded in our consultants and partners — is blended into the "
             "execution of every client engagement. The enrichment process is tailored to the "
             "unique needs of each engagement."),
            ("Nextelligence",
             "The cognitive application of derivative intellectual property — the leap from raw "
             "knowledge to actionable, contextual insight that compounds across engagements. "
             "Nextelligence is what turns a project's lessons-learned document into the next "
             "project's accelerator."),
        ],
        "cta_title": "Want to see these principles applied to your environment?",
        "cta_label": "Connect with a specialist",
        "cta_href": "../index.html#contact",
    },
    "industries": {
        "tag": "Industries",
        "title": "Cross-industry experience. Practical business knowledge.",
        "lead": (
            "Our consultants combine deep technical expertise with hands-on experience across "
            "multiple industries — bringing proven practices, fresh perspectives, and innovative "
            "solutions to every engagement."
        ),
        "image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&q=80",
        "industries": [
            ("Financial Services", "Core banking modernisation, regulatory reporting, real-time risk, payments infrastructure. We work alongside CIOs navigating both digital transformation and a moving regulatory floor."),
            ("Insurance", "Underwriting modernisation, claims automation, actuarial data platforms, customer experience. Vendor-neutral selection across the insurance tech stack."),
            ("Healthcare", "Clinical systems integration, patient data platforms, HL7 / FHIR, compliance. Independent advice in a market full of vendor-aligned recommendations."),
            ("Telecommunications & Media", "OSS / BSS, network data platforms, customer 360. We've helped telcos consolidate decades-old estates into manageable, modern architectures."),
            ("Retail & FMCG", "Omnichannel commerce, supply chain visibility, customer data platforms, demand forecasting. Pragmatic about what AI can move and what it can't, yet."),
            ("Manufacturing", "Industry 4.0, MES integration, IoT data pipelines, predictive maintenance. Senior engineering judgement applied to OT/IT convergence."),
            ("Government", "Citizen services platforms, secure data architectures, modernisation under fixed budgets. Standards-based architectures that survive procurement cycles."),
            ("Energy & Utilities", "Grid data, regulatory reporting, asset management, sustainability reporting. We help utilities modernise without disrupting safety-critical operations."),
            ("Transportation & Logistics", "Real-time fleet, route optimisation, customer-facing tracking, ERP integration. SAP, Oracle, and Microsoft estates all welcome."),
            ("Education", "Student information systems, learning platforms, identity and access, analytics. Pragmatic transformation under tight institutional budgets."),
            ("Professional Services", "Practice management, knowledge platforms, time and billing modernisation, AI-augmented client work. We use what we recommend."),
        ],
        "cta_title": "Your industry not listed? We've probably done adjacent work.",
        "cta_label": "Tell us about your sector",
        "cta_href": "../index.html#contact",
    },
    "insights": {
        "tag": "Insights",
        "title": "Honest reads from inside the engagements.",
        "lead": (
            "Placeholder articles drawn from the kinds of conversations we have with CIOs every "
            "week. Real Insights content will be added as our consultants publish — for now, "
            "these are the themes you can expect."
        ),
        "image": "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=1600&q=80",
        "articles": [
            ("Field note",
             "The hidden cost of \"free\" certifications.",
             "Did you know that many consultancies get up to 20% of their annual revenue from vendor rebates? When they recommend a specific cloud or ERP, they're often legally obligated to push you toward their partner — even if it isn't right for you. Here's why we opted out of that game, and what it means for the advice you get from us."),
            ("Field note",
             "Cost-Optimised vs Best-in-Breed vs Fully Portable.",
             "Every engagement starts with a Vendor-Neutral Stack Audit. We map your current architecture against three distinct futures — and let your leadership make the final call. Here's what each path looks like in practice, with honest pros, cons, and 5-year cost projections for each."),
            ("Field note",
             "Why we sometimes tell you to keep the mainframe.",
             "If a legacy mainframe is actually cheaper and more reliable for your core transactions, we will tell you to keep it. Modernisation is not the same as replacement, and replacement is not the same as progress. Here's the framework we use to tell the difference."),
            ("Field note",
             "The unglamorous middle of any complex programme.",
             "Most consultancies show up for strategy and disappear for delivery. We stay through Managed Transformation Support — the unglamorous middle where value either compounds or evaporates. Here's why we built the practice this way."),
            ("Field note",
             "AI: production over pilots.",
             "Generative AI has reset every CIO's roadmap. But the gap between an exciting pilot and a system that actually runs in production at scale is enormous. Here's how we evaluate AI opportunities — and what we tell clients to do with the 80% that aren't ready yet."),
            ("Field note",
             "What Nextelligence means in practice.",
             "Nextelligence is the cognitive application of derivative intellectual property — the leap from raw knowledge to actionable insight. Here's a concrete example of how IP from one engagement compounds into an accelerator for the next."),
        ],
        "cta_title": "Want a particular topic covered? We'd love to hear what's on your mind.",
        "cta_label": "Suggest a topic",
        "cta_href": "../index.html#contact",
    },
    "contact": {
        "tag": "Contact",
        "title": "Tell us where you're stuck. We'll bring the experience.",
        "lead": (
            "We're an independent, technology-agnostic consultancy. No pitch, no agenda, no "
            "partner referral fee. Just an honest read on what your business actually needs."
        ),
        "image": None,
        "sections": [
            {
                "eyebrow": "Get in touch",
                "title": "Three ways to reach us.",
                "body": (
                    "Email us directly at hello@softfinity.com, connect with us on LinkedIn, or "
                    "use the contact form on the home page. A senior consultant will reach out "
                    "within one business day — with a straight read on what you actually need, "
                    "not a sales pitch."
                ),
            },
            {
                "eyebrow": "What to expect",
                "title": "An honest first conversation.",
                "body": (
                    "Our first call is a structured 30-minute conversation: we listen, ask "
                    "questions, and tell you what we'd do — even if that's \"you don't need us "
                    "for this.\" There's no obligation and no awkward sales follow-up. If we're "
                    "the right partner, we'll both know within that half hour."
                ),
            },
        ],
        "cta_title": "Ready to talk now?",
        "cta_label": "Use the form on the home page",
        "cta_href": "../index.html#contact",
    },
    "the-conflict": {
        "tag": "The conflict",
        "title": "When a consultancy lives on AWS credits and Microsoft licensing margins, they stop being consultants.",
        "lead": (
            "The structural conflict of interest in the IT consulting industry is hiding in plain "
            "sight. It's worth saying out loud, because it shapes every \"best practice\" "
            "recommendation a vendor-aligned firm puts in front of you."
        ),
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
        "sections": [
            {
                "eyebrow": "The 20% problem",
                "title": "Up to 1 in 5 dollars of consultancy revenue comes from vendor rebates.",
                "body": (
                    "Many consultancies get up to 20% of their annual revenue from vendor rebates. "
                    "That means when they recommend a specific cloud or ERP system, they are "
                    "legally obligated to push you toward their partner — even if it isn't right "
                    "for you. The rebate doesn't appear on your invoice, but it does shape what "
                    "ends up on it."
                ),
            },
            {
                "eyebrow": "The certification trap",
                "title": "\"Best practice\" becomes whatever the certification covers.",
                "body": (
                    "When a firm's training budget goes into proprietary certifications, their "
                    "people think in terms of click-ops in a specific dashboard rather than "
                    "fundamental computer science. Their definition of \"best practice\" "
                    "narrows to whatever their certification ecosystem covers — and so does "
                    "their definition of your options."
                ),
            },
            {
                "eyebrow": "Our position",
                "title": "We opted out.",
                "body": (
                    "We don't accept partner referral fees, reseller margins, or vendor-sponsored "
                    "trips. Our revenue comes exclusively from your success. We invest our "
                    "training budget in protocols and open standards — Kubernetes, Terraform, "
                    "REST/GraphQL, zero-trust security — rather than proprietary certifications. "
                    "That means our team thinks in terms of fundamental computer science rather "
                    "than click-ops in a specific dashboard. The result: we solve problems other "
                    "consultancies can't even see — because we aren't blinded by vendor Kool-Aid."
                ),
            },
        ],
        "cta_title": "Want an unbiased read on your stack?",
        "cta_label": "Diagnose my stack",
        "cta_href": "../index.html#contact",
    },
    "stack-audit": {
        "tag": "The Stack Audit",
        "title": "Three viable paths. Honest pros, cons, and 5-year costs.",
        "lead": (
            "Every Softfinity engagement starts with a Vendor-Neutral Stack Audit. We map your "
            "current architecture against three distinct futures, deliver a roadmap with "
            "multiple viable paths complete with honest pros, cons, and 5-year cost projections "
            "for each, and let your leadership make the final call. That's partnership. Not "
            "vendor-push."
        ),
        "image": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
        "paths": [
            ("Cost-Optimised",
             "Staying where you are — but trimming the fat.",
             "We map every unused module, every overpaid licence, every oversized instance, every duplicate workload. You stay on your current vendor footprint, but you stop paying for things you're not actually using. Lowest risk path; quickest payback; smallest scope of change."),
            ("Best-in-Breed",
             "Swapping specific components for superior alternatives.",
             "If a niche open-source database is 40% faster on your workload than the market leader, we'll champion it. If a smaller cloud provider gives you 30% better economics for your specific data egress pattern, we'll recommend it. Medium risk, medium payback, scoped to specific components rather than the whole estate."),
            ("Fully Portable",
             "Rebuilding your middleware so you can leave any provider within 30 days.",
             "The ultimate insurance policy. We rebuild your integration layer around open standards — Kubernetes, Terraform, GraphQL, zero-trust — so that any vendor can be swapped without rewriting business logic. Highest investment, highest long-term flexibility, the only path that fully eliminates vendor lock-in."),
        ],
        "cta_title": "Ready to see the three paths for your architecture?",
        "cta_label": "Request a Stack Audit",
        "cta_href": "../index.html#contact",
    },
}


def render_section_body(s):
    if "phases" in s:
        items = "\n".join(
            f'              <li><h3>{html.escape(t)}</h3><p>{html.escape(b)}</p></li>'
            for t, b in s["phases"]
        )
        body_html = f'''
            <div class="sp-section__head">
              <p class="eyebrow">{html.escape(s["eyebrow"])}</p>
              <h2 class="sp-section__title">{html.escape(s["title"])}</h2>
            </div>
            <ol class="pg-phases">
{items}
            </ol>'''
    else:
        body_html = f'''
            <div class="sp-section__head">
              <p class="eyebrow">{html.escape(s["eyebrow"])}</p>
              <h2 class="sp-section__title">{html.escape(s["title"])}</h2>
            </div>
            <p class="pg-prose">{html.escape(s["body"])}</p>'''
    return body_html


def render_profiles_section(profiles):
    cards = "\n".join(
        f'''            <div class="pg-profile">
              <span class="pg-profile__role">{html.escape(role)}</span>
              <p class="pg-profile__body">{html.escape(body)}</p>
            </div>'''
        for role, body in profiles
    )
    return f'''
            <div class="sp-section__head">
              <p class="eyebrow">Profiles</p>
              <h2 class="sp-section__title">The kinds of people we bring.</h2>
            </div>
            <div class="pg-profile-grid">
{cards}
            </div>'''


def render_cases_section(cases):
    cards = "\n".join(
        f'''            <article class="pg-case">
              <span class="pg-case__tag">{html.escape(c["tag"])}</span>
              <h3 class="pg-case__title">{html.escape(c["title"])}</h3>
              <dl class="pg-case__dl">
                <dt>Challenge</dt><dd>{html.escape(c["challenge"])}</dd>
                <dt>Approach</dt><dd>{html.escape(c["approach"])}</dd>
                <dt>Outcome</dt><dd>{html.escape(c["outcome"])}</dd>
              </dl>
            </article>'''
        for c in cases
    )
    return f'''
            <div class="sp-section__head">
              <p class="eyebrow">Selected work</p>
              <h2 class="sp-section__title">Three illustrative engagements.</h2>
              <p class="sp-section__lead">Names and figures are placeholders — the shape of the work is real.</p>
            </div>
            <div class="pg-cases">
{cards}
            </div>'''


def render_concepts_section(concepts):
    cards = "\n".join(
        f'''            <article class="pg-concept">
              <h3 class="pg-concept__title">{html.escape(title)}</h3>
              <p class="pg-concept__body">{html.escape(body)}</p>
            </article>'''
        for title, body in concepts
    )
    return f'''
            <div class="sp-section__head">
              <p class="eyebrow">The six terms</p>
              <h2 class="sp-section__title">The operating system behind every engagement.</h2>
            </div>
            <div class="pg-concepts">
{cards}
            </div>'''


def render_industries_section(industries):
    cards = "\n".join(
        f'''            <article class="pg-industry">
              <h3 class="pg-industry__title">{html.escape(name)}</h3>
              <p class="pg-industry__body">{html.escape(body)}</p>
            </article>'''
        for name, body in industries
    )
    return f'''
            <div class="sp-section__head">
              <p class="eyebrow">Sectors</p>
              <h2 class="sp-section__title">Where we've worked.</h2>
            </div>
            <div class="pg-industries">
{cards}
            </div>'''


def render_articles_section(articles):
    cards = "\n".join(
        f'''            <article class="pg-article">
              <span class="pg-article__kicker">{html.escape(kicker)}</span>
              <h3 class="pg-article__title">{html.escape(title)}</h3>
              <p class="pg-article__body">{html.escape(body)}</p>
              <span class="pg-article__more">Coming soon</span>
            </article>'''
        for kicker, title, body in articles
    )
    return f'''
            <div class="sp-section__head">
              <p class="eyebrow">Recent themes</p>
              <h2 class="sp-section__title">Field notes from inside the engagements.</h2>
            </div>
            <div class="pg-articles">
{cards}
            </div>'''


def render_paths_section(paths):
    def slugify(s):
        return s.lower().replace(' ', '-').replace('—', '').replace('  ', '-')

    cards = "\n".join(
        f'''            <article class="pg-path" id="{slugify(name)}">
              <span class="pg-path__num">{i+1:02d}</span>
              <h3 class="pg-path__title">{html.escape(name)}</h3>
              <p class="pg-path__lead">{html.escape(lead)}</p>
              <p class="pg-path__body">{html.escape(body)}</p>
            </article>'''
        for i, (name, lead, body) in enumerate(paths)
    )
    return f'''
            <div class="sp-section__head">
              <p class="eyebrow">The three paths</p>
              <h2 class="sp-section__title">Pick the future that fits.</h2>
            </div>
            <div class="pg-paths">
{cards}
            </div>'''


def render_page(slug, data):
    image_html = ""
    if data.get("image"):
        image_html = f'''        <div class="sp-hero__media">
          <img src="{data["image"]}" alt="" loading="lazy" />
        </div>'''

    section_blocks = []
    for s in data.get("sections", []):
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_section_body(s)}
      </div>
    </section>''')

    if "profiles" in data:
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_profiles_section(data["profiles"])}
      </div>
    </section>''')
    if "cases" in data:
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_cases_section(data["cases"])}
      </div>
    </section>''')
    if "concepts" in data:
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_concepts_section(data["concepts"])}
      </div>
    </section>''')
    if "industries" in data:
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_industries_section(data["industries"])}
      </div>
    </section>''')
    if "articles" in data:
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_articles_section(data["articles"])}
      </div>
    </section>''')
    if "paths" in data:
        section_blocks.append(f'''
    <section class="sp-section sp-section--alt">
      <div class="container">{render_paths_section(data["paths"])}
      </div>
    </section>''')

    sections_html = "\n".join(section_blocks)

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(data["title"].rstrip("."))} — Softfinity Consulting</title>
  <link rel="icon" href="../assets/favicon-32.png">
{STYLES}
</head>
<body class="sp-body">

  <header class="sp-nav">
    <div class="sp-nav__inner">
      <a class="sp-nav__brand" href="../index.html">
        <img src="../assets/softfinity-horizontal-dark.svg" alt="Softfinity Consulting">
      </a>
      <a class="sp-nav__back" href="../index.html">← Back to home</a>
    </div>
  </header>

  <main>
    <section class="sp-hero">
      <div class="container">
        <p class="sp-hero__crumb"><a href="../index.html">Softfinity</a> &nbsp;/&nbsp; {html.escape(data["tag"])}</p>
        <div class="sp-hero__head">
          <span class="sp-hero__tag">{html.escape(data["tag"])}</span>
        </div>
        <h1 class="sp-hero__title">{html.escape(data["title"])}</h1>
        <p class="sp-hero__lead">{html.escape(data["lead"])}</p>
{image_html}
      </div>
    </section>
{sections_html}

    <section class="sp-cta">
      <div class="container-narrow">
        <h2 class="sp-cta__title">{html.escape(data["cta_title"])}</h2>
        <a class="sp-cta__btn" href="{data["cta_href"]}">
          {html.escape(data["cta_label"])}
          <span aria-hidden="true">→</span>
        </a>
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
    for slug, data in PAGES.items():
        page = render_page(slug, data)
        out_path = OUT / f"{slug}.html"
        out_path.write_text(page, encoding="utf-8")
        print(f"  wrote {out_path.relative_to(OUT.parent)}  ({len(page)} bytes)")
    print(f"  generated {len(PAGES)} pages")


if __name__ == "__main__":
    main()
