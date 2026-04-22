import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import { getAdminPropertyById } from "@/lib/supabase/admin-queries";

export default async function EditAdminPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getAdminPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">Edit Property</h1>
      <PropertyForm property={property} />
    </section>
  );
}
