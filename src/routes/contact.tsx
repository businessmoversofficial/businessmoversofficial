import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, Instagram, Linkedin, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Business Movers" },
      { name: "description", content: "Book a free 30-minute consultation with Business Movers. Reach us by email, phone, or social." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  industry: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      industry: String(fd.get("industry") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      industry: parsed.data.industry || null,
      message: parsed.data.message,
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
            Contact us today for a 30-minute free consultation. No obligation — just a clear-eyed look at where you are and where you could be.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
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
            <a href="https://instagram.com/businessmoversofficial" className="flex items-start gap-4 rounded-2xl border border-border bg-gradient-card p-6 transition-colors hover:border-primary/50">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Instagram & TikTok</div>
                <div className="mt-1 font-medium">@businessmoversofficial</div>
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
                <div className="mt-1 font-medium">RC: 7285941 — Nigeria</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-primary/20 bg-gradient-card p-8 shadow-soft md:p-10"
          >
            <h2 className="font-display text-2xl font-bold">Tell us about your business</h2>
            <p className="mt-2 text-sm text-muted-foreground">We'll get back within 24 hours.</p>

            {sent ? (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="font-display text-xl font-semibold">Message received.</h3>
                <p className="text-sm text-muted-foreground">Thank you. We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <Field label="Company" name="company" />
                <Field label="Industry" name="industry" placeholder="e.g. Fintech, Real Estate, FMCG…" />
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How can we help?</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    maxLength={2000}
                    className="mt-2 w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="Tell us about your goals, challenges, and what success looks like."
                  />
                </div>
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
