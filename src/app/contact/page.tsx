import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/shared/section";
import { contactDetails } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ragos Valuers and Estate Agents for valuation requests, property inquiries, and advisory support.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact"
        title="Get in Touch"
        description="Contact our team for valuation instructions, agency support, or real estate advisory inquiries."
      />
      <Section className="bg-[#f8faff]">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold text-brand-navy">Office Contact</h2>
            <p className="mt-4 text-sm text-brand-slate">{contactDetails.office}</p>
            <p className="mt-2 text-sm text-brand-slate">Valuation: {contactDetails.valuationPhoneDisplay}</p>
            <p className="mt-2 text-sm text-brand-slate">Inquiries: {contactDetails.inquiriesPhoneDisplay}</p>
            <p className="mt-2 text-sm text-brand-slate">Email: {contactDetails.email}</p>
            <p className="mt-4 text-xs text-brand-slate">Trusted by lenders, investors, and property owners since 2005.</p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
