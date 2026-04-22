import { getDashboardCounts } from "@/lib/supabase/admin-queries";

export default async function AdminDashboardPage() {
  const stats = await getDashboardCounts();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-4"><p className="text-sm text-slate-500">Properties</p><p className="text-3xl font-bold">{stats.properties}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-sm text-slate-500">Inquiries</p><p className="text-3xl font-bold">{stats.inquiries}</p></div>
        <div className="rounded-xl border bg-white p-4"><p className="text-sm text-slate-500">Valuation Requests</p><p className="text-3xl font-bold">{stats.valuationRequests}</p></div>
      </div>
    </section>
  );
}
