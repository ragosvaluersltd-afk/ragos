export type ListingType = "for-sale" | "for-rent";

export type PropertyType = "apartment" | "house" | "townhouse" | "land" | "office";

export type PropertyStatus = "available" | "under-offer" | "sold" | "let";

export type CurrencyCode = "KES" | "USD";

export type PropertyImage = {
  url: string;
  alt: string;
};

export type PropertyListing = {
  id: string;
  title: string;
  slug: string;
  listingType: ListingType;
  propertyType: PropertyType;
  price: number;
  currency: CurrencyCode;
  city: string;
  location: string;
  sublocation?: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqm?: number;
  sizeSqft?: number;
  summary: string;
  description: string;
  features: string[];
  amenities: string[];
  status: PropertyStatus;
  featured: boolean;
  coverImage: PropertyImage;
  gallery: PropertyImage[];
  referenceCode: string;
  publishedAt: string;
};

export type PropertyFilterInput = {
  listingType?: ListingType | "all";
  propertyType?: PropertyType | "all";
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
};

export type PropertySortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "size-desc";
