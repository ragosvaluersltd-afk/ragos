"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { BEDROOM_OPTIONS, LISTING_TYPE_OPTIONS, PROPERTY_TYPE_OPTIONS, SORT_OPTIONS } from "@/lib/listing-filters";
import { filterProperties, sortProperties } from "@/lib/queries/property-queries";
import { PropertyFilterInput, PropertyListing, PropertySortOption } from "@/types";

const PAGE_SIZE = 6;

export function PropertiesListingClient({ properties }: { properties: PropertyListing[] }) {
  const [filters, setFilters] = useState<PropertyFilterInput>({ listingType: "all", propertyType: "all" });
  const [sortBy, setSortBy] = useState<PropertySortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => sortProperties(filterProperties(properties, filters), sortBy), [properties, filters, sortBy]);
  const visibleProperties = filtered.slice(0, visibleCount);

  const hasActiveFilters =
    filters.listingType !== "all" ||
    filters.propertyType !== "all" ||
    Boolean(filters.location || filters.minPrice || filters.maxPrice || filters.bedrooms);

  function handleFilterChange<K extends keyof PropertyFilterInput>(key: K, value?: PropertyFilterInput[K]) {
    setVisibleCount(PAGE_SIZE);
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters({ listingType: "all", propertyType: "all" });
    setSortBy("newest");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <select
            value={filters.listingType ?? "all"}
            onChange={(e) => handleFilterChange("listingType", e.target.value as PropertyFilterInput["listingType"])}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          >
            {LISTING_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filters.propertyType ?? "all"}
            onChange={(e) => handleFilterChange("propertyType", e.target.value as PropertyFilterInput["propertyType"])}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          >
            {PROPERTY_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={filters.location ?? ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            placeholder="Location (e.g. Kilimani)"
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          />

          <select
            value={filters.bedrooms?.toString() ?? ""}
            onChange={(e) => handleFilterChange("bedrooms", e.target.value ? Number(e.target.value) : undefined)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          >
            {BEDROOM_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={0}
            value={filters.minPrice ?? ""}
            onChange={(e) => handleFilterChange("minPrice", e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Min price"
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          />

          <input
            type="number"
            min={0}
            value={filters.maxPrice ?? ""}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Max price"
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          />

          <select
            value={sortBy}
            onChange={(e) => {
              setVisibleCount(PAGE_SIZE);
              setSortBy(e.target.value as PropertySortOption);
            }}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-brand-slate">
            <span className="font-semibold text-brand-navy">{filtered.length}</span> properties found
          </p>
          {hasActiveFilters ? (
            <button onClick={clearFilters} className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-brand-navy">
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-brand-mist p-10 text-center">
          <h3 className="text-lg font-semibold text-brand-navy">No properties match your filters.</h3>
          <p className="mt-2 text-sm text-brand-slate">Try broadening your price range or searching another location.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          {visibleCount < filtered.length ? (
            <div className="flex justify-center">
              <button
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#25277a]"
              >
                Load more properties
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
