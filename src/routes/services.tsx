import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Compass, Target, Megaphone, Globe2, Mail, Share2, BarChart3, ArrowRight } from "lucide-react";
import boardroom from "@/assets/services-boardroom.webp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services, Business Movers" },
      { name: "description", content: "Market research, strategic planning, marketing & sales strategy, advertising, and end-to-end digital growth services." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Search,
    title: "Market Research & Analysis",
    desc: "Understanding the needs and wants of your market is non-negotiable. We help you make informed decisions on pricing, product development, marketing strategies and expansion plans.",
    points: ["Audience & demand mapping", "Pricing intelligence", "Competitor benchmarking", "Expansion feasibility"],
  },
  {
    icon: Compass,
    title: "Strategic Planning",
    desc: "Planning is an underrated skill. We assist you in creating market penetration plans, business development plans and growth roadmaps tailored to your stage.",
    points: ["SWOT & PESTLE analysis", "Market & potential analysis", "Cost & benefit analysis", "Short and long term roadmaps"],
  },
  {
    icon: Target,
    title: "Marketing & Sales Strategy",
    desc: "Strong brand presence, real customer relationships, and demand engines designed for your specific clime and audience.",
    points: ["Brand strategy & positioning", "Sales playbooks", "Marketing strategy development", "Sales training"],
  },
  {
    icon: Megaphone,
    title: "Advertising Strategy",
    desc: "We design campaigns from creative through to targeting and KPI tracking, clicks, conversions and impressions become signals you can act on.",
    points: ["Campaign design & creative", "Audience targeting", "Performance reporting", "Optimisation & scaling"],
  },
  {
    icon: Globe2,
    title: "Digital Strategy Development",
    desc: "A specialist team of digital marketers, social managers, web designers and content creators to take your business to the next climax online.",
    points: ["Digital marketing strategy", "Web design & UX", "Content marketing", "Analytics & measurement"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "We design and execute email campaigns that nurture leads and convert prospects, including list growth and segmentation by behaviour.",
    points: ["List building & growth", "Segmentation", "Lifecycle automation", "Campaign reporting"],
  },
  {
    icon: BarChart3,
    title: "Search Engine Optimization",
    desc: "Improve visibility and ranking in search results, increasing organic traffic by making your site more relevant and authoritative.",
    points: ["On-page & off-page SEO", "Technical SEO", "Local SEO", "Algorithm monitoring"],
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "We drive your business across Instagram, Facebook, X and LinkedIn, building community, authority and measurable engagement.",
    points: ["Content calendars", "Community management", "Paid social", "Influencer partnerships"],
  },
];

function ServicesPage() {
  return (
    <div className="theme-offwhite">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our Services</span>
            <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
              A comprehensive suite for <span className="text-gradient">sustainable growth.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground" style={{ textAlign: "justify" }}>
              From the first market signal to the long term expansion plan, every engagement is tailored to your business, your market, and your moment.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/15 blur-2xl" />
            <img
              src={boardroom}
              alt="Strategy session in a modern boardroom"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-3xl border border-primary/20 object-cover shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.title} className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-card p-10 transition-all hover:border-primary/50">
              <div className="absolute right-0 top-0 h-40 w-40 -translate-y-16 translate-x-16 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:bg-primary/20" />
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <s.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 grid gap-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-foreground/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-primary/30 bg-gradient-card p-10 text-center shadow-glow">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Not sure which service fits?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Take a free 30-minute consultation and we'll diagnose the highest-leverage move for your business.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow">
            Book consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
