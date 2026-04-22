import { CurrencyCode, ListingType, PropertyStatus, PropertyType } from "@/types/property";

export type AdminPropertyInput = {
  title: string;
  slug?: string;
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
  coverImageUrl: string;
  coverImageAlt: string;
  gallery: { url: string; alt: string }[];
  referenceCode: string;
};

export type AdminSession = {
  id: string;
  email: string;
  role: "admin";
};
