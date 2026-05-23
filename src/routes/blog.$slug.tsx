import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Gift, MessageCircle } from "lucide-react";
import { getPostBySlug } from "@/lib/blog-posts";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    return {
      meta: [
        { title: post ? `${post.title} , Business Movers` : "Article , Business Movers" },
        { name: "description", content: post?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post?.title ?? "" },
        { property: "og:description", content: post?.excerpt ?? "" },
        { property: "og:url", content: `https://businessmoversofficial.lovable.app/blog/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://businessmoversofficial.lovable.app/blog/${params.slug}` }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.excerpt,
                datePublished: post.publishedAt,
                author: { "@type": "Organization", name: "Business Movers" },
                publisher: { "@type": "Organization", name: "Business Movers" },
              }),
            },
          ]
        : [],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => {
    const { slug } = Route.useParams();
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find "{slug}".</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </div>
    );
  },
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
        Try again
      </button>
    </div>
  ),
});

function renderParagraph(text: string, i: number) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={j} className="text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={j}>{part}</span>;
  });
  return (
    <p key={i} className="text-base leading-relaxed text-muted-foreground md:text-lg">
      {parts}
    </p>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <div className="mt-8">
        <span className="rounded-full border border-primary/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {post.category}
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>
      </div>

      <div className="mt-10 space-y-5">
        {post.content.map(renderParagraph)}
      </div>

      {post.leadMagnet && (
        <div className="mt-12 rounded-3xl border border-primary/30 bg-gradient-card p-8 shadow-glow">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Gift className="h-3.5 w-3.5" /> Free Resource
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">{post.leadMagnet}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Drop your email to get the resource and join our newsletter for weekly playbooks.
          </p>
          <div className="mt-5">
            <NewsletterSignup source={`lead-magnet:${post.slug}`} />
          </div>
        </div>
      )}

      <div className="mt-14 rounded-3xl border border-border bg-gradient-card p-8">
        <h3 className="font-display text-xl font-bold">Ready to move your business forward?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Book a free 30-minute Business Growth Consultation. No obligation.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-full bg-gradient-cyan px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Book consultation
          </Link>
          <a href="https://wa.me/2349127050547" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white">
            <MessageCircle className="h-4 w-4" /> WhatsApp us
          </a>
        </div>
      </div>
    </article>
  );
}
