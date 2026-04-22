import { ReactNode } from "react";

export function PageBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-semibold text-brand-navy">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-brand-slate">{children}</div>
    </section>
  );
}
