import { listAdminValuationRequests } from "@/lib/supabase/admin-queries";

export default async function AdminValuationRequestsPage() {
  const requests = await listAdminValuationRequests();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">Valuation Requests</h1>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="min-w-full text-sm"><thead className="bg-slate-50 text-left"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Property Type</th><th className="px-4 py-3">Location</th></tr></thead><tbody>{requests.map((item) => <tr key={item.id} className="border-t"><td className="px-4 py-3">{item.name}</td><td className="px-4 py-3">{item.email}</td><td className="px-4 py-3">{item.property_type}</td><td className="px-4 py-3">{item.property_location}</td></tr>)}</tbody></table>
      </div>
    </section>
  );
}
