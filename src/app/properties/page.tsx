import type { Metadata } from "next";
import { PropertiesListingClient } from "@/components/properties/properties-listing-client";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/shared/section";
import { getAllProperties } from "@/lib/properties";
import { getBaseUrl } from "@/lib/site-config";
import { PropertyFilterInput } from "@/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse premium residential, commercial, and development listings across Nairobi with trusted guidance from Ragos Valuers and Estate Agents.",
  alternates: { canonical: "/properties" }
};

function parseSearchFilters(searchParams: Record<string, string | string[] | undefined>): PropertyFilterInput {
  const listingType = typeof searchParams.listingType === "string" ? searchParams.listingType : undefined;
  const propertyType = typeof searchParams.propertyType === "string" ? searchParams.propertyType : undefined;
  const location = typeof searchParams.location === "string" ? searchParams.location : undefined;
  const minPrice = typeof searchParams.minPrice === "string" ? Number(searchParams.minPrice) : undefined;
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number(searchParams.maxPrice) : undefined;
  const bedrooms = typeof searchParams.bedrooms === "string" ? Number(searchParams.bedrooms) : undefined;

  return {
    listingType: listingType as PropertyFilterInput["listingType"],
    propertyType: propertyType as PropertyFilterInput["propertyType"],
    location,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    bedrooms: Number.isFinite(bedrooms) ? bedrooms : undefined
  };
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const properties = await getAllProperties();
  const baseUrl = getBaseUrl();
  const resolvedSearchParams = await searchParams;
  const initialFilters = parseSearchFilters(resolvedSearchParams);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
            { "@type": "ListItem", position: 2, name: "Properties", item: `${baseUrl}/properties` }
          ]
        }}
      />
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
      <Section className="bg-[#f8faff] pt-10 sm:pt-12">
        <PropertiesListingClient properties={properties} initialFilters={initialFilters} />
      </Section>
    </>
  );
}
