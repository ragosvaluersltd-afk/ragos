import { Insight, Service } from "@/types";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Valuation Services", href: "/valuation-services" },
  { label: "Estate Agency", href: "/estate-agency" },
  { label: "Properties", href: "/properties" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" }
];

export const services: Service[] = [
  {
    title: "Valuation Services",
    description: "Professional valuation reports for mortgage, market, insurance, and statutory requirements.",
    href: "/valuation-services"
  },
  {
    title: "Estate Agency",
    description: "Reliable representation for property owners, buyers, landlords, and tenants.",
    href: "/estate-agency"
  },
  {
    title: "Property Consultancy",
    description: "Practical real estate advisory informed by location-level market intelligence.",
    href: "/contact"
  },
  {
    title: "Sales and Lettings",
    description: "Structured sales and rental support for residential, commercial, and mixed-use assets.",
    href: "/properties"
  }
];

export const insights: Insight[] = [
  {
    title: "Why Accurate Valuation Strengthens Lending Decisions",
    excerpt: "How objective valuation improves transparency for lenders, investors, and property owners.",
    date: "April 2026"
  },
  {
    title: "Understanding Nairobi's Office Leasing Patterns",
    excerpt: "A practical view of occupancy trends, tenant priorities, and location-led value drivers.",
    date: "March 2026"
  },
  {
    title: "Key Considerations Before Listing a Property",
    excerpt: "Preparation standards that help sellers and landlords secure stronger outcomes in market.",
    date: "February 2026"
  }
];
