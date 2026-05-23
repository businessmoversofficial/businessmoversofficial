import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import {
  adminDeletePost,
  adminGetPost,
  adminListPosts,
  adminUpsertPost,
} from "@/lib/blog.functions";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({
    meta: [
      { title: "Manage Blog, Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminBlogPage,
});

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string | null;
  read_time: string | null;
  lead_magnet_title: string | null;
  lead_magnet_description: string | null;
  lead_magnet_cta: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

type FormState = {
  id: string | null;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  read_time: string;
  lead_magnet_title: string;
  lead_magnet_description: string;
  lead_magnet_cta: string;
  published: boolean;
};

const emptyForm: FormState = {
  id: null,
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  read_time: "",
  lead_magnet_title: "",
  lead_magnet_description: "",
  lead_magnet_cta: "",
  published: false,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function AdminBlogPage() {
  const navigate = useNavigate();
  const listFn = useServerFn(adminListPosts);
  const getFn = useServerFn(adminGetPost);
  const upsertFn = useServerFn(adminUpsertPost);
  const deleteFn = useServerFn(adminDeletePost);

  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate({ to: "/login" });
        return;
      }
      try {
        const items = await listFn();
        if (!mounted) return;
        setPosts(items as Post[]);
      } catch {
        toast.error("Could not load posts, are you an admin?");
        navigate({ to: "/admin" });
        return;
      } finally {
        if (mounted) {
          setLoading(false);
          setChecking(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [listFn, navigate]);

  async function refresh() {
    setLoading(true);
    try {
      const items = await listFn();
      setPosts(items as Post[]);
    } catch {
      toast.error("Failed to refresh");
    } finally {
      setLoading(false);
    }
  }

  function startNew() {
    setForm(emptyForm);
    setEditing(true);
  }

  async function startEdit(id: string) {
    try {
      const p = (await getFn({ data: { id } })) as Post | null;
      if (!p) {
        toast.error("Post not found");
        return;
      }
      setForm({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        cover_image: p.cover_image ?? "",
        category: p.category ?? "",
        read_time: p.read_time ?? "",
        lead_magnet_title: p.lead_magnet_title ?? "",
        lead_magnet_description: p.lead_magnet_description ?? "",
        lead_magnet_cta: p.lead_magnet_cta ?? "",
        published: p.published,
      });
      setEditing(true);
    } catch {
      toast.error("Failed to load post");
    }
  }

  async function save() {
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      toast.error("Title, slug, excerpt and content are required");
      return;
    }
    setSaving(true);
    try {
      await upsertFn({
        data: {
          id: form.id,
          slug: form.slug,
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          cover_image: form.cover_image.trim() || null,
          category: form.category.trim() || null,
          read_time: form.read_time.trim() || null,
          lead_magnet_title: form.lead_magnet_title.trim() || null,
          lead_magnet_description: form.lead_magnet_description.trim() || null,
          lead_magnet_cta: form.lead_magnet_cta.trim() || null,
          published: form.published,
        },
      });
      toast.success(form.id ? "Post updated" : "Post created");
      setEditing(false);
      setForm(emptyForm);
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteFn({ data: { id } });
      toast.success("Deleted");
      await refresh();
    } catch {
      toast.error("Delete failed");
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-3 w-3" /> Back to admin
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Manage Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">{posts.length} posts</p>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            <Plus className="h-4 w-4" /> New post
          </button>
        )}
      </div>

      {editing ? (
        <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-card p-6 md:p-8">
          <h2 className="font-display text-xl font-bold">{form.id ? "Edit post" : "New post"}</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Title *">
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({ ...f, title, slug: f.id ? f.slug : slugify(title) }));
                }}
                className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </Field>
            <Field label="Slug *">
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary" />
            </Field>
            <Field label="Category" className="md:col-span-1">
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Business Strategy" />
            </Field>
            <Field label="Read time" className="md:col-span-1">
              <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="6 min read" />
            </Field>
            <Field label="Cover image URL" className="md:col-span-2">
              <input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="https://..." />
            </Field>
            <Field label="Excerpt *" className="md:col-span-2">
              <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary min-h-[80px]" maxLength={500} />
            </Field>
            <Field label="Content (Markdown, separate paragraphs with blank lines, **bold** supported) *" className="md:col-span-2">
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary min-h-[280px] font-mono text-xs" />
            </Field>

            <div className="md:col-span-2 mt-2 rounded-xl border border-border bg-background/40 p-4">
              <h3 className="text-sm font-semibold">Lead magnet (optional)</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <Field label="Title">
                  <input value={form.lead_magnet_title} onChange={(e) => setForm({ ...form, lead_magnet_title: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Free Pitch Deck Template" />
                </Field>
                <Field label="CTA button text">
                  <input value={form.lead_magnet_cta} onChange={(e) => setForm({ ...form, lead_magnet_cta: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Send me the template" />
                </Field>
                <Field label="Description" className="md:col-span-2">
                  <textarea value={form.lead_magnet_description} onChange={(e) => setForm({ ...form, lead_magnet_description: e.target.value })} className="w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary min-h-[60px]" />
                </Field>
              </div>
            </div>

            <label className="md:col-span-2 mt-2 inline-flex items-center gap-3 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="h-4 w-4" />
              Publish (visible on public blog)
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-cyan px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {form.id ? "Save changes" : "Create post"}
            </button>
            <button
              onClick={() => { setEditing(false); setForm(emptyForm); }}
              className="rounded-full border border-border px-6 py-3 text-sm text-muted-foreground hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-border bg-gradient-card">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">No posts yet. Create your first.</div>
          ) : (
            <ul className="divide-y divide-border">
              {posts.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-medium">{p.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${p.published ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {p.published ? "Live" : "Draft"}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">/{p.slug} {p.category ? `· ${p.category}` : ""}</div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => startEdit(p.id)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs hover:border-primary hover:text-primary">
                      <Pencil className="h-3 w-3" /> Edit
                    </button>
                    <button onClick={() => remove(p.id, p.title)} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}
