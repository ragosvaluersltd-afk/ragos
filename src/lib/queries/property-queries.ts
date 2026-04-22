import { properties } from "@/data/properties";
import { sanitizeFilterInput } from "@/lib/listing-filters";
import { PropertyFilterInput, PropertyListing, PropertySortOption } from "@/types";

export function filterProperties(items: PropertyListing[], filters: PropertyFilterInput) {
  const sanitized = sanitizeFilterInput(filters);

  return items.filter((property) => {
    if (sanitized.listingType && sanitized.listingType !== "all" && property.listingType !== sanitized.listingType) {
      return false;
    }

    if (sanitized.propertyType && sanitized.propertyType !== "all" && property.propertyType !== sanitized.propertyType) {
      return false;
    }

    if (sanitized.location) {
      const locationSearch = sanitized.location.toLowerCase();
      const matchLocation = [property.location, property.sublocation, property.city]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(locationSearch));

      if (!matchLocation) return false;
    }

    if (sanitized.minPrice && property.price < sanitized.minPrice) return false;
    if (sanitized.maxPrice && property.price > sanitized.maxPrice) return false;

    if (sanitized.bedrooms && (property.bedrooms ?? 0) < sanitized.bedrooms) return false;

    return true;
  });
}

export function sortProperties(items: PropertyListing[], sortBy: PropertySortOption) {
  const sorted = [...items];

  sorted.sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "size-desc") return (b.sizeSqm ?? 0) - (a.sizeSqm ?? 0);
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return sorted;
}

export function getAllPropertiesData() {
  return properties;
}
