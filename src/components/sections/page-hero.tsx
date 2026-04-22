import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function PageHero({ title, description, tag }: { title: string; description: string; tag: string }) {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-brand-mist via-white to-[#eef2ff] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,48,146,0.12),transparent_40%)]" />
      <div className="relative">
        <SectionHeading title={title} description={description} tag={tag} />
      </div>
    </Section>
  );
}
