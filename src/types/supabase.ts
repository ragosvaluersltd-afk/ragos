export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          title: string;
          slug: string;
          listing_type: "for-sale" | "for-rent";
          property_type: "apartment" | "house" | "townhouse" | "land" | "office";
          price: number;
          currency: "KES" | "USD";
          city: string;
          location: string;
          sublocation: string | null;
          bedrooms: number | null;
          bathrooms: number | null;
          size_sqm: number | null;
          size_sqft: number | null;
          summary: string;
          description: string;
          features: string[];
          amenities: string[];
          status: "available" | "under-offer" | "sold" | "let";
          featured: boolean;
          cover_image_url: string;
          cover_image_alt: string;
          gallery: Json;
          reference_code: string;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          created_at: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          property_id: string | null;
          property_slug: string | null;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          preferred_contact_method: "email" | "phone" | null;
          created_at: string;
        };
      };
      valuation_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          property_location: string;
          property_type: string;
          valuation_type: string;
          additional_notes: string | null;
          created_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "agent" | "viewer";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};

export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
export type ContactInsert = Omit<Database["public"]["Tables"]["contacts"]["Row"], "id" | "created_at">;
export type InquiryInsert = Omit<Database["public"]["Tables"]["inquiries"]["Row"], "id" | "created_at">;
export type ValuationRequestInsert = Omit<Database["public"]["Tables"]["valuation_requests"]["Row"], "id" | "created_at">;
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type ContactRow = Database["public"]["Tables"]["contacts"]["Row"];
export type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];
export type ValuationRequestRow = Database["public"]["Tables"]["valuation_requests"]["Row"];
