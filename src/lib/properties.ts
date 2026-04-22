import { getAllPropertiesData, filterProperties, sortProperties } from "@/lib/queries/property-queries";
import { PropertyFilterInput, PropertyListing, PropertySortOption } from "@/types";

export async function getAllProperties() {
  return getAllPropertiesData();
}

export async function getFeaturedProperties(limit = 3) {
  const data = getAllPropertiesData().filter((property) => property.featured);
  return sortProperties(data, "newest").slice(0, limit);
}

export async function getPropertyBySlug(slug: string) {
  return getAllPropertiesData().find((property) => property.slug === slug) ?? null;
}

export async function getRelatedProperties(property: PropertyListing, limit = 3) {
  const related = getAllPropertiesData().filter((item) => {
    if (item.id === property.id) return false;
    return item.location === property.location || item.propertyType === property.propertyType;
  });

  return sortProperties(related, "newest").slice(0, limit);
}

export async function queryProperties(
  filters: PropertyFilterInput = {},
  sortBy: PropertySortOption = "newest"
) {
  const filtered = filterProperties(getAllPropertiesData(), filters);
  return sortProperties(filtered, sortBy);
}

export { filterProperties, sortProperties };
