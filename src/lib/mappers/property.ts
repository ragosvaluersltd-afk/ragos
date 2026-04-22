import { PropertyListing } from "@/types";
import { Json, PropertyRow } from "@/types/supabase";

type GalleryItem = {
  url?: string;
  alt?: string;
};

function isGalleryItem(value: Json): value is GalleryItem {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return "url" in value;
}

function mapGallery(gallery: Json): PropertyListing["gallery"] {
  if (!Array.isArray(gallery)) {
    return [];
  }

  return gallery
    .filter((item): item is GalleryItem => isGalleryItem(item as Json))
    .map((item, index) => ({
      url: item.url ?? "",
      alt: item.alt ?? `Property gallery image ${index + 1}`
    }))
    .filter((item) => Boolean(item.url));
}

export function mapPropertyRowToListing(row: PropertyRow): PropertyListing {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    listingType: row.listing_type,
    propertyType: row.property_type,
    price: row.price,
    currency: row.currency,
    city: row.city,
    location: row.location,
    sublocation: row.sublocation ?? undefined,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    sizeSqm: row.size_sqm ?? undefined,
    sizeSqft: row.size_sqft ?? undefined,
    summary: row.summary,
    description: row.description,
    features: row.features,
    amenities: row.amenities,
    status: row.status,
    featured: row.featured,
    coverImage: {
      url: row.cover_image_url,
      alt: row.cover_image_alt
    },
    gallery: mapGallery(row.gallery),
    referenceCode: row.reference_code,
    publishedAt: row.published_at
  };
}
