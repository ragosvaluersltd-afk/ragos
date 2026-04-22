export const siteConfig = {
  name: "Ragos Valuers and Estate Agents",
  description:
    "Professional valuation, estate agency, and property advisory services in Kenya.",
  url: "https://ragosvaluers.co.ke",
  phone: "+254700000000",
  email: "info@ragosvaluers.co.ke",
  addressLocality: "Nairobi",
  addressCountry: "KE"
} as const;

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || siteConfig.url;
}
