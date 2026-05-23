import { useState } from "react";
import { z } from "zod";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.string().trim().email("Enter a valid email").max(255);

export function NewsletterSignup({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: parsed.data,
      source,
    });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.success("You're already subscribed. Thank you!");
        setDone(true);
        return;
      }
      toast.error("Could not subscribe. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Subscribed. Welcome to the list.");
  }

  if (done) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground">
        <CheckCircle2 className="h-4 w-4 text-primary" /> You're on the list.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-full border border-input bg-background/60 py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
      </button>
    </form>
  );
}
