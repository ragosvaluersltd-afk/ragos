import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";

export function CtaSection() {
  return (
    <Section className="bg-gradient-to-r from-brand-blue via-[#3b3fb0] to-brand-navy text-white">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_auto] lg:items-center">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Request a Professional Property Valuation</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
            Engage an experienced team for independent valuation guidance aligned with lender, investor, legal, and internal decision requirements.
          </p>
        </div>
        <Button href="/valuation" variant="secondary" className="h-fit">
          Request a Valuation
        </Button>
      </div>
    </Section>
  );
}
