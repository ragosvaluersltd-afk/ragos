import { createPropertySlug } from "@/lib/mappers/property-slug";
import { AdminPropertyInput } from "@/types/admin";

function clean(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function parseOptionalNumber(input: unknown) {
  if (input === null || input === undefined || input === "") return undefined;
  const value = Number(input);
  return Number.isFinite(value) && value >= 0 ? value : undefined;
}

function parseStringList(input: unknown) {
  if (Array.isArray(input)) {
    return input.map((item) => clean(item)).filter(Boolean);
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function validateAdminPropertyInput(input: unknown): AdminPropertyInput {
  const payload = input as Record<string, unknown>;

  const data: AdminPropertyInput = {
    title: clean(payload.title),
    slug: clean(payload.slug),
    listingType: clean(payload.listingType) as AdminPropertyInput["listingType"],
    propertyType: clean(payload.propertyType) as AdminPropertyInput["propertyType"],
    price: Number(payload.price),
    currency: clean(payload.currency) as AdminPropertyInput["currency"],
    city: clean(payload.city),
    location: clean(payload.location),
    sublocation: clean(payload.sublocation) || undefined,
    bedrooms: parseOptionalNumber(payload.bedrooms),
    bathrooms: parseOptionalNumber(payload.bathrooms),
    sizeSqm: parseOptionalNumber(payload.sizeSqm),
    sizeSqft: parseOptionalNumber(payload.sizeSqft),
    summary: clean(payload.summary),
    description: clean(payload.description),
    features: parseStringList(payload.features),
    amenities: parseStringList(payload.amenities),
    status: clean(payload.status) as AdminPropertyInput["status"],
    featured: Boolean(payload.featured),
    coverImageUrl: clean(payload.coverImageUrl),
    coverImageAlt: clean(payload.coverImageAlt) || "Property cover image",
    gallery: Array.isArray(payload.gallery)
      ? (payload.gallery as Record<string, unknown>[])
          .map((item, index) => ({
            url: clean(item.url),
            alt: clean(item.alt) || `Property gallery image ${index + 1}`
          }))
          .filter((item) => Boolean(item.url))
      : [],
    referenceCode: clean(payload.referenceCode)
  };

  if (!data.title || data.title.length < 3) throw new Error("Property title is required");
  if (!Number.isFinite(data.price) || data.price <= 0) throw new Error("Property price must be greater than zero");
  if (!data.city) throw new Error("City is required");
  if (!data.location) throw new Error("Location is required");
  if (!data.summary || data.summary.length < 20) throw new Error("Summary should be at least 20 characters");
  if (!data.description || data.description.length < 30) throw new Error("Description should be at least 30 characters");
  if (!data.coverImageUrl) throw new Error("Cover image is required");
  if (!data.referenceCode) throw new Error("Reference code is required");

  data.slug = data.slug ? createPropertySlug(data.slug) : createPropertySlug(data.title);

  if (!data.slug) throw new Error("A valid slug could not be generated");

  return data;
}
