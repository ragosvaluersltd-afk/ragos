import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ContactPayload, InquiryPayload, ValuationPayload } from "@/lib/validation/forms";
import { ContactInsert, InquiryInsert, ValuationRequestInsert } from "@/types/supabase";

export async function createContactSubmission(payload: ContactPayload) {
  const client = createSupabaseServerClient();
  const body: ContactInsert = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    message: payload.message
  };

  await client.request("contacts", {
    method: "POST",
    body
  });
}

export async function createValuationSubmission(payload: ValuationPayload) {
  const client = createSupabaseServerClient();
  const body: ValuationRequestInsert = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    property_location: payload.propertyLocation,
    property_type: payload.propertyType,
    valuation_type: payload.valuationType,
    additional_notes: payload.additionalNotes || null
  };

  await client.request("valuation_requests", {
    method: "POST",
    body
  });
}

export async function createInquirySubmission(payload: InquiryPayload) {
  const client = createSupabaseServerClient();
  const body: InquiryInsert = {
    property_id: payload.propertyId || null,
    property_slug: payload.propertySlug || null,
    name: payload.name,
    email: payload.email,
    phone: payload.phone || null,
    message: payload.message,
    preferred_contact_method: payload.preferredContactMethod || "email"
  };

  await client.request("inquiries", {
    method: "POST",
    body
  });
}
