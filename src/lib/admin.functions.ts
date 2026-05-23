import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const StatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "in_progress", "done", "archived"]),
});

const DeleteSchema = z.object({
  id: z.string().uuid(),
});

async function requireAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
}

export const getAdminDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) return { isAdmin, submissions: [] };

    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { isAdmin, submissions: data ?? [] };
  });

export const updateSubmissionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => StatusSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");

    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => DeleteSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");

    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .delete()
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });