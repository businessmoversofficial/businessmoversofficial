import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  getContactSubmissions,
  removeContactSubmission,
  requireAdmin,
  setContactSubmissionStatus,
} from "./admin.server";

const StatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "in_progress", "done", "archived"]),
});

const DeleteSchema = z.object({
  id: z.string().uuid(),
});

export const getAdminDashboard = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) return { isAdmin, submissions: [] };

    const submissions = await getContactSubmissions();
    return { isAdmin, submissions };
  });

export const updateSubmissionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => StatusSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");

    await setContactSubmissionStatus(data.id, data.status);
    return { ok: true };
  });

export const deleteSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => DeleteSchema.parse(input))
  .handler(async ({ data, context }) => {
    const isAdmin = await requireAdmin(context.userId);
    if (!isAdmin) throw new Error("Not authorized");

    await removeContactSubmission(data.id);
    return { ok: true };
  });