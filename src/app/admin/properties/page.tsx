import Link from "next/link";
import { listAdminProperties } from "@/lib/supabase/admin-queries";
import { DeletePropertyButton } from "@/components/admin/delete-property-button";

export default async function AdminPropertiesPage() {
  const properties = await listAdminProperties();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">Properties</h1>
        <Link href="/admin/properties/new" className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">Add Property</Link>
      </div>
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Featured</th><th className="px-4 py-3">Actions</th></tr></thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t">
                <td className="px-4 py-3">{property.title}</td>
                <td className="px-4 py-3">{property.propertyType}</td>
                <td className="px-4 py-3">{property.currency} {property.price.toLocaleString()}</td>
                <td className="px-4 py-3">{property.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3"><div className="flex gap-2"><Link className="text-brand-blue" href={`/admin/properties/${property.id}`}>Edit</Link><DeletePropertyButton id={property.id} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
