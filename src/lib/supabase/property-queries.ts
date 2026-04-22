import { PropertyFilterInput, PropertyListing, PropertySortOption } from "@/types";

export type PropertyRepository = {
  getAll: () => Promise<PropertyListing[]>;
  getBySlug: (slug: string) => Promise<PropertyListing | null>;
  getFeatured: () => Promise<PropertyListing[]>;
  getRelated: (property: PropertyListing, limit?: number) => Promise<PropertyListing[]>;
  query: (filters: PropertyFilterInput, sortBy: PropertySortOption) => Promise<PropertyListing[]>;
};

// Placeholder boundary for upcoming Supabase integration.
// Future implementation can satisfy PropertyRepository while keeping UI contracts unchanged.
export const supabasePropertyRepository: PropertyRepository | null = null;
