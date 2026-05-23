import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  category: string | null;
  read_time: string | null;
  lead_magnet_title: string | null;
  lead_magnet_description: string | null;
  lead_magnet_cta: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function listPublishedPosts() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPostRow[];
}

export async function getPublishedPostBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data ?? null) as BlogPostRow | null;
}

export async function listAllPostsForAdmin() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPostRow[];
}

export async function getPostByIdForAdmin(id: string) {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data ?? null) as BlogPostRow | null;
}

export type UpsertInput = {
  id?: string | null;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  category?: string | null;
  read_time?: string | null;
  lead_magnet_title?: string | null;
  lead_magnet_description?: string | null;
  lead_magnet_cta?: string | null;
  published: boolean;
};

export async function upsertPost(input: UpsertInput) {
  const payload = {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    cover_image: input.cover_image ?? null,
    category: input.category ?? null,
    read_time: input.read_time ?? null,
    lead_magnet_title: input.lead_magnet_title ?? null,
    lead_magnet_description: input.lead_magnet_description ?? null,
    lead_magnet_cta: input.lead_magnet_cta ?? null,
    published: input.published,
    published_at: input.published ? new Date().toISOString() : null,
  };

  if (input.id) {
    // Preserve original published_at if already published
    const existing = await getPostByIdForAdmin(input.id);
    const published_at = input.published
      ? existing?.published_at ?? new Date().toISOString()
      : null;
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .update({ ...payload, published_at })
      .eq("id", input.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as BlogPostRow;
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert(payload)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as BlogPostRow;
}

export async function deletePost(id: string) {
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
