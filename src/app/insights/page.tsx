import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/shared/section";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleCard } from "@/components/ui/cards";
import { insights } from "@/data/site";

export const metadata: Metadata = {
  title: "Insights",
  description: "Read property valuation and real estate market insights from Ragos Valuers and Estate Agents.",
  alternates: { canonical: "/insights" }
};

export default function InsightsPage() {
  const articleSchema = insights.map((article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: `${article.date} 01`
  }));

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHero
        tag="Insights"
        title="Real Estate Commentary and Valuation Perspectives"
        description="This section is structured for future SEO and thought leadership content on market trends, valuation standards, and client decision support."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {insights.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </Section>
    </>
  );
}
