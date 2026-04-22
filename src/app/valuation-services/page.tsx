import { ValuationRequestForm } from "@/components/forms/valuation-request-form";
import { PageHero } from "@/components/sections/page-hero";
import { PageBlock } from "@/components/shared/page-block";
import { Section } from "@/components/shared/section";

const categories = ["Mortgage Valuation", "Market Valuation", "Insurance Valuation", "Rental Assessment", "Commercial Valuation", "Land Valuation"];

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
          </PageBlock>
          <ValuationRequestForm />
        </div>
      </Section>
    </>
  );
}
