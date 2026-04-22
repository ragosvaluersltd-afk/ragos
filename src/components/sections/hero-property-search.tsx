"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BEDROOM_OPTIONS, LISTING_TYPE_OPTIONS, PROPERTY_TYPE_OPTIONS } from "@/lib/listing-filters";

export function HeroPropertySearch() {
  const router = useRouter();
  const [listingType, setListingType] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const hasFilters = useMemo(
    () => Boolean(location || minPrice || maxPrice || bedrooms || listingType !== "all" || propertyType !== "all"),
    [location, minPrice, maxPrice, bedrooms, listingType, propertyType]
  );

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (listingType !== "all") params.set("listingType", listingType);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (location.trim()) params.set("location", location.trim());
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);

    router.push(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form onSubmit={submitSearch} className="mt-10 rounded-2xl border border-white/35 bg-white/95 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.18)] backdrop-blur sm:p-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <select value={listingType} onChange={(event) => setListingType(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-brand-navy">
          {LISTING_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-brand-navy">
          {PROPERTY_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-brand-navy" />
        <input type="number" min={0} value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Min price" className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-brand-navy" />
        <input type="number" min={0} value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Max price" className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-brand-navy" />
        <select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-brand-navy">
          {BEDROOM_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium text-brand-slate">Search active listings with valuation-backed market intelligence.</p>
        <button type="submit" className="rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(46,48,146,0.35)] hover:bg-[#25277a]">
          {hasFilters ? "Search with filters" : "Browse all properties"}
        </button>
      </div>
    </form>
  );
}
