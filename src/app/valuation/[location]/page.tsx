import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ValuationRequestForm } from "@/components/forms/valuation-request-form";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/shared/section";

const supportedLocations = ["nairobi", "kiambu", "mombasa"] as const;

export async function generateStaticParams() {
  return supportedLocations.map((location) => ({ location }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const locationName = location.charAt(0).toUpperCase() + location.slice(1);

  return {
    title: `Valuation in ${locationName}`,
    description: `Request professional property valuation services in ${locationName} with Ragos Valuers and Estate Agents.`,
    alternates: { canonical: `/valuation/${location}` }
  };
}

export default async function ValuationLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;

  if (!supportedLocations.includes(location as (typeof supportedLocations)[number])) {
    notFound();
  }

  const locationName = location.charAt(0).toUpperCase() + location.slice(1);

  return (
    <>
      <PageHero
        tag="Location Valuation"
        title={`Property Valuation Services in ${locationName}`}
        description={`Need a valuation in ${locationName}? Submit your details and our team will reach out promptly.`}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-brand-navy">Why request a local valuation?</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-brand-slate">
              <li>Location-specific comparables and market context.</li>
              <li>Defensible reporting suitable for lending and transaction support.</li>
              <li>Guidance from a firm active in valuation and agency workflows.</li>
            </ul>
            <p className="mt-4 text-sm text-brand-slate">
              You can also explore <Link href="/valuation" className="font-semibold text-brand-blue">all valuation services</Link> or browse <Link href="/properties" className="font-semibold text-brand-blue">available properties</Link>.
            </p>
          </article>
          <ValuationRequestForm />
        </div>
      </Section>
    </>
  );
}
