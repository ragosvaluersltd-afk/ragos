import Link from "next/link";
import { PropertyCard } from "@/components/properties/property-card";
import { Insight, Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <h3 className="text-xl font-semibold text-brand-navy">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-brand-slate">{service.description}</p>
      <Link href={service.href} className="mt-5 inline-flex text-sm font-semibold text-brand-blue hover:text-[#25277a]">
        Learn more →
      </Link>
    </article>
  );
}

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 text-center shadow-card">
      <p className="text-2xl font-bold text-brand-blue">{value}</p>
      <p className="mt-2 text-sm uppercase tracking-wide text-brand-slate">{label}</p>
    </div>
  );
}

export { PropertyCard };

export function ArticleCard({ article }: { article: Insight }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
      <p className="text-xs uppercase tracking-[0.1em] text-brand-slate">{article.date}</p>
      <h3 className="mt-3 text-lg font-semibold leading-7 text-brand-navy">{article.title}</h3>
      <p className="mt-3 text-sm leading-6 text-brand-slate">{article.excerpt}</p>
      <Link href="/insights" className="mt-5 inline-flex text-sm font-semibold text-brand-blue hover:text-[#25277a]">
        Read insight →
      </Link>
    </article>
  );
}
