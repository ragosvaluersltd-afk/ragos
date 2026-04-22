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
  description: "Trusted property valuation in Kenya, estate agency services, and real estate advisory delivered by Ragos since 2005.",
  alternates: { canonical: "/" }
};

const credibilityMetrics = [
  { value: "Since 2005", label: "Established Firm" },
  { value: "Valuation-First", label: "Methodology" },
  { value: "Kenya-Wide", label: "Market Coverage" }
];

const trustItems = [
  "Independent valuation reports aligned with lender and investor expectations",
  "Premium transaction support for property sales, rentals and acquisitions",
  "Strategic real estate advisory grounded in data, compliance and market evidence"
];

const valuationCategories = ["Mortgage Valuation", "Market Valuation", "Insurance Valuation", "Rental Assessment", "Commercial Valuation", "Land Valuation"];

export default async function Home() {
  const featuredProperties = await getFeaturedProperties(3);

  return (
    <>
      <Section
        className="relative overflow-hidden bg-[linear-gradient(135deg,#060b21_0%,#12183a_35%,#1b2473_72%,#2e3092_100%)] pb-16 pt-12 text-white sm:pt-16"
        containerClassName="relative z-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(248,148,29,0.35),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_82%,rgba(126,148,255,0.2),transparent_38%)]" />

        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
              Ragos Valuers & Estate Agents • Kenya
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl xl:text-6xl">
              Premium Property Valuation and Real Estate Advisory for High-Confidence Decisions
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Since 2005, Ragos Valuers and Estate Agents has delivered authoritative property valuation services in Kenya, alongside dependable estate agency execution,
              property sales and rentals, and strategic advisory support for institutions, investors, developers, and private clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/valuation" variant="secondary" className="px-6 py-3 text-sm">Request Professional Valuation</Button>
              <Button href="/properties" variant="outline" className="border-white/35 bg-white/10 px-6 py-3 text-white hover:border-white hover:bg-white hover:text-brand-navy">
                Explore Properties for Sale & Rent
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {credibilityMetrics.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-blue-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full border border-brand-orange/50 bg-brand-orange/20 blur-2xl lg:block" />
            <div className="rounded-3xl border border-white/20 bg-[linear-gradient(155deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_100%)] p-7 shadow-[0_28px_70px_rgba(4,8,25,0.45)] backdrop-blur-xl sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">Why leading clients choose us</p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">Valuation Authority with Full-Spectrum Real Estate Delivery</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-blue-100">
                {trustItems.map((item) => (
                  <p key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">{item}</p>
                ))}
              </div>
              <div className="mt-6 grid gap-3 text-sm text-blue-100 sm:grid-cols-2">
                <p><span className="font-semibold text-white">Valuation:</span> {contactDetails.valuationPhoneDisplay}</p>
                <p><span className="font-semibold text-white">Inquiries:</span> {contactDetails.inquiriesPhoneDisplay}</p>
                <p className="break-all sm:col-span-2"><span className="font-semibold text-white">Email:</span> {contactDetails.email}</p>
              </div>
            </div>
          </div>
        </div>

        <HeroPropertySearch />
      </Section>

      <Section className="relative overflow-hidden bg-[#f2f5fb]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
        <SectionHeading
          tag="Core Services"
          title="Integrated Real Estate Expertise, Led by Valuation Precision"
          description="Our advisory model is built around valuation intelligence and executed through disciplined estate agency, investment guidance, and transaction support."
        />
        <div className="relative mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-3xl bg-[linear-gradient(145deg,#ffffff_0%,#eef3ff_100%)] p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <SectionHeading
              tag="Valuation Leadership"
              title="A Corporate Property Firm Built for Credibility, Compliance and Clarity"
              description="We combine technical valuation discipline with real-world agency execution so clients can make defensible decisions across acquisition, disposal, leasing, financing and portfolio planning."
              action={<Button href="/about" variant="outline">Learn About the Firm</Button>}
            />
          </div>

          <div className="rounded-3xl border border-brand-blue/10 bg-brand-navy p-8 text-white shadow-[0_26px_50px_rgba(10,14,35,0.34)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Authority Snapshot</p>
            <h3 className="mt-3 text-2xl font-semibold">Trusted by clients who need defensible value opinions and strategic execution.</h3>
            <div className="mt-6 grid gap-3 text-sm text-blue-100 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">Independent valuation standards for lenders, investors, and corporate reporting.</div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-4">Agency support spanning premium residential, commercial, and land assets.</div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-4 sm:col-span-2">Advisory coverage for pricing strategy, market entry, and risk-aware transactions in Kenya.</div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[linear-gradient(145deg,#0c1130_0%,#151d4e_45%,#222b7a_100%)] text-white">
        <SectionHeading
          tag="Valuation Services in Kenya"
          title="Specialist Valuation Solutions for Lending, Transactions, Insurance and Portfolio Oversight"
          description="Assignments structured for clarity, compliance and confidence across residential, commercial, mixed-use and development assets."
          action={<Button href="/valuation" variant="secondary">Start Valuation Request</Button>}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valuationCategories.map((category) => (
            <div key={category} className="rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-medium text-blue-100 shadow-[0_10px_30px_rgba(2,6,22,0.28)]">
              {category}
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-[#f7f9fd]">
        <SectionHeading
          tag="Featured Properties"
          title="Selected Investment and Occupier Opportunities"
          description="A curated preview of active listings for sale and rent, supported by valuation-aware market positioning."
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
          title="Real Estate Intelligence for Investors, Owners and Decision Makers"
          description="Practical commentary on valuation drivers, market movement, and strategic considerations shaping property decisions in Kenya."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {insights.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </Section>

      <Section className="bg-[linear-gradient(130deg,#f3f6ff_0%,#ffffff_65%)]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeading
            tag="Contact"
            title="Engage Our Nairobi Team"
            description="For property valuation instructions, estate agency mandates, and advisory engagements, contact Ragos Valuers and Estate Agents."
          />
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-slate">Office</p>
            <p className="mt-2 text-base font-medium text-brand-navy">{contactDetails.office}</p>
            <div className="mt-5 space-y-2 text-sm text-brand-slate">
              <p>Valuation Desk: {contactDetails.valuationPhoneDisplay}</p>
              <p>Agency Inquiries: {contactDetails.inquiriesPhoneDisplay}</p>
              <p>Email: {contactDetails.email}</p>
            </div>
            <Button href="/contact" className="mt-6 w-full sm:w-auto">Speak with Our Team</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
