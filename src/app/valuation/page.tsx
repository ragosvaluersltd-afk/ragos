import type { Metadata } from "next";
import Link from "next/link";
import { ValuationRequestForm } from "@/components/forms/valuation-request-form";
import { PageHero } from "@/components/sections/page-hero";
import { PageBlock } from "@/components/shared/page-block";
import { Section } from "@/components/shared/section";

const categories = ["Mortgage Valuation", "Market Valuation", "Insurance Valuation", "Rental Assessment", "Commercial Valuation", "Land Valuation"];
const locations = ["nairobi", "kiambu", "mombasa"];

export const metadata: Metadata = {
  title: "Valuation Services",
  description: "Independent property valuation services across Kenya for mortgage, market, insurance, and investment decisions.",
  alternates: { canonical: "/valuation" }
};

export default function ValuationServicesPage() {
  return (
    <>
      <PageHero
        tag="Valuation Services"
        title="Independent Valuation for Informed Property Decisions"
        description="Our valuation practice is structured to support lending, transactions, risk management, and portfolio planning with professional consistency."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <PageBlock title="Valuation Categories">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((item) => (
                <div key={item} className="rounded-md border border-slate-200 px-4 py-3 font-medium text-brand-navy">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-brand-slate">
              Popular locations: {locations.map((location, index) => (
                <span key={location}>
                  <Link href={`/valuation/${location}`} className="font-semibold text-brand-blue uppercase">{location}</Link>
                  {index < locations.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </PageBlock>
          <ValuationRequestForm />
        </div>
      </Section>
    </>
  );
}
