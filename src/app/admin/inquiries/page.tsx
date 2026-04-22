import { listAdminInquiries } from "@/lib/supabase/admin-queries";

export default async function AdminInquiriesPage() {
  const inquiries = await listAdminInquiries();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">Inquiries</h1>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="min-w-full text-sm"><thead className="bg-slate-50 text-left"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Property</th><th className="px-4 py-3">Message</th></tr></thead><tbody>{inquiries.map((item) => <tr key={item.id} className="border-t"><td className="px-4 py-3">{item.name}</td><td className="px-4 py-3">{item.email}</td><td className="px-4 py-3">{item.property_slug ?? "General"}</td><td className="px-4 py-3 max-w-md">{item.message}</td></tr>)}</tbody></table>
      </div>
    </section>
  );
}
