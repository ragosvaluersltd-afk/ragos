import { PropertyForm } from "@/components/admin/property-form";

export default function NewAdminPropertyPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-brand-navy">Create Property</h1>
      <PropertyForm />
    </section>
  );
}
