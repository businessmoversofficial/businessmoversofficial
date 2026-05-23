import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Compass,
  Megaphone,
  Globe2,
  Mail,
  Search,
  Target,
  CheckCircle2,
  Quote,
  Star,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import founder from "@/assets/founder-portrait.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Movers — Positioning Businesses for Excellence" },
      { name: "description", content: "Tailored strategies, market research, and digital growth services that position your business for long-term excellence." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Search, title: "Market Research & Analysis", desc: "Understand your audience, refine pricing, and shape strategy with rigorous market intelligence." },
  { icon: Compass, title: "Strategic Planning", desc: "SWOT, PESTLE and growth roadmaps that turn limited resources into compounding momentum." },
  { icon: Target, title: "Marketing & Sales Strategy", desc: "Brand presence, customer relationships and demand engines built around your clime." },
  { icon: Megaphone, title: "Advertising Strategy", desc: "Tailored campaigns with creatives, targeting and KPI tracking — engineered for scale." },
  { icon: Globe2, title: "Digital Strategy", desc: "Content, SEO, social, email and web design from a team of specialist digital marketers." },
  { icon: BarChart3, title: "Business Development", desc: "Pitch decks, expansion plans and proposals that set you up for long-term growth." },
];

const industries = [
  "Real Estate", "Fintech", "FMCG", "Law Firms", "Medical Industry",
  "Security", "Insurance", "Agriculture", "Hospitality & Tourism", "Education & EdTech",
];

const stats = [
  { v: "10+", l: "Industries Served" },
  { v: "20%", l: "Of new businesses fail in 2 years — we change that" },
  { v: "100%", l: "Tailored Strategy" },
  { v: "24/7", l: "Client Support" },
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-32 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Our USP
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Positioning <span className="text-gradient">Businesses</span> for Excellence
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              From in-depth market analysis to expertly crafted business proposals, pitch decks,
              and expansion plans — we provide all-in-one business development support that sets
              you up for long-term growth.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Book a 30-min consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary"
              >
                Explore services
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-cyan opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-card shadow-soft">
              <img
                src={founder}
                alt="Adelakun Kehinde — Founder, Business Movers"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6">
                <div className="font-display text-lg font-bold text-primary">Adelakun Kehinde</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">B.Sc., M.Sc., MNITP, RTP — Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl font-bold text-primary md:text-5xl">{s.v}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">What we do</span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold md:text-5xl">
              Comprehensive business development, end to end.
            </h2>
          </div>
          <Link to="/services" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View all services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our expertise spans across</span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                Ten industries. <br />One standard: <span className="text-gradient">excellence.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Whether you're scaling a fintech, building a real-estate brand, or modernising a law firm — we bring sector-aware strategy to every engagement.
              </p>
              <Link to="/industries" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                See all industries <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {industries.map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" /> {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-card p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
                Contact us today for a <span className="text-gradient">30-minute</span> free consultation.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Let's diagnose where your business is, and architect where it's going. No obligation.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cyan px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <Mail className="h-4 w-4" /> Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
