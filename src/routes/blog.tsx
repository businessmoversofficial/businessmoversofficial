import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, Gift } from "lucide-react";
import { getPublishedPosts } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Lead Magnets, Business Movers" },
      { name: "description", content: "Practical playbooks, templates, and frameworks from Business Movers, covering strategy, marketing, fundraising, and growth for African businesses." },
      { property: "og:title", content: "Blog & Lead Magnets, Business Movers" },
      { property: "og:description", content: "Free playbooks, templates and frameworks for ambitious African founders." },
    ],
    links: [{ rel: "canonical", href: "https://businessmoversofficial.lovable.app/blog" }],
  }),
  loader: () => getPublishedPosts(),
  component: BlogIndexPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-2xl font-bold">Could not load posts</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function BlogIndexPage() {
  const posts = Route.useLoaderData() as Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string | null;
    read_time: string | null;
    lead_magnet_title: string | null;
    published_at: string | null;
  }>;
  return (
    <div className="theme-blog-white">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Insights & Lead Magnets</span>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">
            Playbooks for <span className="text-gradient">ambitious founders.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            Practical frameworks, templates, and lessons from the front lines of African business development, free for you to use.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts published yet, check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="blog-card group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              >
                {p.category && (
                  <span className="self-start rounded-full border border-primary/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                )}
                <h2 className="mt-4 font-display text-xl font-bold leading-tight md:text-2xl">{p.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                {p.lead_magnet_title && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                    <Gift className="h-3.5 w-3.5" /> {p.lead_magnet_title}
                  </div>
                )}
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-3">
                    {p.published_at && (
                      <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(p.published_at).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</span>
                    )}
                    {p.read_time && (
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.read_time}</span>
                    )}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
