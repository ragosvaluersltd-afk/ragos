import Image from "next/image";
import Link from "next/link";
import { formatListingTypeBadge, formatLocation, formatPrice, formatPropertySize, formatPropertyType } from "@/lib/formatters";
import { PropertyListing } from "@/types";

export function PropertyCard({ property }: { property: PropertyListing }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative h-56 overflow-hidden bg-brand-mist">
        <Image
          src={property.coverImage.url}
          alt={property.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-brand-blue/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {formatListingTypeBadge(property.listingType)}
          </span>
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-navy">
            {formatPropertyType(property.propertyType)}
          </span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold text-brand-navy">{property.title}</h3>
        <p className="text-sm text-brand-slate">{formatLocation(property)}</p>
        <p className="text-lg font-bold text-brand-blue">{formatPrice(property.price, property.currency)}</p>
        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-3 text-sm text-brand-slate">
          {property.bedrooms ? <span>{property.bedrooms} Beds</span> : null}
          {property.bathrooms ? <span>{property.bathrooms} Baths</span> : null}
          <span>{formatPropertySize(property)}</span>
        </div>
      </div>
    </Link>
  );
}
