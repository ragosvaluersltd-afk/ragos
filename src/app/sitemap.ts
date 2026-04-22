import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/properties";
import { getBaseUrl } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const staticRoutes = ["", "/about", "/valuation", "/estate-agency", "/properties", "/insights", "/contact"];
  const properties = await getAllProperties();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...properties.map((property) => ({
      url: `${baseUrl}/properties/${property.slug}`,
      lastModified: new Date(property.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.7
    }))
  ];
}
