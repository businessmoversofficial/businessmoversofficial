import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "bm-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md">
      <div className="rounded-2xl border border-primary/30 bg-background/95 p-5 shadow-glow backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-sm font-semibold">We use cookies</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              We use cookies to improve your experience, analyse traffic, and remember your preferences. See our{" "}
              <Link to="/privacy" className="text-primary underline-offset-2 hover:underline">Privacy Policy</Link>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => decide("accepted")}
                className="rounded-full bg-gradient-cyan px-4 py-2 text-xs font-semibold text-primary-foreground shadow-glow"
              >
                Accept all
              </button>
              <button
                onClick={() => decide("declined")}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary"
              >
                Decline
              </button>
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={() => decide("declined")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
