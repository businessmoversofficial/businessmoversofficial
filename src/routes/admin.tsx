import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, LogOut, Mail, Trash2, Inbox } from "lucide-react";
import { deleteSubmission as deleteSubmissionFn, getAdminDashboard, updateSubmissionStatus } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Business Movers" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Submission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  industry: string | null;
  message: string;
  status: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const fetchDashboard = useServerFn(getAdminDashboard);
  const updateStatusFn = useServerFn(updateSubmissionStatus);
  const removeSubmissionFn = useServerFn(deleteSubmissionFn);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
          navigate({ to: "/login" });
          return;
        }

        const dashboard = await fetchDashboard();
        const admin = dashboard.isAdmin;
        if (!mounted) return;
        setIsAdmin(admin);
        setSubmissions(dashboard.submissions as Submission[]);
        setLoading(false);
        setChecking(false);
      } catch {
        if (!mounted) return;
        toast.error("Could not verify admin access");
        setLoading(false);
        setChecking(false);
        navigate({ to: "/login" });
        return;
      }
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchDashboard, navigate]);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const { isAdmin: admin, submissions: data } = await fetchDashboard();
      setLoading(false);
      if (!admin) {
        setIsAdmin(false);
        return;
      }
      setSubmissions(data as Submission[]);
    } catch {
      setLoading(false);
      toast.error("Failed to load submissions");
      return;
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  async function updateStatus(id: string, status: string) {
    try {
      await updateStatusFn({ data: { id, status: status as "new" | "in_progress" | "done" | "archived" } });
    } catch {
      toast.error("Failed to update");
      return;
    }
    setSubmissions((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function deleteSubmission(id: string) {
    if (!confirm("Delete this submission?")) return;
    try {
      await removeSubmissionFn({ data: { id } });
    } catch {
      toast.error("Failed to delete");
      return;
    }
    setSubmissions((s) => s.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Deleted");
  }

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <section className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Not authorised</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your account does not have admin access.</p>
        <button onClick={handleSignOut} className="mt-6 rounded-full bg-gradient-cyan px-6 py-3 text-sm font-semibold text-primary-foreground">
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Admin</span>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Contact Submissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">{submissions.length} total</p>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary hover:text-primary"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl border border-border bg-gradient-card p-2">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center gap-2 p-12 text-center text-muted-foreground">
              <Inbox className="h-8 w-8" />
              <p className="text-sm">No submissions yet.</p>
              <Link to="/contact" className="text-xs text-primary hover:underline">View contact page</Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {submissions.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setSelected(s)}
                    className={`w-full rounded-xl px-4 py-4 text-left transition-colors hover:bg-secondary/50 ${selected?.id === s.id ? "bg-secondary/60" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{s.name}</span>
                      <span className={`text-[10px] uppercase tracking-wider ${s.status === "new" ? "text-primary" : "text-muted-foreground"}`}>
                        {s.status}
                      </span>
                    </div>
                    <div className="mt-1 truncate text-xs text-muted-foreground">{s.email}</div>
                    <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{s.message}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      {new Date(s.created_at).toLocaleString()}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-primary/20 bg-gradient-card p-6 md:p-8">
          {selected ? (
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold">{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your enquiry to Business Movers`}
                    className="inline-flex items-center gap-1 rounded-full bg-gradient-cyan px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    <Mail className="h-3.5 w-3.5" /> Reply
                  </a>
                  <button
                    onClick={() => deleteSubmission(selected.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Company</dt>
                  <dd className="mt-1">{selected.company || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Industry</dt>
                  <dd className="mt-1">{selected.industry || "—"}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Received</dt>
                  <dd className="mt-1">{new Date(selected.created_at).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <select
                      value={selected.status}
                      onChange={(e) => updateStatus(selected.id, e.target.value)}
                      className="rounded-md border border-input bg-background/60 px-2 py-1 text-xs"
                    >
                      <option value="new">new</option>
                      <option value="in_progress">in progress</option>
                      <option value="done">done</option>
                      <option value="archived">archived</option>
                    </select>
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Message</div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{selected.message}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-muted-foreground">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
