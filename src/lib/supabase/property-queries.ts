import { mapPropertyRowToListing } from "@/lib/mappers/property";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { filterProperties, sortProperties } from "@/lib/queries/property-queries";
import { PropertyFilterInput, PropertyListing, PropertySortOption } from "@/types";
import { PropertyRow } from "@/types/supabase";

export type PropertyRepository = {
  getAll: () => Promise<PropertyListing[]>;
  getBySlug: (slug: string) => Promise<PropertyListing | null>;
  getFeatured: (limit?: number) => Promise<PropertyListing[]>;
  getRelated: (property: PropertyListing, limit?: number) => Promise<PropertyListing[]>;
  query: (filters: PropertyFilterInput, sortBy: PropertySortOption) => Promise<PropertyListing[]>;
};

const PROPERTY_SELECT =
  "id,title,slug,listing_type,property_type,price,currency,city,location,sublocation,bedrooms,bathrooms,size_sqm,size_sqft,summary,description,features,amenities,status,featured,cover_image_url,cover_image_alt,gallery,reference_code,published_at,created_at,updated_at";

async function getPropertyRows(params: Record<string, string | number | boolean> = {}) {
  const client = createSupabaseServerClient();

  const rows = await client.request<PropertyRow[]>("properties", {
    params: {
      select: PROPERTY_SELECT,
      ...params
    }
  });

  return rows;
}

export const supabasePropertyRepository: PropertyRepository = {
  async getAll() {
    const rows = await getPropertyRows({ order: "published_at.desc" });
    return rows.map(mapPropertyRowToListing);
  },

  async getBySlug(slug) {
    const rows = await getPropertyRows({ slug: `eq.${slug}`, limit: 1 });
    const row = rows[0];
    return row ? mapPropertyRowToListing(row) : null;
  },

  async getFeatured(limit = 3) {
    const rows = await getPropertyRows({ featured: "eq.true", order: "published_at.desc", limit });
    return rows.map(mapPropertyRowToListing);
  },

  async getRelated(property, limit = 3) {
    const rows = await getPropertyRows({
      id: `neq.${property.id}`,
      or: `(location.eq.${property.location},property_type.eq.${property.propertyType})`,
      order: "published_at.desc",
      limit
    });

    return rows.map(mapPropertyRowToListing);
  },

  async query(filters, sortBy) {
    const rows = await getPropertyRows({ order: "published_at.desc" });
    const mapped = rows.map(mapPropertyRowToListing);
    const filtered = filterProperties(mapped, filters);
    return sortProperties(filtered, sortBy);
  }
};
