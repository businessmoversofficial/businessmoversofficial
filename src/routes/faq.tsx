import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ , Business Movers" },
      { name: "description", content: "Frequently asked questions about working with Business Movers , services, pricing, engagement, and more." },
      { property: "og:title", content: "FAQ , Business Movers" },
      { property: "og:description", content: "Everything you need to know about working with Business Movers." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) =>
            g.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          ),
        }),
      },
    ],
  }),
  component: FAQPage,
});

type QA = { q: string; a: string };
type Group = { title: string; items: QA[] };

const groups: Group[] = [
  {
    title: "About Business Movers",
    items: [
      { q: "What exactly does Business Movers do?", a: "Business Movers is a full service business development consultancy dedicated to helping startups, SMEs, and established enterprises grow, scale, and thrive. We provide tailored strategies, innovative solutions, and end to end support across market research, strategic planning, branding, digital marketing, financial modelling, and business documentation. Simply put, we move businesses forward." },
      { q: "How is Business Movers different from a regular consulting firm?", a: "Most consulting firms tell you what to do and leave you to figure it out. At Business Movers, we act as your strategic partner. We dig deep into your business reality, co create solutions specific to your market environment, and stay with you through execution. Our approach is practical, results driven, and rooted in African market insights, which means strategies that actually work in your context." },
      { q: "Who founded Business Movers and what is their background?", a: "Business Movers is led by Adelakun Kehinde (Managing Director), holder of B.Sc., M.Sc., MNITP, and RTP qualifications, supported by a management team covering Digital Marketing, Legal and Regulatory Compliance, Data Analytics, Content Design, and IT Support." },
      { q: "Where is Business Movers located and what areas do you serve?", a: "Our physical address is 208, Egbeda Idimu Road, Lagos. While we are Lagos based, we serve clients across Nigeria and can work with businesses anywhere via remote consulting engagements." },
    ],
  },
  {
    title: "Our Services",
    items: [
      { q: "What services does Business Movers offer?", a: "We offer Market Research and Analysis, Strategic Planning (SWOT and PESTLE), Marketing and Sales Strategy, Advertising Strategy and Campaign Management, Digital Strategy (SEO, Social, Email, Content), Brand Strategy, Business Development Documentation (Pitch Decks, Business Plans, Market Research Reports), Financial Modelling and Forecasting, Business Development Troubleshooting, and our Business Development Academy training programmes." },
      { q: "Do you work with startups or only established businesses?", a: "Both. Our expertise spans Real Estate, Fintech, FMCG, Law Firms, Medical Industry, Security, Insurance, Agriculture, Hospitality and Tourism, and Education and EdTech. Whether you are pre revenue or a 20 year old enterprise that has hit a growth ceiling, we have the tools, frameworks, and expertise to move you forward." },
      { q: "What is the Business Development Academy?", a: "Our training and capacity building arm. Programmes include Sales and Pitch Training, Digital Marketing, Financial Analysis, Community Building, Market Insights, and Accelerated Startup Programmes." },
      { q: "Can you help my business with digital presence and social media?", a: "Absolutely. Our Digital Strategy service covers strategy, SEO, targeted campaigns across Facebook, Instagram, X, LinkedIn, and TikTok, content creation, email marketing, audience segmentation, and analytics." },
      { q: "What kind of business documents can you help create?", a: "Pitch Decks, Business Development Plans, Marketing Manuals, Business Model Documents, Market Penetration Plans, Market Research Documents, Executive Summaries, Proposals and Brochures, Risk Assessment and Mitigation Plans, Potential Analysis Documents, Market Competitor Spy Reports, and Brokerage of Agreements. Each document is custom built for your specific business situation." },
    ],
  },
  {
    title: "Working With Us",
    items: [
      { q: "How do I get started with Business Movers?", a: "Reach out via phone or WhatsApp at 0912 705 0547, email businessmoversofficial@gmail.com, or any of our social channels. We begin with a discovery conversation, then propose a tailored engagement plan. You can also book a free 30 minute Business Growth Consultation before any commitment." },
      { q: "How long does a typical engagement last?", a: "A focused project like a Pitch Deck or Market Research Document can be completed in 1 to 2 weeks. A comprehensive Business Development Plan or Brand Strategy project typically runs 4 to 8 weeks. For sustained support we offer 3 month contracts that serve as an entry point into a full retainership." },
      { q: "Do you offer one off services or only long term engagements?", a: "Both. Our foundational service is a Business Strategic Consult designed to identify and unlock revenue growth opportunities. Beyond that you can engage us for specific deliverables or retain us as your ongoing partner." },
      { q: "Will my business information be kept confidential?", a: "Absolutely. All engagements are governed by a Non Disclosure Agreement (NDA). Your strategies, financials, and documents are treated with the strictest professional discretion." },
      { q: "Can Business Movers work remotely with my business?", a: "Yes. We are fully equipped to serve clients remotely through virtual meetings, digital collaboration tools, and cloud based document sharing. Geography is not a barrier." },
    ],
  },
  {
    title: "Results & Expertise",
    items: [
      { q: "What results can I realistically expect?", a: "Clients leave with greater strategic clarity, more professional materials, and actionable plans they can execute immediately. Clients who implement our strategies report improvements in lead generation, brand perception, revenue growth, and operational efficiency." },
      { q: "Why do so many businesses fail, and how does Business Movers address this?", a: "The majority of businesses fail not due to lack of product quality, but due to fixable constraints: poor strategic planning, weak market positioning, inadequate financial management, leadership gaps, and competitive blind spots. We diagnose before we prescribe." },
      { q: "How do you stay current with market trends?", a: "Our team invests continuously in market intelligence, industry research, and professional development across multiple sectors. We track local, regional, and global trends and incorporate them into every engagement." },
      { q: "Do you have experience in my specific industry?", a: "Our portfolio spans security services, real estate, creative industries, manufacturing, and more. Our methodology is sector agnostic and we conduct thorough research into your specific sector before making recommendations." },
    ],
  },
  {
    title: "Pricing & Value",
    items: [
      { q: "How is Business Movers pricing structured?", a: "Project based or retainer based depending on the engagement. Pricing is transparent, value driven, and proportionate to the results we deliver. We always provide a clear proposal with itemised costs before work begins." },
      { q: "Is hiring Business Movers worth the investment for a small business?", a: "The cost of poor strategy, weak branding, or an unconvincing pitch far exceeds the cost of expert guidance. Engaging us is essentially acquiring years of expertise compressed into weeks of structured action." },
      { q: "Do you offer payment plans or flexible payment options?", a: "Yes. We are open to milestone based payment structures, phased project delivery, and instalment plans for qualifying engagements." },
    ],
  },
  {
    title: "Contact & Next Steps",
    items: [
      { q: "How do I contact Business Movers today?", a: "Phone or WhatsApp: 0912 705 0547. Email: businessmoversofficial@gmail.com. Social: @businessmoversofficial on LinkedIn, TikTok, YouTube, and Instagram. Physical Address: 208, Egbeda Idimu Road, Lagos." },
      { q: "What should I prepare before our first conversation?", a: "A broad sense of what your business does and who your target customers are, the key challenge or goal driving your interest, any previous strategies or initiatives you have tried, and a rough idea of your timeline and budget expectations." },
      { q: "Can I follow Business Movers on social media for free business insights?", a: "Absolutely. Follow us @businessmoversofficial across all platforms for regular content on business strategy, market insights, branding, digital marketing, and entrepreneurship in Africa." },
    ],
  },
];

function FAQPage() {
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
            Everything you need to know, <span className="text-gradient">answered.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground" style={{ textAlign: "justify" }}>
            Whether you are a startup founder, a growing SME owner, or a corporate leader seeking transformative growth, this page addresses the most common questions about Business Movers, who we are, what we do, how we work, and why we are the strategic partner your business needs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="space-y-14">
          {groups.map((group, gi) => (
            <div key={group.title}>
              <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">{group.title}</h2>
              <div className="mt-6 space-y-3">
                {group.items.map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  const isOpen = open === id;
                  return (
                    <div
                      key={id}
                      className={`overflow-hidden rounded-2xl border bg-gradient-card transition-colors ${
                        isOpen ? "border-primary/50 shadow-glow" : "border-border"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="font-display text-base font-semibold md:text-lg">{item.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:text-base" style={{ textAlign: "justify" }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-card p-10 md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Still have questions?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground" style={{ textAlign: "justify" }}>
                We would love to hear from you. Reach out and a member of our team will respond within the same business day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>0912 705 0547</span></span>
                <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>businessmoversofficial@gmail.com</span></span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href="https://wa.me/2349127050547"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Book consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
