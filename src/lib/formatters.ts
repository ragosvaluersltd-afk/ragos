import { ListingType, PropertyListing, PropertyType } from "@/types";

const listingLabels: Record<ListingType, string> = {
  "for-sale": "For Sale",
  "for-rent": "To Let"
};

const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: "Apartment",
  house: "House",
  townhouse: "Townhouse",
  land: "Land",
  office: "Office"
};

export function formatPrice(value: number, currency: PropertyListing["currency"]) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatLocation(property: Pick<PropertyListing, "location" | "city" | "sublocation">) {
  return [property.sublocation, property.location, property.city].filter(Boolean).join(", ");
}

export function formatListingTypeBadge(listingType: ListingType) {
  return listingLabels[listingType];
}

export function formatPropertyType(propertyType: PropertyType) {
  return propertyTypeLabels[propertyType];
}

export function formatPropertySize(property: Pick<PropertyListing, "sizeSqm" | "sizeSqft">) {
  if (property.sizeSqm) return `${property.sizeSqm.toLocaleString()} sqm`;
  if (property.sizeSqft) return `${property.sizeSqft.toLocaleString()} sqft`;
  return "Size on request";
}

export function formatReferenceCode(referenceCode: string) {
  return `Ref: ${referenceCode}`;
}
