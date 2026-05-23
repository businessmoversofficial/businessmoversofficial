import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, Instagram, Linkedin, MapPin, Send, CheckCircle2, Loader2, Youtube, Twitter, Music2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact , Business Movers" },
      { name: "description", content: "Book a free 30-minute consultation with Business Movers. Reach us by email, phone, or social." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  business_name: z.string().trim().max(200).optional().or(z.literal("")),
  industry: z.string().trim().max(200).optional().or(z.literal("")),
  years_in_business: z.string().max(50).optional().or(z.literal("")),
  business_stage: z.string().max(50).optional().or(z.literal("")),
  biggest_challenge: z.string().max(100).optional().or(z.literal("")),
  monthly_revenue: z.string().max(50).optional().or(z.literal("")),
  success_outcome: z.string().trim().max(1000).optional().or(z.literal("")),
  hear_about_us: z.string().trim().max(200).optional().or(z.literal("")),
  preferred_contact: z.string().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please add a short message").max(2000),
});

const yearsOptions = ["Less than 1 year", "1 to 3 years", "3 to 5 years", "5+ years"];
const stageOptions = ["Idea stage", "Just launched", "Growing but stuck", "Scaling"];
const challengeOptions = ["Entering a new market", "Growing revenue", "Fixing business structure", "All of the above"];
const revenueOptions = ["Pre revenue", "Under ₦500k", "₦500k to ₦2M", "₦2M to ₦10M", "Above ₦10M"];
const contactOptions = ["Phone number", "Email", "WhatsApp"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      business_name: String(fd.get("business_name") ?? ""),
      industry: String(fd.get("industry") ?? ""),
      years_in_business: String(fd.get("years_in_business") ?? ""),
      business_stage: String(fd.get("business_stage") ?? ""),
      biggest_challenge: String(fd.get("biggest_challenge") ?? ""),
      monthly_revenue: String(fd.get("monthly_revenue") ?? ""),
      success_outcome: String(fd.get("success_outcome") ?? ""),
      hear_about_us: String(fd.get("hear_about_us") ?? ""),
      preferred_contact: String(fd.get("preferred_contact") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const d = parsed.data;
    const { error } = await supabase.from("contact_submissions").insert({
      name: d.name,
      email: d.email,
      company: d.business_name || null,
      business_name: d.business_name || null,
      industry: d.industry || null,
      years_in_business: d.years_in_business || null,
      business_stage: d.business_stage || null,
      biggest_challenge: d.biggest_challenge || null,
      monthly_revenue: d.monthly_revenue || null,
      success_outcome: d.success_outcome || null,
      hear_about_us: d.hear_about_us || null,
      preferred_contact: d.preferred_contact || null,
      message: d.message,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    setSent(true);
  }

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Connect With Us</span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
            Let's position your business for <span className="text-gradient">excellence.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Contact us today for a 30-minute free consultation. The short questionnaire below helps us prepare so we can give you real value from minute one.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          {/* CONTACT INFO */}
          <div className="space-y-4">
            <a href="mailto:businessmoversofficial@gmail.com" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                <div className="mt-1 font-medium">businessmoversofficial@gmail.com</div>
              </div>
            </a>
            <a href="tel:+2349127050547" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone / WhatsApp</div>
                <div className="mt-1 font-medium">0912 705 0547</div>
              </div>
            </a>
            <a href="https://www.instagram.com/businessmoversofficial?igsh=YXc0aGRuNmtlemc4" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Instagram</div>
                <div className="mt-1 font-medium">@businessmoversofficial</div>
              </div>
            </a>
            <a href="https://www.tiktok.com/@businessmoversofficial?_r=1&_t=ZS-96bVvAVD9OP" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Music2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">TikTok</div>
                <div className="mt-1 font-medium">@businessmoversofficial</div>
              </div>
            </a>
            <a href="https://youtube.com/@businessmovers_official?si=sdAqtIzRlvt_betQ" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Youtube className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">YouTube</div>
                <div className="mt-1 font-medium">@businessmovers_official</div>
              </div>
            </a>
            <a href="https://x.com/business_movers" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Twitter className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">X (Twitter)</div>
                <div className="mt-1 font-medium">@business_movers</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/kehinde-adelakun-284790218" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</div>
                <div className="mt-1 font-medium">Kehinde Adelakun</div>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Registered</div>
                <div className="mt-1 font-medium">RC: 7285941 , Nigeria</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-primary/20 bg-gradient-card p-8 shadow-soft md:p-10"
          >
            <h2 className="font-display text-2xl font-bold">Tell us about your business</h2>
            <p className="mt-2 text-sm text-muted-foreground">A short pre-qualification questionnaire. Takes ~2 minutes.</p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="font-display text-xl font-semibold">Message received.</h3>
                <p className="text-sm text-muted-foreground">Thank you. We'll review your responses and be in touch within 24 hours.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Your name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Business name" name="business_name" />
                  <Field label="Industry" name="industry" placeholder="e.g. Fintech, Real Estate, FMCG…" />
                </div>

                <RadioGroup label="How long have you been in business?" name="years_in_business" options={yearsOptions} />
                <RadioGroup label="What stage is your business currently at?" name="business_stage" options={stageOptions} />
                <RadioGroup label="What is your biggest challenge right now?" name="biggest_challenge" options={challengeOptions} />
                <RadioGroup label="What does your monthly revenue look like currently?" name="monthly_revenue" options={revenueOptions} />

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    What would a successful outcome look like for you in the next 90 days?
                  </label>
                  <textarea
                    name="success_outcome"
                    rows={3}
                    maxLength={1000}
                    className="mt-2 w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="e.g. Close 5 new enterprise clients, launch in 2 new cities, raise pre-seed…"
                  />
                </div>

                <Field label="How did you hear about Business Movers?" name="hear_about_us" placeholder="e.g. Instagram, referral, Google…" />

                <RadioGroup label="What is the best way to reach you?" name="preferred_contact" options={contactOptions} />

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Anything else we should know?</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    maxLength={2000}
                    className="mt-2 w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="Brief context, urgency, timelines, budget , whatever helps us prepare."
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cyan px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? (<>Sending <Loader2 className="h-4 w-4 animate-spin" /></>) : (<>Send message <Send className="h-4 w-4" /></>)}
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}

function RadioGroup({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="cursor-pointer rounded-full border border-input bg-background/60 px-4 py-2 text-xs transition-colors hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/15 has-[:checked]:text-primary"
          >
            <input type="radio" name={name} value={opt} className="sr-only" />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
