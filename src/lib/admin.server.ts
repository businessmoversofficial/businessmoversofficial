import { supabaseAdmin } from "@/integrations/supabase/client.server";

export async function requireAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
}

export async function getContactSubmissions() {
  const { data, error } = await supabaseAdmin
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function setContactSubmissionStatus(id: string, status: string) {
  const { error } = await supabaseAdmin
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function removeContactSubmission(id: string) {
  const { error } = await supabaseAdmin
    .from("contact_submissions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}