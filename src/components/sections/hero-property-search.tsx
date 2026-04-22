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
    <form
      onSubmit={submitSearch}
      className="relative mt-12 overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(155deg,rgba(255,255,255,0.98)_0%,rgba(241,246,255,0.96)_100%)] p-5 shadow-[0_35px_80px_rgba(8,14,40,0.3)] sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/70 to-transparent" />
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">Property Search</p>
          <p className="mt-1 text-sm text-brand-slate">Find valuation-aligned properties for sale and rent across Kenya.</p>
        </div>
        <p className="rounded-full border border-brand-blue/15 bg-white/90 px-3 py-1 text-xs font-medium text-brand-slate">Live filters • Fast routing</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <select value={listingType} onChange={(event) => setListingType(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20">
          {LISTING_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20">
          {PROPERTY_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Location" className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
        <input type="number" min={0} value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Min price" className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
        <input type="number" min={0} value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Max price" className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
        <select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20">
          {BEDROOM_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-brand-blue/10 pt-4">
        <p className="text-xs font-medium text-brand-slate">Use location, price and bedrooms to narrow down opportunities with confidence.</p>
        <button type="submit" className="rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(46,48,146,0.35)] transition hover:bg-[#25277a]">
          {hasFilters ? "Search with filters" : "Browse all properties"}
        </button>
      </div>
    </form>
  );
}
