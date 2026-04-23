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
  title: "Property Valuation in Kenya | Ragos Valuers and Estate Agents",
  description:
    "Professional property valuation in Kenya since 2005, together with estate agency, property sales, rentals, and real estate advisory for individuals, investors, lenders, and institutions.",
  alternates: { canonical: "/" },
};

const valuationCategories = [
  "Mortgage Valuation",
  "Market Valuation",
  "Insurance Valuation",
  "Rental Assessment",
  "Commercial Valuation",
  "Land Valuation",
];

const whyRagos = [
  {
    title: "Valuation led thinking",
    description:
      "Our work starts with value, evidence, pricing logic, and market discipline, which makes every recommendation more credible.",
  },
  {
    title: "Built for serious decisions",
    description:
      "We support transactions, financing, internal decision making, and asset positioning where confidence and clarity matter.",
  },
  {
    title: "Corporate and private client readiness",
    description:
      "From individual property owners to institutions and lenders, our approach stays professional, structured, and dependable.",
  },
  {
    title: "Local market depth",
    description:
      "We understand how value behaves across Nairobi and the wider Kenyan market, including residential, land, and commercial segments.",
  },
];

export default async function Home() {
  const featuredProperties = await getFeaturedProperties(3);

  return (
    <>
      <Section
        className="relative min-h-[88vh] overflow-hidden bg-[#0a1120] pt-0 text-white"
        containerClassName="relative z-10 h-full"
      >
        <div className="absolute inset-0">
          <img
            src="/images/hero-home.jpg"
            alt="Premium property exterior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,24,0.45)_0%,rgba(7,12,24,0.5)_24%,rgba(7,12,24,0.6)_48%,rgba(7,12,24,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,48,146,0.22),transparent_26%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,148,29,0.12),transparent_18%)]" />
        </div>

        <div className="relative flex min-h-[88vh] items-center">
          <div className="w-full pb-10 pt-24 sm:pt-28 lg:pt-32">
            <div className="max-w-4xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85 sm:text-xs">
                Value. Sell. Rent. Since 2005.
              </p>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Real estate decisions made with clarity.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
                Professional property valuation, sales, rentals, and advisory in Kenya.
              </p>
            </div>

            <div className="mt-8 max-w-6xl">
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-md sm:p-4">
                <HeroPropertySearch />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-white/80 sm:text-sm">
              <a href={contactDetails.valuationPhoneHref} className="transition hover:text-white">
                Valuation: {contactDetails.valuationPhoneDisplay}
              </a>
              <a href={contactDetails.inquiriesPhoneHref} className="transition hover:text-white">
                Inquiries: {contactDetails.inquiriesPhoneDisplay}
              </a>
              <a href={contactDetails.emailHref} className="transition hover:text-white">
                {contactDetails.email}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[#f5f7fc] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_top_left,rgba(46,48,146,0.07),transparent_28%)]" />
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-brand-blue/10 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Why Ragos
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-brand-navy sm:text-4xl">
              A real estate firm shaped by valuation discipline, not noise.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-slate">
              The strongest property decisions are built on evidence, pricing clarity, and
              experienced execution. That is why valuation sits at the centre of what we do.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/about">About the firm</Button>
              <Button href="/valuation" variant="outline">
                View valuation services
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyRagos.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-brand-blue/10 bg-[linear-gradient(165deg,#ffffff_0%,#eef3ff_100%)] p-6 shadow-[0_20px_45px_rgba(15,23,42,0.07)]"
              >
                <h3 className="text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-slate">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Core expertise
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-brand-navy sm:text-4xl">
              Integrated real estate services, anchored by professional valuation.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-slate">
              We bring valuation intelligence, transaction support, and real estate advisory into
              one disciplined client experience.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-brand-orange/15 bg-[linear-gradient(135deg,#fffaf3_0%,#ffffff_100%)] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <p className="text-sm leading-7 text-brand-slate">
              Whether a client needs a valuation report, a sales strategy, rental support, or wider
              property advice, the objective is the same: clear decisions backed by credible market
              logic.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-[linear-gradient(140deg,#08101f_0%,#101936_36%,#182455_74%,#23317d_100%)] py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,148,29,0.16),transparent_22%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(94,116,255,0.22),transparent_28%)]" />

        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
              Valuation services in Kenya
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Professional valuation work for lending, transactions, insurance, reporting, and
              portfolio decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100">
              Our valuation practice supports clients who need more than a number. They need a clear
              opinion of value, a disciplined process, and reporting they can stand behind.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/valuation" variant="secondary">
                Start valuation request
              </Button>
              <Button
                href="/contact"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-navy"
              >
                Speak to our team
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {valuationCategories.map((category) => (
              <div
                key={category}
                className="rounded-[1.5rem] border border-white/12 bg-white/8 px-5 py-5 text-sm font-medium text-blue-50 shadow-[0_16px_45px_rgba(0,0,0,0.2)] backdrop-blur-md"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-[#f5f7fc] py-20 sm:py-24">
        <SectionHeading
          tag="Featured properties"
          title="Selected opportunities for buyers, tenants, and investors."
          description="A curated view of active listings presented within a cleaner, valuation aware property experience."
          action={
            <Button href="/properties" variant="outline">
              View all properties
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

      <Section className="bg-white py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Market intelligence
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-brand-navy sm:text-4xl">
              Insight that sharpens pricing, acquisition, leasing, and portfolio decisions.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-brand-slate">
              We want the Ragos platform to feel informative as well as credible. Our insights
              section supports smarter conversations around property value, market movement, and
              decision quality.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-brand-blue/10 bg-[linear-gradient(145deg,#ffffff_0%,#eef3ff_100%)] p-7 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
            <p className="text-sm leading-7 text-brand-slate">
              Strong real estate brands do not just list properties. They shape understanding. This
              is where market commentary, valuation perspective, and practical property intelligence
              add real depth to the platform.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {insights.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </Section>

      <Section className="bg-[linear-gradient(140deg,#0b1228_0%,#121b3c_50%,#1c2870_100%)] py-20 text-white sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
              Contact Ragos
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Speak with a team built for valuation instructions, agency mandates, and serious
              property conversations.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-blue-100">
              If you need a professional property valuation, support with sale or rental
              transactions, or wider real estate guidance, our Nairobi team is ready to help.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-7 shadow-[0_20px_55px_rgba(0,0,0,0.2)] backdrop-blur-md">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                  Valuation desk
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {contactDetails.valuationPhoneDisplay}
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                  Agency inquiries
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {contactDetails.inquiriesPhoneDisplay}
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-5 sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                  Email
                </p>
                <p className="mt-2 break-all text-lg font-semibold text-white">
                  {contactDetails.email}
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/8 p-5 sm:col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                  Office
                </p>
                <p className="mt-2 text-base font-medium text-white">{contactDetails.office}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button href="/contact" variant="secondary">
                Contact our team
              </Button>
              <Button
                href="/valuation"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:border-white hover:bg-white hover:text-brand-navy"
              >
                Request valuation
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}