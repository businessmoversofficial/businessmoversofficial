import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Business Movers" },
      { name: "description", content: "The terms and conditions that govern your use of the Business Movers website and services." },
      { property: "og:title", content: "Terms of Service — Business Movers" },
      { property: "og:description", content: "The terms and conditions that govern your use of the Business Movers website and services." },
    ],
    links: [{ rel: "canonical", href: "https://businessmoversofficial.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Legal</span>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        <section>
          <h2 className="font-display text-xl font-bold text-foreground">1. Acceptance of terms</h2>
          <p className="mt-2">By accessing this website or engaging Business Movers (RC: 7285941) for services, you agree to these Terms of Service. If you do not agree, please discontinue use.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">2. Our services</h2>
          <p className="mt-2">Business Movers provides business development consultancy, including but not limited to market research, strategy, branding, digital marketing, financial modelling, business documentation, and training. Specific deliverables, timelines, and fees for engagements are governed by a separate written proposal or agreement.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">3. Use of website</h2>
          <p className="mt-2">You agree to use this site lawfully and not to attempt to disrupt, hack, or misuse it. We may suspend access at any time without notice.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">4. Intellectual property</h2>
          <p className="mt-2">All content on this site — text, graphics, logos, frameworks, and methodologies — is the property of Business Movers or its licensors, and may not be reproduced or redistributed without written permission.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">5. Confidentiality</h2>
          <p className="mt-2">Client engagements are governed by a Non-Disclosure Agreement (NDA). We treat your business information with the strictest professional discretion.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">6. No guarantee of results</h2>
          <p className="mt-2">We bring expertise, frameworks, and proven methodologies, but business outcomes depend on many factors including execution, market conditions, and your team. We make no warranty of specific financial results.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">7. Limitation of liability</h2>
          <p className="mt-2">To the maximum extent permitted by law, Business Movers shall not be liable for indirect, incidental, or consequential damages arising from use of this website or our services.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">8. Third-party links</h2>
          <p className="mt-2">This site may contain links to third-party websites. We are not responsible for the content or practices of those sites.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">9. Governing law</h2>
          <p className="mt-2">These terms are governed by the laws of the Federal Republic of Nigeria. Disputes shall be resolved in the appropriate courts of Lagos State.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">10. Changes</h2>
          <p className="mt-2">We may update these terms periodically. Continued use of the site after changes constitutes acceptance of the revised terms.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">11. Contact</h2>
          <p className="mt-2">Email <a className="text-primary hover:underline" href="mailto:businessmoversofficial@gmail.com">businessmoversofficial@gmail.com</a> or call <a className="text-primary hover:underline" href="tel:+2349127050547">0912 705 0547</a>.</p>
        </section>
      </div>
    </div>
  );
}
