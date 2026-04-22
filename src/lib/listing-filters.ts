import { PropertyFilterInput, PropertySortOption } from "@/types";

export const LISTING_TYPE_OPTIONS = [
  { value: "all", label: "All listings" },
  { value: "for-sale", label: "For sale" },
  { value: "for-rent", label: "To let" }
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "All property types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
  { value: "office", label: "Office" }
] as const;

export const BEDROOM_OPTIONS = [
  { value: "", label: "Any bedrooms" },
  { value: "1", label: "1+ bedrooms" },
  { value: "2", label: "2+ bedrooms" },
  { value: "3", label: "3+ bedrooms" },
  { value: "4", label: "4+ bedrooms" }
] as const;

export const SORT_OPTIONS: Array<{ value: PropertySortOption; label: string }> = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "size-desc", label: "Largest size" }
];

export function sanitizeFilterInput(input: PropertyFilterInput) {
  return {
    ...input,
    location: input.location?.trim() || undefined,
    minPrice: input.minPrice && input.minPrice > 0 ? input.minPrice : undefined,
    maxPrice: input.maxPrice && input.maxPrice > 0 ? input.maxPrice : undefined,
    bedrooms: input.bedrooms && input.bedrooms > 0 ? input.bedrooms : undefined
  };
}
