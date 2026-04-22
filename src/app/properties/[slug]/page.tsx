import type { Metadata } from "next";
import Link from "next/link";
import { PropertyInquiryForm } from "@/components/forms/property-inquiry-form";
import { notFound } from "next/navigation";
import { PropertyCard } from "@/components/properties/property-card";
import { Container } from "@/components/ui/container";
import {
  formatListingTypeBadge,
  formatLocation,
  formatPrice,
  formatPropertySize,
  formatPropertyType,
  formatReferenceCode
} from "@/lib/formatters";
import { getAllProperties, getPropertyBySlug, getRelatedProperties } from "@/lib/properties";

export async function generateStaticParams() {
  const properties = await getAllProperties();
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property not found | Ragos Valuers and Estate Agents"
    };
  }

  return {
    title: `${property.title} | Ragos Valuers and Estate Agents`,
    description: property.summary,
    openGraph: {
      title: property.title,
      description: property.summary,
      images: [{ url: property.coverImage.url, alt: property.coverImage.alt }],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.summary,
      images: [property.coverImage.url]
    }
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const related = await getRelatedProperties(property, 3);

  return (
    <div className="pb-16">
      <section className="bg-gradient-to-br from-brand-mist via-white to-[#fdf6eb] py-14 sm:py-16">
        <Container>
          <Link href="/properties" className="text-sm font-medium text-brand-blue hover:text-[#25277a]">
            ← Back to listings
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-orange">
                {formatListingTypeBadge(property.listingType)} · {formatPropertyType(property.propertyType)}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-brand-navy sm:text-4xl">{property.title}</h1>
              <p className="mt-2 text-base text-brand-slate">{formatLocation(property)}</p>
              <p className="mt-4 text-3xl font-bold text-brand-blue">{formatPrice(property.price, property.currency)}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-brand-slate">
                {property.bedrooms ? <span>{property.bedrooms} Bedrooms</span> : null}
                {property.bathrooms ? <span>{property.bathrooms} Bathrooms</span> : null}
                <span>{formatPropertySize(property)}</span>
                <span>{formatReferenceCode(property.referenceCode)}</span>
              </div>
            </div>
            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-brand-navy">Request details or arrange viewing</h2>
              <p className="mt-2 text-sm text-brand-slate">
                Speak directly with our agency team for availability, inspections, and advisory on this listing.
              </p>
              <PropertyInquiryForm propertyId={property.id} propertySlug={property.slug} />
              <div className="mt-3 text-sm">
                <Link href="tel:+254700000000" className="block rounded-lg border border-brand-blue px-4 py-2.5 text-center font-semibold text-brand-blue">
                  Call +254 700 000 000
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Container className="mt-10 space-y-10">
        <section className="grid gap-4 lg:grid-cols-3">
          {[property.coverImage, ...property.gallery].map((image, index) => (
            <div key={image.url} className={`${index === 0 ? "lg:col-span-2" : ""} overflow-hidden rounded-2xl bg-brand-mist`}>
              <img src={image.url} alt={image.alt} className="h-64 w-full object-cover sm:h-80" />
            </div>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-brand-navy">Property overview</h2>
              <p className="mt-3 text-brand-slate">{property.summary}</p>
              <p className="mt-4 leading-7 text-brand-slate">{property.description}</p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-brand-navy">Features and amenities</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-orange">Features</h3>
                  <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                    {property.features.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-orange">Amenities</h3>
                  <ul className="mt-3 space-y-2 text-sm text-brand-slate">
                    {property.amenities.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-brand-navy">Property facts</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                <dt className="text-brand-slate">Status</dt>
                <dd className="font-semibold capitalize text-brand-navy">{property.status.replace("-", " ")}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                <dt className="text-brand-slate">Listing type</dt>
                <dd className="font-semibold text-brand-navy">{formatListingTypeBadge(property.listingType)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                <dt className="text-brand-slate">Property type</dt>
                <dd className="font-semibold text-brand-navy">{formatPropertyType(property.propertyType)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                <dt className="text-brand-slate">Published</dt>
                <dd className="font-semibold text-brand-navy">{new Date(property.publishedAt).toLocaleDateString("en-KE")}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-brand-slate">Reference</dt>
                <dd className="font-semibold text-brand-navy">{property.referenceCode}</dd>
              </div>
            </dl>
          </aside>
        </section>

        {related.length > 0 ? (
          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold text-brand-navy">Related properties</h2>
              <Link href="/properties" className="text-sm font-semibold text-brand-blue hover:text-[#25277a]">
                View all listings
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
