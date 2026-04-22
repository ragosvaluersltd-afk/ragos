import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroPropertySearch } from "@/components/sections/hero-property-search";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ArticleCard, PropertyCard, ServiceCard } from "@/components/ui/cards";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactDetails } from "@/data/contact";
import { insights, services } from "@/data/site";
import { getFeaturedProperties } from "@/lib/properties";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Home",
  description: "Trusted property valuation, estate agency, and advisory services in Kenya since 2005.",
  alternates: { canonical: "/" }
};

const trustItems = ["Established in 2005", "Independent Valuation Standards", "Market-Calibrated Advisory", "Nationwide Client Coverage"];
const valuationCategories = ["Mortgage Valuation", "Market Valuation", "Insurance Valuation", "Rental Assessment", "Commercial Valuation", "Land Valuation"];

export default async function Home() {
  const featuredProperties = await getFeaturedProperties(3);

  return (
    <>
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,#11152c_0%,#1f2560_42%,#2e3092_100%)] pb-16 pt-14 text-white sm:pt-20" containerClassName="relative z-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,148,29,0.28),transparent_38%)]" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">Kenya Since 2005</p>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">Premium Property Valuation, Estate Agency and Real Estate Advisory</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Ragos Valuers and Estate Agents supports institutions, investors, developers and private owners with objective valuation reports, dependable agency execution, and strategic advisory for confident property decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/valuation" variant="secondary">Request a Valuation</Button>
              <Button href="/properties" variant="outline" className="border-white/40 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-navy">
                Explore Properties
              </Button>
            </div>
            <div className="mt-8 grid gap-3 text-sm text-blue-100 sm:grid-cols-3">
              <p><span className="font-semibold text-white">Valuation:</span> {contactDetails.valuationPhoneDisplay}</p>
              <p><span className="font-semibold text-white">Inquiries:</span> {contactDetails.inquiriesPhoneDisplay}</p>
              <p className="break-all"><span className="font-semibold text-white">Email:</span> {contactDetails.email}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur sm:p-8">
            <h2 className="text-lg font-semibold">Why clients trust Ragos</h2>
            <div className="mt-5 space-y-3 text-sm text-blue-100">
              <p>• Professional, independent valuations aligned to lender and investor standards.</p>
              <p>• Corporate-grade reporting quality and dependable turnaround discipline.</p>
              <p>• Integrated service across valuation, estate agency and transaction advisory.</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {trustItems.map((item) => (
                <div key={item} className="rounded-lg border border-white/20 bg-white/10 p-3 text-xs font-medium text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <HeroPropertySearch />
      </Section>

      <Section className="bg-[#f8faff]">
        <SectionHeading
          tag="Services"
          title="Comprehensive Real Estate Services with Valuation at the Core"
          description="Our service model combines independent valuation capability with reliable agency and advisory support for informed property decisions."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <SectionHeading
            tag="About Ragos"
            title="A Corporate Real Estate Firm Built on Technical Rigor"
            description="From valuation mandates to agency transactions, we apply disciplined methodology, local market intelligence, and professional communication standards in every engagement."
            action={<Button href="/about" variant="outline">Learn About the Firm</Button>}
          />
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-brand-mist/70 to-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-brand-navy">Valuation-first perspective</h3>
            <p className="mt-3 text-sm leading-7 text-brand-slate">Our advisory is informed by valuation principles, so pricing, negotiations, and transaction guidance stay grounded in market reality and defensible value assumptions.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-navy text-white">
        <SectionHeading
          tag="Valuation Focus"
          title="Valuation Services Designed for Confidence and Compliance"
          description="Assignments structured for lending, transactions, insurance, portfolio management and strategic asset decisions."
          action={<Button href="/valuation" variant="secondary">Start valuation request</Button>}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valuationCategories.map((category) => (
            <div key={category} className="rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-sm font-medium text-blue-100">
              {category}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[#f8faff]">
        <SectionHeading
          tag="Featured Properties"
          title="Selected Listings"
          description="A preview of current opportunities across residential, commercial, and land categories."
          action={<Button href="/properties" variant="outline">View All Properties</Button>}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Section>

      <CtaSection />

      <Section className="bg-white">
        <SectionHeading
          tag="Insights"
          title="Market Perspectives and Practical Guidance"
          description="Thoughtful commentary to help clients understand valuation principles and real estate trends."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {insights.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </Section>

      <Section className="bg-brand-mist/60">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            tag="Contact"
            title="Speak with Our Team"
            description="For valuation instructions, agency inquiries, or real estate advisory support, connect with our Nairobi office."
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-slate">Office</p>
            <p className="mt-2 text-base text-brand-navy">{contactDetails.office}</p>
            <p className="mt-4 text-sm text-brand-slate">Valuation: {contactDetails.valuationPhoneDisplay}</p>
            <p className="text-sm text-brand-slate">Inquiries: {contactDetails.inquiriesPhoneDisplay}</p>
            <p className="text-sm text-brand-slate">Email: {contactDetails.email}</p>
            <Button href="/contact" className="mt-6">Make an Inquiry</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
