import { createPropertySlug } from "@/lib/mappers/property-slug";
import { mapPropertyRowToListing } from "@/lib/mappers/property";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabasePublicConfig, getSupabaseServiceRoleKey } from "@/lib/supabase/config";
import { validateAdminPropertyInput } from "@/lib/validation/admin";
import { AdminPropertyInput } from "@/types/admin";
import { ContactRow, InquiryRow, PropertyRow, ValuationRequestRow } from "@/types/supabase";

const PROPERTY_SELECT =
  "id,title,slug,listing_type,property_type,price,currency,city,location,sublocation,bedrooms,bathrooms,size_sqm,size_sqft,summary,description,features,amenities,status,featured,cover_image_url,cover_image_alt,gallery,reference_code,published_at,created_at,updated_at";

export async function getDashboardCounts() {
  const client = createSupabaseServerClient();

  const [properties, inquiries, valuationRequests] = await Promise.all([
    client.request<PropertyRow[]>("properties", { params: { select: "id" }, useServiceRole: true }),
    client.request<InquiryRow[]>("inquiries", { params: { select: "id" }, useServiceRole: true }),
    client.request<ValuationRequestRow[]>("valuation_requests", { params: { select: "id" }, useServiceRole: true })
  ]);

  return {
    properties: properties.length,
    inquiries: inquiries.length,
    valuationRequests: valuationRequests.length
  };
}

export async function listAdminProperties() {
  const client = createSupabaseServerClient();
  const rows = await client.request<PropertyRow[]>("properties", {
    params: { select: PROPERTY_SELECT, order: "created_at.desc" },
    useServiceRole: true
  });

  return rows.map(mapPropertyRowToListing);
}

export async function getAdminPropertyById(id: string) {
  const client = createSupabaseServerClient();
  const rows = await client.request<PropertyRow[]>("properties", {
    params: { select: PROPERTY_SELECT, id: `eq.${id}`, limit: 1 },
    useServiceRole: true
  });

  return rows[0] ?? null;
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const client = createSupabaseServerClient();
  const rows = await client.request<PropertyRow[]>("properties", {
    params: { select: "id,slug", slug: `eq.${slug}` },
    useServiceRole: true
  });

  if (rows.length === 0) return slug;
  if (excludeId && rows.every((row) => row.id === excludeId)) return slug;

  let increment = 2;
  let candidate = `${slug}-${increment}`;

  while (true) {
    const matches = await client.request<PropertyRow[]>("properties", {
      params: { select: "id", slug: `eq.${candidate}` },
      useServiceRole: true
    });

    if (matches.length === 0) return candidate;
    increment += 1;
    candidate = `${slug}-${increment}`;
  }
}

async function enforceFeaturedLimit(featured: boolean, excludeId?: string) {
  if (!featured) return;

  const client = createSupabaseServerClient();
  const rows = await client.request<PropertyRow[]>("properties", {
    params: { select: "id", featured: "eq.true" },
    useServiceRole: true
  });

  const activeFeatured = excludeId ? rows.filter((row) => row.id !== excludeId) : rows;

  if (activeFeatured.length >= 3) {
    throw new Error("Only 3 properties can be featured at a time");
  }
}

function mapInputToRow(input: AdminPropertyInput, slug: string) {
  return {
    title: input.title,
    slug,
    listing_type: input.listingType,
    property_type: input.propertyType,
    price: input.price,
    currency: input.currency,
    city: input.city,
    location: input.location,
    sublocation: input.sublocation ?? null,
    bedrooms: input.bedrooms ?? null,
    bathrooms: input.bathrooms ?? null,
    size_sqm: input.sizeSqm ?? null,
    size_sqft: input.sizeSqft ?? null,
    summary: input.summary,
    description: input.description,
    features: input.features,
    amenities: input.amenities,
    status: input.status,
    featured: input.featured,
    cover_image_url: input.coverImageUrl,
    cover_image_alt: input.coverImageAlt,
    gallery: input.gallery,
    reference_code: input.referenceCode,
    published_at: new Date().toISOString()
  };
}

export async function createAdminProperty(payload: unknown) {
  const input = validateAdminPropertyInput(payload);
  const slugBase = createPropertySlug(input.slug || input.title);
  const slug = await ensureUniqueSlug(slugBase);
  await enforceFeaturedLimit(input.featured);

  const client = createSupabaseServerClient();
  const rows = await client.request<PropertyRow[]>("properties", {
    method: "POST",
    body: mapInputToRow(input, slug),
    params: { select: PROPERTY_SELECT },
    useServiceRole: true
  });

  return rows[0];
}

export async function updateAdminProperty(id: string, payload: unknown) {
  const input = validateAdminPropertyInput(payload);
  const slugBase = createPropertySlug(input.slug || input.title);
  const slug = await ensureUniqueSlug(slugBase, id);
  await enforceFeaturedLimit(input.featured, id);

  const client = createSupabaseServerClient();
  const rows = await client.request<PropertyRow[]>("properties", {
    method: "PATCH",
    body: mapInputToRow(input, slug),
    params: { select: PROPERTY_SELECT, id: `eq.${id}` },
    useServiceRole: true
  });

  return rows[0] ?? null;
}

export async function deleteAdminProperty(id: string) {
  const client = createSupabaseServerClient();
  await client.request<PropertyRow[]>("properties", {
    method: "DELETE",
    params: { id: `eq.${id}` },
    useServiceRole: true
  });
}

export async function listAdminInquiries() {
  const client = createSupabaseServerClient();
  return client.request<InquiryRow[]>("inquiries", {
    params: { select: "*", order: "created_at.desc" },
    useServiceRole: true
  });
}

export async function listAdminValuationRequests() {
  const client = createSupabaseServerClient();
  return client.request<ValuationRequestRow[]>("valuation_requests", {
    params: { select: "*", order: "created_at.desc" },
    useServiceRole: true
  });
}

export async function listAdminContacts() {
  const client = createSupabaseServerClient();
  return client.request<ContactRow[]>("contacts", {
    params: { select: "*", order: "created_at.desc" },
    useServiceRole: true
  });
}

export async function uploadPropertyImage(file: File, folder: string) {
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "property-images";
  const fileExt = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${fileExt}`;
  const { url } = getSupabasePublicConfig();
  const serviceRole = getSupabaseServiceRoleKey();

  const response = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    headers: {
      apikey: serviceRole,
      Authorization: `Bearer ${serviceRole}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "true"
    },
    body: await file.arrayBuffer()
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}
