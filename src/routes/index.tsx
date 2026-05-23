import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Compass,
  Copy,
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

const clients = [
  "Noble Guard Security",
  "Baker Industries Limited",
  "Oddspace Consult",
  "Novasmile Dental Studios",
  "HypeMan Africa",
  "GE Homes & Properties Limited",
  "Absolute Grace Investment Limited",
  "Dukioluwa Industries Limited",
  "DHS Investment Limited",
];

const testimonials = [
  {
    quote:
      "Business Movers rebuilt our go-to-market from the ground up. Within two quarters we doubled qualified leads and finally had a property strategy our board could stand behind.",
    name: "GE Homes & Properties Limited",
    role: "Executive Team",
  },
  {
    quote:
      "Their market research was the most rigorous we've ever commissioned. The expansion plan they crafted positioned us to scale across new regions with real confidence.",
    name: "Baker Industries Limited",
    role: "Management",
  },
  {
    quote:
      "Business Movers opened doors we didn't know existed. Their market intelligence unlocked new revenue streams and helped us expand into territories we'd long considered out of reach.",
    name: "Dukioluwa Industries Limited",
    role: "Management",
  },
];

const videoUrl = "https://www.youtube.com/watch?v=4Wu72VV6kvk";

function HomePage() {
  const [copiedVideoLink, setCopiedVideoLink] = useState(false);

  const copyVideoLink = async () => {
    await navigator.clipboard.writeText(videoUrl);
    setCopiedVideoLink(true);
    window.setTimeout(() => setCopiedVideoLink(false), 2000);
  };

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

      {/* VIDEO */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Watch</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            See Business Movers <span className="text-gradient">in action.</span>
          </h2>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-card shadow-soft">
          <div className="relative aspect-video w-full">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/4Wu72VV6kvk"
              title="Business Movers video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Trouble playing here? Watch it directly on YouTube.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Open on YouTube <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={copyVideoLink}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                {copiedVideoLink ? "Link copied" : "Copy link"} <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
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

      {/* CLIENT LOGOS */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Trusted by</span>
            <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              Brands across ten industries
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/60 sm:grid-cols-3 md:grid-cols-4">
            {clients.map((c) => (
              <div
                key={c}
                className="flex h-24 items-center justify-center bg-background px-4 text-center font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS MOVERS PRODUCTS */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Business Movers Products</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Tools that <span className="text-gradient">move you forward.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-10 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-card p-8 md:grid-cols-2 md:items-center md:p-12">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-cyan opacity-20 blur-2xl" />
              <div className="overflow-hidden rounded-2xl border border-primary/20 bg-background/40 shadow-soft">
                <img
                  src="/ebook-side-hustles-cover.jpg"
                  alt="Side Hustles For Nigerian House Wives — eBook mockup"
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                eBook
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Side Hustles For Nigerian House Wives
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our eBook gives you <strong className="text-foreground">64 practical side hustle ideas across 12 categories</strong> — designed specifically for busy Nigerian women looking to build income while managing home.
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-primary">₦6,999</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">one-time</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://selar.com/7kz1856l77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  Get it here <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-background/50 p-5 text-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pay direct (optional)</div>
                <dl className="mt-3 grid gap-2 text-foreground/90">
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Bank</dt><dd className="font-medium">Providus Bank</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Account Name</dt><dd className="font-medium">Swift Business Movers</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Account Number</dt><dd className="font-medium">1306896393</dd></div>
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  After payment, send proof + email and we'll deliver instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">What clients say</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Results our partners <span className="text-gradient">stand behind.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative flex flex-col rounded-2xl border border-border bg-gradient-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              >
                <Quote className="h-7 w-7 text-primary/60" />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <div className="mt-6 flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <div className="font-display text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
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
