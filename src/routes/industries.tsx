import { createFileRoute } from "@tanstack/react-router";
import { Building2, Banknote, ShoppingBasket, Scale, Stethoscope, ShieldCheck, Umbrella, Wheat, Hotel, GraduationCap } from "lucide-react";
import realEstateImg from "@/assets/industry-realestate-crew.png";
import fintechImg from "@/assets/industry-fintech-robot.png";
import fmcgImg from "@/assets/industry-fmcg-ops.png";
import securityImg from "@/assets/industry-security.png";
import lawImg from "@/assets/industry-law.png";
import agricultureImg from "@/assets/industry-agriculture.png";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries, Business Movers" },
      { name: "description", content: "Sector-aware business development across Real Estate, Fintech, FMCG, Law, Medical, Security, Insurance, Agriculture, Hospitality and Education." },
    ],
  }),
  component: IndustriesPage,
});

const industries = [
  { icon: Building2, title: "Real Estate", desc: "Brand strategy, lead engines and expansion planning for developers, agencies and proptech." },
  { icon: Banknote, title: "Fintech", desc: "Positioning, growth marketing and go-to-market for ambitious financial technology firms." },
  { icon: ShoppingBasket, title: "FMCG", desc: "Distribution strategy, brand systems and demand creation for fast-moving consumer goods." },
  { icon: Scale, title: "Law Firms", desc: "Modernised positioning, content authority and client acquisition systems for legal practices." },
  { icon: Stethoscope, title: "Medical Industry", desc: "Patient-centric brand and operational strategy for clinics, hospitals and healthtech." },
  { icon: ShieldCheck, title: "Security", desc: "Trust-led marketing and growth planning for security firms and personal protection services." },
  { icon: Umbrella, title: "Insurance", desc: "Product positioning, agent enablement and digital acquisition for insurers." },
  { icon: Wheat, title: "Agriculture", desc: "Value chain analysis, agribusiness planning and market access for agro enterprises." },
  { icon: Hotel, title: "Hospitality & Tourism", desc: "Guest experience, digital presence and revenue strategy for hotels and tourism brands." },
  { icon: GraduationCap, title: "Education & EdTech", desc: "Enrolment marketing, curriculum positioning and digital transformation for institutions." },
];

function IndustriesPage() {
  return (
    <div className="theme-white-teal">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our Expertise Spans Across</span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
            Ten industries. <span className="text-gradient">One standard.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We bring sector aware insight to every engagement, pairing universal strategy with the language and rhythm of your industry.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-20">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Industries in motion</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Where our work shows up.</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { img: realEstateImg, label: "Real Estate", caption: "On-the-ground project teams powering developer growth and brand-led acquisition." },
            { img: fintechImg, label: "Fintech", caption: "Positioning and growth strategy for data-driven, technology-first financial products." },
            { img: fmcgImg, label: "FMCG", caption: "Operations, distribution and demand engines for fast-moving consumer brands." },
            { img: securityImg, label: "Security", caption: "Trust-led marketing and growth planning for private security and protection firms." },
            { img: lawImg, label: "Law Firms", caption: "Modern positioning and client acquisition systems for serious legal practices." },
            { img: agricultureImg, label: "Agriculture", caption: "Value chain strategy and market access for agribusiness and agro enterprises." },
          ].map((f) => (
            <figure key={f.label} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={f.img} alt={f.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <figcaption className="p-5">
                <div className="font-display text-lg font-semibold text-primary">{f.label}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <div key={i.title} className="group rounded-2xl border border-border bg-gradient-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <i.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold">{i.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
