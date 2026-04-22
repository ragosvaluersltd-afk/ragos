import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/shared/section";

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="Get in Touch"
        description="Contact our team for valuation instructions, agency support, or real estate advisory inquiries."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-navy">Office Contact</h2>
            <p className="mt-4 text-sm text-brand-slate">Nairobi, Kenya</p>
            <p className="mt-2 text-sm text-brand-slate">Phone: +254 700 000 000</p>
            <p className="mt-2 text-sm text-brand-slate">Email: info@ragosvaluers.co.ke</p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
