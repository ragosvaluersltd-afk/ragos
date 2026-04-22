import Link from "next/link";
import { Container } from "@/components/ui/container";

const quickLinks = [
  ["About", "/about"],
  ["Valuation Services", "/valuation"],
  ["Estate Agency", "/estate-agency"],
  ["Properties", "/properties"],
  ["Insights", "/insights"],
  ["Contact", "/contact"]
];

const serviceLinks = [
  "Mortgage Valuation",
  "Market Valuation",
  "Insurance Valuation",
  "Rental Assessment",
  "Commercial Valuation",
  "Land Valuation"
];

export function Footer() {
  return (
    <footer className="bg-brand-navy py-16 text-slate-200">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-base font-semibold text-white">Ragos Valuers and Estate Agents</h3>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Independent valuation and real estate advisory firm serving clients across Kenya since 2005.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-slate-300 transition hover:text-brand-orange">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Services</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {serviceLinks.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Nairobi, Kenya</li>
              <li>+254 700 000 000</li>
              <li>info@ragosvaluers.co.ke</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Ragos Valuers and Estate Agents. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
