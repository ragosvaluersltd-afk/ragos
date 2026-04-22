import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/shared/section";
import { PageBlock } from "@/components/shared/page-block";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ragos Valuers and Estate Agents, our valuation mandate, and our client-focused approach since 2005.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://ragosvaluers.co.ke/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://ragosvaluers.co.ke/about" }
          ]
        }}
      />
      <PageHero
        tag="About"
        title="A Trusted Real Estate Valuation Firm Since 2005"
        description="Ragos Valuers and Estate Agents serves clients with professional valuation, agency, and advisory support shaped by long-standing market participation."
      />
      <Section className="bg-[#f8faff]">
        <div className="grid gap-6 lg:grid-cols-2">
          <PageBlock title="Our Professional Mandate">
            We provide independent and well-supported valuation advice for lenders, investors, institutions, and private clients, while maintaining disciplined service standards across all assignments.
          </PageBlock>
          <PageBlock title="How We Work">
            Our team combines technical assessment frameworks with field-level market knowledge to produce practical and defensible outcomes in both valuation and agency engagements.
          </PageBlock>
        </div>
        <p className="mt-8 text-sm text-brand-slate">
          Looking for practical support? Explore our <Link href="/valuation" className="font-semibold text-brand-blue">valuation services</Link> or browse <Link href="/properties" className="font-semibold text-brand-blue">current listings</Link>.
        </p>
      </Section>
    </>
  );
}
