import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/shared/section";
import { PageBlock } from "@/components/shared/page-block";

export const metadata: Metadata = {
  title: "Estate Agency",
  description: "Professional estate agency services for property sales and lettings in Nairobi and across Kenya.",
  alternates: { canonical: "/estate-agency" }
};

export default function EstateAgencyPage() {
  return (
    <>
      <PageHero
        tag="Estate Agency"
        title="Professional Representation for Sales and Lettings"
        description="We support owners, buyers, landlords, and tenants with structured agency services grounded in local market realities."
      />
      <Section className="bg-[#f8faff]">
        <div className="grid gap-6 md:grid-cols-2">
          <PageBlock title="Sales Advisory">
            We guide property sales through pricing support, buyer qualification, negotiation coordination, and transaction management.
          </PageBlock>
          <PageBlock title="Lettings Support">
            Our lettings service focuses on tenant sourcing, rental positioning, and practical occupancy guidance for steady asset performance.
          </PageBlock>
        </div>
        <p className="mt-8 text-sm text-brand-slate">
          Ready to transact? <Link href="/contact" className="font-semibold text-brand-blue">Contact our agency team</Link> or check <Link href="/properties" className="font-semibold text-brand-blue">active listings</Link>.
        </p>
      </Section>
    </>
  );
}
