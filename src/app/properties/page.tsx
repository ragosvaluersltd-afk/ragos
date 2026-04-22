import type { Metadata } from "next";
import { PropertiesListingClient } from "@/components/properties/properties-listing-client";
import { Section } from "@/components/shared/section";
import { getAllProperties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties | Ragos Valuers and Estate Agents",
  description:
    "Browse premium residential, commercial, and development listings across Nairobi with trusted guidance from Ragos Valuers and Estate Agents."
};

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
    <>
      <section className="bg-gradient-to-br from-brand-mist via-white to-[#fdf6eb] py-16 sm:py-20">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">Property Listings</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Curated opportunities across Nairobi&apos;s most sought-after addresses.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-brand-slate sm:text-lg">
            Explore quality homes, investment-grade offices, and strategic development parcels represented with the discretion and precision expected from a trusted valuation and agency partner.
          </p>
        </div>
      </section>
      <Section className="pt-10 sm:pt-12">
        <PropertiesListingClient properties={properties} />
      </Section>
    </>
  );
}
