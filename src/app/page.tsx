import { CtaSection } from "@/components/sections/cta-section";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ArticleCard, PropertyCard, ServiceCard, StatCard } from "@/components/ui/cards";
import { SectionHeading } from "@/components/ui/section-heading";
import { insights, services } from "@/data/site";
import { getFeaturedProperties } from "@/lib/properties";

const trustItems = ["Since 2005", "Professional Real Estate Services", "Valuation Expertise", "Market Knowledge"];
const whyUs = [
  "Over two decades of market-grounded valuation work.",
  "Disciplined assessment standards and defensible reporting.",
  "Practical understanding of local and regional property trends.",
  "Professional client handling from instruction to delivery.",
  "Clear communication and dependable timelines.",
  "Integrated support across valuation, agency, and advisory."
];
const valuationCategories = [
  "Mortgage Valuation",
  "Market Valuation",
  "Insurance Valuation",
  "Rental Assessment",
  "Commercial Valuation",
  "Land Valuation"
];

export default async function Home() {
  const featuredProperties = await getFeaturedProperties(3);
  return (
    <>
      <Section className="bg-brand-mist/50 pb-12 pt-20 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">Trusted Since 2005</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
              Professional Property Valuation and Real Estate Advisory in Kenya
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-brand-slate">
              Ragos Valuers and Estate Agents delivers independent valuation expertise, supported by practical estate agency services and informed advisory for property owners, institutions, and investors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact">Request a Valuation</Button>
              <Button href="/properties" variant="outline">
                Explore Properties
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard label="Years in Market" value="20+" />
              <StatCard label="Core Authority" value="Valuation" />
              <StatCard label="Coverage" value="Across Kenya" />
              <StatCard label="Service Scope" value="End-to-End" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-brand-slate">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section>
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

      <Section className="bg-brand-mist/60">
        <SectionHeading
          tag="About Ragos"
          title="A Professional Firm Built on Technical Rigor and Market Understanding"
          description="Since 2005, we have provided objective valuation and real estate advisory services guided by evidence, consistency, and professional standards."
          action={
            <Button href="/about" variant="outline">
              Learn About the Firm
            </Button>
          }
        />
      </Section>

      <Section>
        <SectionHeading
          tag="Why Choose Us"
          title="A Disciplined Approach to Property Value and Real Estate Decisions"
          description="Clients work with us for dependable reporting, practical insights, and service quality that reflects the seriousness of each assignment."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 text-sm leading-6 text-brand-slate shadow-card">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-brand-navy text-white">
        <SectionHeading
          tag="Valuation Focus"
          title="Valuation Services Designed for Confidence and Compliance"
          description="Our valuation assignments are structured to support lending, transaction, insurance, investment, and portfolio decision requirements."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valuationCategories.map((category) => (
            <div key={category} className="rounded-lg border border-white/15 bg-white/5 px-5 py-4 text-sm font-medium">
              {category}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          tag="Featured Properties"
          title="Selected Listings"
          description="A preview of current opportunities across residential, commercial, and land categories."
          action={
            <Button href="/properties" variant="outline">
              View All Properties
            </Button>
          }
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </Section>

      <CtaSection />

      <Section>
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
            description="For valuation instructions, agency inquiries, or advisory support, contact our Nairobi office."
          />
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-slate">Office</p>
            <p className="mt-2 text-base text-brand-navy">Nairobi, Kenya</p>
            <p className="mt-4 text-sm text-brand-slate">Phone: +254 700 000 000</p>
            <p className="text-sm text-brand-slate">Email: info@ragosvaluers.co.ke</p>
            <Button href="/contact" className="mt-6">
              Make an Inquiry
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
