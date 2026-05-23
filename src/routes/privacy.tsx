import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy , Business Movers" },
      { name: "description", content: "How Business Movers collects, uses, and protects your personal data." },
      { property: "og:title", content: "Privacy Policy , Business Movers" },
      { property: "og:description", content: "How Business Movers collects, uses, and protects your personal data." },
    ],
    links: [{ rel: "canonical", href: "https://businessmoversofficial.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Legal</span>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        <section>
          <h2 className="font-display text-xl font-bold text-foreground">1. Who we are</h2>
          <p className="mt-2">Business Movers (RC: 7285941) is a business development consultancy registered in Nigeria. In this policy "we", "us" and "our" refer to Business Movers.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">2. Information we collect</h2>
          <p className="mt-2">When you contact us, subscribe to our newsletter, or book a consultation, we may collect: your name, business name, email address, phone number, industry, business stage, revenue range, your stated challenges and goals, and how you heard about us. We also collect basic analytics data (pages visited, device type, approximate location) via cookies.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">3. How we use your information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>To respond to your enquiry and deliver requested services.</li>
            <li>To qualify leads and tailor consultation conversations.</li>
            <li>To send newsletters and business insights (only if you subscribe).</li>
            <li>To improve our website, content, and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">4. Lawful basis</h2>
          <p className="mt-2">We process personal data on the basis of your consent (forms, newsletter), the necessity of performing a contract you have asked us to enter into, and our legitimate interest in operating and improving our business.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">5. Cookies</h2>
          <p className="mt-2">We use essential cookies for site functionality and optional analytics cookies. A consent banner appears on your first visit so you can accept or decline non-essential cookies.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">6. Sharing and disclosure</h2>
          <p className="mt-2">We do not sell your personal data. We may share it with trusted service providers who help us operate our site (e.g. hosting, email, analytics), all bound by confidentiality. We may also disclose data when required by law.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">7. Data retention</h2>
          <p className="mt-2">We retain contact submissions and subscriber data only for as long as necessary to provide our services or as required by law. You may request deletion at any time.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">8. Your rights</h2>
          <p className="mt-2">You have the right to access, correct, or request deletion of your personal data, withdraw consent, and lodge a complaint with the relevant data protection authority. To exercise these rights, email us at <a className="text-primary hover:underline" href="mailto:businessmoversofficial@gmail.com">businessmoversofficial@gmail.com</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">9. Security</h2>
          <p className="mt-2">We use reasonable technical and organisational measures to protect your personal data, but no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground">10. Contact</h2>
          <p className="mt-2">Questions? Email <a className="text-primary hover:underline" href="mailto:businessmoversofficial@gmail.com">businessmoversofficial@gmail.com</a> or call <a className="text-primary hover:underline" href="tel:+2349127050547">0912 705 0547</a>.</p>
        </section>
      </div>
    </div>
  );
}
