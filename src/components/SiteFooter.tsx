import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, Phone, Youtube, Twitter, Music2 } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-background/40 p-1.5 ring-1 ring-primary/30">
              <img src={logo} alt="Business Movers" className="h-8 w-8 object-contain invert" />
            </div>
            <div>
              <div className="font-display font-bold tracking-wider">BUSINESS MOVERS</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Positioning Businesses for Excellence</div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            We are architects of excellence — sincerely passionate and committed to alleviating poverty through business and economic development.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="https://instagram.com/businessmoversofficial" className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/kehinde-adelakun-284790218" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="mailto:businessmoversofficial@gmail.com" className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
            <li><Link to="/industries" className="text-muted-foreground hover:text-primary">Industries</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">Connect</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>0912 705 0547</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>businessmoversofficial@gmail.com</span></li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-primary" /><span>@businessmoversofficial</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Business Movers. All rights reserved. RC: 7285941</span>
          <div className="flex items-center gap-4">
            <span>Architects of Excellence.</span>
            <Link to="/login" className="hover:text-primary">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
