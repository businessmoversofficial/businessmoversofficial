import { createFileRoute } from "@tanstack/react-router";
import { Award, Lightbulb, ShieldCheck, Users, Target, Zap, Sparkles, Linkedin, Briefcase, Megaphone, Scale, Wallet, BarChart3, Palette, TrendingUp } from "lucide-react";
import founder from "@/assets/founder-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About, Business Movers" },
      { name: "description", content: "Architects of excellence, passionate and committed to alleviating poverty through business and economic development." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Award, title: "Excellence", desc: "We consistently strive for the highest standards of quality, continuously improving via strategic & ingenious business development ideas." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace creative thinking and innovative solutions to stay at the forefront of industry trends." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honesty, transparency, and ethical conduct in all interactions, building trust with every partner." },
  { icon: Users, title: "Client-Centric", desc: "Our clients' success is at the heart of everything we do. Tailored solutions, every time." },
  { icon: Target, title: "Results-Driven", desc: "Focused on delivering measurable outcomes and helping clients achieve their objectives." },
  { icon: Zap, title: "Adaptability", desc: "We thrive in dynamic environments, helping our clients navigate evolving markets and challenges." },
];

const team = [
  { name: "Adelakun Kehinde", role: "Managing Director", icon: Briefcase },
  { name: "Sarah Shitan", role: "Head of Digital Marketing", icon: Megaphone },
  { name: "Ajayi Samuel", role: "Legal & Compliance", icon: Scale },
  { name: "Adelakun Taiwo", role: "Head of Finance", icon: Wallet },
  { name: "Odusola Ayokunle", role: "Data Analyst", icon: BarChart3 },
  { name: "Mayowa Daniel", role: "Product Designer", icon: Palette },
  { name: "Oluseye Salako", role: "Head of Sales & Marketing", icon: TrendingUp },
];

function AboutPage() {
  const linkedinUrl = "https://www.linkedin.com/in/kehinde-adelakun-284790218";

  return (
    <div>
      <section className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">About Business Movers</span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
            Architects of <span className="text-gradient">excellence.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground" style={{ textAlign: "justify" }}>
            Business Movers was born out of the need to fix the gaps faced by business owners and entrepreneurs. We are more than just consultants, we are sincerely passionate and committed to alleviating poverty through business and economic development.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-gradient-card p-10">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="mt-5 font-display text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground" style={{ textAlign: "justify" }}>
              To position businesses for excellence by providing tailored strategies, innovative solutions, and expert guidance. We are dedicated to helping our clients achieve their highest potential, driving revenue growth, and fostering a culture of continuous improvement.
            </p>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-gradient-card p-10 shadow-glow">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="mt-5 font-display text-3xl font-bold">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground" style={{ textAlign: "justify" }}>
              To be the industry leader in business development consultancy, setting the standard for excellence and innovation. We envision a future where every business we touch not only thrives but defines the benchmarks of success.
            </p>
          </div>
        </div>
      </section>

      {/* EXEC SUMMARY */}
      <section className="border-y border-border bg-surface/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/15 blur-2xl" />
            <img src={founder} alt="Founder portrait" loading="lazy" width={1024} height={1280} className="rounded-3xl border border-primary/20 object-cover shadow-soft" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Why we exist</span>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              50% of businesses don't survive five years. <br /><span className="text-gradient">We're changing that.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground" style={{ textAlign: "justify" }}>
              Business growth is directly linked to employment, poverty alleviation, and GDP contribution. After years of research, we identified the patterns shared by businesses that fail and those that stagnate, leadership gaps, weak market demand, competitive pressure, inadequate planning, poor financial management.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground" style={{ textAlign: "justify" }}>
              These problems are fixable. Business Movers exists to fix them.
            </p>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                window.open(linkedinUrl, "_blank", "noopener,noreferrer");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Connect with Kehinde on LinkedIn <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* MANAGEMENT TEAM */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Meet the team</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Management Team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A multi-disciplinary leadership team uniting strategy, marketing, finance, legal, design, and analytics under one roof.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-border bg-gradient-card p-7 transition-all hover:-translate-y-1 hover:border-primary/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{m.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our core values</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">The driving force behind everything we do.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-gradient-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
