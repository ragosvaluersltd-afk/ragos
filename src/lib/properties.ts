import { properties as mockProperties } from "@/data/properties";
import { getAllPropertiesData, filterProperties, sortProperties } from "@/lib/queries/property-queries";
import { supabasePropertyRepository } from "@/lib/supabase/property-queries";
import { PropertyFilterInput, PropertyListing, PropertySortOption } from "@/types";

function canUseSupabase() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getAllProperties() {
  if (canUseSupabase()) {
    return supabasePropertyRepository.getAll();
  }

  return getAllPropertiesData();
}

export async function getFeaturedProperties(limit = 3) {
  if (canUseSupabase()) {
    return supabasePropertyRepository.getFeatured(limit);
  }

  const data = mockProperties.filter((property) => property.featured);
  return sortProperties(data, "newest").slice(0, limit);
}

export async function getPropertyBySlug(slug: string) {
  if (canUseSupabase()) {
    return supabasePropertyRepository.getBySlug(slug);
  }

  return mockProperties.find((property) => property.slug === slug) ?? null;
}

export async function getRelatedProperties(property: PropertyListing, limit = 3) {
  if (canUseSupabase()) {
    return supabasePropertyRepository.getRelated(property, limit);
  }

  const related = mockProperties.filter((item) => {
    if (item.id === property.id) return false;
    return item.location === property.location || item.propertyType === property.propertyType;
  });

  return sortProperties(related, "newest").slice(0, limit);
}

export async function queryProperties(
  filters: PropertyFilterInput = {},
  sortBy: PropertySortOption = "newest"
) {
  if (canUseSupabase()) {
    return supabasePropertyRepository.query(filters, sortBy);
  }

  const filtered = filterProperties(mockProperties, filters);
  return sortProperties(filtered, sortBy);
}

export { filterProperties, sortProperties };
