import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireAdmin } from "./admin.server";
import {
  deletePost,
  getPostByIdForAdmin,
  getPublishedPostBySlug,
  listAllPostsForAdmin,
  listPublishedPosts,
  upsertPost,
} from "./blog.server";

const SlugSchema = z.object({ slug: z.string().min(1).max(200) });
const IdSchema = z.object({ id: z.string().uuid() });

const UpsertSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1).max(50000),
  cover_image: z.string().url().max(500).nullable().optional(),
  category: z.string().max(100).nullable().optional(),
  read_time: z.string().max(50).nullable().optional(),
  lead_magnet_title: z.string().max(200).nullable().optional(),
  lead_magnet_description: z.string().max(500).nullable().optional(),
  lead_magnet_cta: z.string().max(100).nullable().optional(),
  published: z.boolean(),
});

// Public
export const getPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  return listPublishedPosts();
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => SlugSchema.parse(input))
  .handler(async ({ data }) => {
    return getPublishedPostBySlug(data.slug);
  });

// Admin
export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");
    return listAllPostsForAdmin();
  });

export const adminGetPost = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => IdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");
    return getPostByIdForAdmin(data.id);
  });

export const adminUpsertPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => UpsertSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");
    return upsertPost(data);
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => IdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");
    await deletePost(data.id);
    return { ok: true };
  });
