export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  leadMagnet?: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "5-reasons-businesses-fail-in-nigeria",
    title: "5 Reasons Businesses Fail in Nigeria (and How to Avoid Them)",
    excerpt: "Roughly half of Nigerian businesses don't see their fifth birthday. Here are the five fixable patterns we see again and again — and what to do about them.",
    category: "Business Strategy",
    readTime: "6 min read",
    publishedAt: "2025-09-12",
    leadMagnet: "Free 30-Minute Business Diagnostic Call",
    content: [
      "Over the past five years, we've worked with hundreds of founders across fintech, real estate, FMCG, hospitality, and professional services. The pattern is depressingly consistent: most businesses don't fail because of bad products. They fail because of fixable structural gaps.",
      "**1. No clear positioning.** If your customer cannot say in one sentence why you exist and who you serve, you don't have a brand — you have noise. Positioning isn't a tagline; it's a strategic choice about who you say no to.",
      "**2. Weak financial literacy.** Founders often confuse revenue with profit, and cash with margin. Without a basic monthly P&L, cash-flow forecast, and runway tracker, you are flying blind.",
      "**3. Leadership gaps.** A solo founder can take a business to ~₦10M/year. Beyond that, you need a real management layer — sales, finance, ops — or growth stalls.",
      "**4. Generic marketing.** 'Boost-the-post' on Instagram is not a strategy. You need ICP definition, channel selection, and a measurable funnel.",
      "**5. No documented playbooks.** When everything lives in the founder's head, the business cannot scale, cannot be sold, and cannot survive the founder taking a holiday.",
      "The good news: each of these is fixable in 30–90 days with the right diagnosis. That's exactly what our Business Strategic Consult is built for.",
    ],
  },
  {
    slug: "pitch-deck-essentials-african-founders",
    title: "The 10-Slide Pitch Deck Every African Founder Should Have",
    excerpt: "Investors decide in under 4 minutes whether to keep reading. Here is the exact 10-slide structure we use with our pitch deck clients — and the most common mistakes to avoid.",
    category: "Fundraising",
    readTime: "8 min read",
    publishedAt: "2025-10-04",
    leadMagnet: "Free Pitch Deck Template (PDF)",
    content: [
      "A pitch deck is not a brochure. It is a decision-making tool designed to move an investor from cold to curious in under five minutes. After reviewing and rebuilding hundreds of decks, here is the structure that consistently performs best for African founders.",
      "**Slide 1 — Title & one-line value proposition.** Company name, what you do, for whom. No jargon.",
      "**Slide 2 — Problem.** Sharp, painful, with a number attached. 'Smallholder farmers in Nigeria lose 40% of harvest post-storage' beats 'Agriculture is broken.'",
      "**Slide 3 — Solution.** Show the product. A screenshot beats a paragraph.",
      "**Slide 4 — Market size.** TAM / SAM / SOM, top-down AND bottom-up. Investors discount your top-down number by 80%.",
      "**Slide 5 — Traction.** Revenue, users, retention, partnerships. If you have none, show one strong proof point (LOIs, waitlist, pilot).",
      "**Slide 6 — Business model.** How you make money, unit economics, pricing.",
      "**Slide 7 — Go-to-market.** How you acquire customers and at what cost.",
      "**Slide 8 — Competition.** A 2x2 or feature matrix. 'We have no competitors' is a red flag.",
      "**Slide 9 — Team.** Why YOU. Relevant founder-market fit.",
      "**Slide 10 — The ask.** How much you're raising, runway, key milestones, use of funds.",
      "Want us to build or audit your deck? We've helped founders raise pre-seed through Series A across Lagos, Nairobi, and Cape Town.",
    ],
  },
  {
    slug: "market-research-before-launch",
    title: "Market Research You Must Do BEFORE You Launch (Not After)",
    excerpt: "Most founders skip real market research and pay for it in burned cash later. This is the lightweight 5-step research process every pre-launch business should run.",
    category: "Market Research",
    readTime: "7 min read",
    publishedAt: "2025-11-01",
    leadMagnet: "Free Pre-Launch Market Research Checklist",
    content: [
      "If launching feels expensive, killing a wrong launch is even more expensive. Here is the lean pre-launch research process we run with our early-stage clients — typically completed in 2–3 weeks.",
      "**Step 1 — Define the ICP, not the demographic.** 'Women aged 25–34' is not an ICP. 'Salary-earning women in Lagos and Abuja, earning ₦400k+/month, who already pay for premium grocery delivery' is.",
      "**Step 2 — Run 15–25 customer interviews.** Not surveys — interviews. Ask about past behaviour, not future intent. People lie about what they'll buy. They don't lie about what they bought last month.",
      "**Step 3 — Map the competitive landscape.** Direct, indirect, and substitute. Most founders only see direct competitors and get blindsided by substitutes.",
      "**Step 4 — Validate willingness to pay.** Get a verbal price commitment, a deposit, or a signed LOI. If nobody will pay before you build, nobody will pay after.",
      "**Step 5 — Stress-test unit economics.** CAC, LTV, gross margin, payback period. If the math doesn't work on paper, it won't work in market.",
      "We run this exact process as a 2-week sprint for founders. By the end you either launch with conviction — or save yourself ₦10M and 18 months.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
