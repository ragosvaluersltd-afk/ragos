"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createPropertySlug } from "@/lib/mappers/property-slug";
import { PropertyRow } from "@/types/supabase";

type PropertyFormValues = {
  title: string;
  slug: string;
  listingType: string;
  propertyType: string;
  price: string;
  currency: string;
  city: string;
  location: string;
  sublocation: string;
  bedrooms: string;
  bathrooms: string;
  sizeSqm: string;
  sizeSqft: string;
  summary: string;
  description: string;
  features: string;
  amenities: string;
  status: string;
  featured: boolean;
  coverImageUrl: string;
  coverImageAlt: string;
  referenceCode: string;
  gallery: { url: string; alt: string }[];
};

function mapInitial(property?: PropertyRow): PropertyFormValues {
  return {
    title: property?.title ?? "",
    slug: property?.slug ?? "",
    listingType: property?.listing_type ?? "for-sale",
    propertyType: property?.property_type ?? "apartment",
    price: property?.price?.toString() ?? "",
    currency: property?.currency ?? "KES",
    city: property?.city ?? "Nairobi",
    location: property?.location ?? "",
    sublocation: property?.sublocation ?? "",
    bedrooms: property?.bedrooms?.toString() ?? "",
    bathrooms: property?.bathrooms?.toString() ?? "",
    sizeSqm: property?.size_sqm?.toString() ?? "",
    sizeSqft: property?.size_sqft?.toString() ?? "",
    summary: property?.summary ?? "",
    description: property?.description ?? "",
    features: property?.features?.join(", ") ?? "",
    amenities: property?.amenities?.join(", ") ?? "",
    status: property?.status ?? "available",
    featured: property?.featured ?? false,
    coverImageUrl: property?.cover_image_url ?? "",
    coverImageAlt: property?.cover_image_alt ?? "",
    referenceCode: property?.reference_code ?? "",
    gallery: Array.isArray(property?.gallery)
      ? ((property?.gallery as { url: string; alt?: string }[]) ?? [])
          .filter((item) => item?.url)
          .map((item, index) => ({ url: item.url, alt: item.alt ?? `Property gallery image ${index + 1}` }))
      : []
  };
}

export function PropertyForm({ property }: { property?: PropertyRow }) {
  const router = useRouter();
  const [values, setValues] = useState<PropertyFormValues>(() => mapInitial(property));
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [manualSlug, setManualSlug] = useState(Boolean(property?.slug));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const coverPreview = useMemo(() => (coverFile ? URL.createObjectURL(coverFile) : values.coverImageUrl), [coverFile, values.coverImageUrl]);
  const galleryPreviews = useMemo(() => galleryFiles.map((file) => URL.createObjectURL(file)), [galleryFiles]);

  function setField<K extends keyof PropertyFormValues>(key: K, value: PropertyFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const title = event.target.value;
    setValues((prev) => ({ ...prev, title, slug: manualSlug ? prev.slug : createPropertySlug(title) }));
  }

  async function uploadFiles() {
    let coverImageUrl = values.coverImageUrl;
    let gallery = values.gallery;

    if (coverFile) {
      const formData = new FormData();
      formData.append("folder", "cover");
      formData.append("files", coverFile);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Failed to upload cover image");
      const payload = (await response.json()) as { urls: string[] };
      coverImageUrl = payload.urls[0] ?? "";
    }

    if (galleryFiles.length > 0) {
      const formData = new FormData();
      formData.append("folder", "gallery");
      for (const file of galleryFiles) {
        formData.append("files", file);
      }
      const response = await fetch("/api/admin/uploads", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Failed to upload gallery images");
      const payload = (await response.json()) as { urls: string[] };
      gallery = payload.urls.map((url, index) => ({ url, alt: `Property gallery image ${index + 1}` }));
    }

    return { coverImageUrl, gallery };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const uploads = await uploadFiles();
      const payload = {
        ...values,
        ...uploads,
        price: Number(values.price),
        bedrooms: values.bedrooms ? Number(values.bedrooms) : undefined,
        bathrooms: values.bathrooms ? Number(values.bathrooms) : undefined,
        sizeSqm: values.sizeSqm ? Number(values.sizeSqm) : undefined,
        sizeSqft: values.sizeSqft ? Number(values.sizeSqft) : undefined
      };

      const method = property ? "PATCH" : "POST";
      const endpoint = property ? `/api/admin/properties/${property.id}` : "/api/admin/properties";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Failed to save property");
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save property");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input value={values.title} onChange={onTitleChange} placeholder="Title" className="rounded-lg border px-3 py-2" required />
        <input
          value={values.slug}
          onChange={(e) => {
            setManualSlug(true);
            setField("slug", createPropertySlug(e.target.value));
          }}
          placeholder="slug"
          className="rounded-lg border px-3 py-2"
          required
        />
        <input value={values.referenceCode} onChange={(e) => setField("referenceCode", e.target.value)} placeholder="Reference code" className="rounded-lg border px-3 py-2" required />
        <input value={values.city} onChange={(e) => setField("city", e.target.value)} placeholder="City" className="rounded-lg border px-3 py-2" required />
        <input value={values.location} onChange={(e) => setField("location", e.target.value)} placeholder="Location" className="rounded-lg border px-3 py-2" required />
        <input value={values.sublocation} onChange={(e) => setField("sublocation", e.target.value)} placeholder="Sublocation" className="rounded-lg border px-3 py-2" />
        <input type="number" value={values.price} onChange={(e) => setField("price", e.target.value)} placeholder="Price" className="rounded-lg border px-3 py-2" required />
        <select value={values.currency} onChange={(e) => setField("currency", e.target.value)} className="rounded-lg border px-3 py-2"><option>KES</option><option>USD</option></select>
        <select value={values.listingType} onChange={(e) => setField("listingType", e.target.value)} className="rounded-lg border px-3 py-2"><option value="for-sale">For Sale</option><option value="for-rent">For Rent</option></select>
        <select value={values.propertyType} onChange={(e) => setField("propertyType", e.target.value)} className="rounded-lg border px-3 py-2"><option value="apartment">Apartment</option><option value="house">House</option><option value="townhouse">Townhouse</option><option value="land">Land</option><option value="office">Office</option></select>
        <select value={values.status} onChange={(e) => setField("status", e.target.value)} className="rounded-lg border px-3 py-2"><option value="available">Available</option><option value="under-offer">Under Offer</option><option value="sold">Sold</option><option value="let">Let</option></select>
        <label className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"><input type="checkbox" checked={values.featured} onChange={(e) => setField("featured", e.target.checked)} />Featured property</label>
      </div>

      <textarea value={values.summary} onChange={(e) => setField("summary", e.target.value)} placeholder="Summary" className="min-h-20 w-full rounded-lg border px-3 py-2" required />
      <textarea value={values.description} onChange={(e) => setField("description", e.target.value)} placeholder="Description" className="min-h-32 w-full rounded-lg border px-3 py-2" required />

      <div className="grid gap-4 md:grid-cols-2">
        <input value={values.features} onChange={(e) => setField("features", e.target.value)} placeholder="Features (comma separated)" className="rounded-lg border px-3 py-2" />
        <input value={values.amenities} onChange={(e) => setField("amenities", e.target.value)} placeholder="Amenities (comma separated)" className="rounded-lg border px-3 py-2" />
        <input value={values.coverImageAlt} onChange={(e) => setField("coverImageAlt", e.target.value)} placeholder="Cover image alt text" className="rounded-lg border px-3 py-2" required />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Cover image</label>
        <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} />
        {coverPreview ? <img src={coverPreview} alt="Cover preview" className="h-28 w-44 rounded-lg object-cover" /> : null}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium">Gallery images</label>
        <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(Array.from(e.target.files ?? []))} />
        <div className="flex flex-wrap gap-3">
          {galleryPreviews.map((url) => (
            <img key={url} src={url} alt="Gallery preview" className="h-24 w-32 rounded-lg object-cover" />
          ))}
          {galleryFiles.length === 0
            ? values.gallery.map((image) => <img key={image.url} src={image.url} alt={image.alt} className="h-24 w-32 rounded-lg object-cover" />)
            : null}
        </div>
      </div>

      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
      <button disabled={saving} className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {saving ? "Saving..." : property ? "Update Property" : "Create Property"}
      </button>
    </form>
  );
}
