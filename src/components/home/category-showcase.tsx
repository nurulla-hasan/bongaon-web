import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/card/product-card";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import type { HomeShowcase } from "@/types";

export async function CategoryShowcaseSection({
  apiShowcases,
}: {
  apiShowcases?: HomeShowcase[];
}) {
  const sections = (apiShowcases ?? []).filter(
    (section) => section.products.length > 0,
  );

  if (sections.length === 0) return null;

  const t = await getTranslations("Home");

  return (
    <SectionWrapper id="category-showcase" padding="md">
      <div className="space-y-14">
        {sections.map(({ category, products }) => (
          <div key={category.id}>
            <SectionHeading
              as="h3"
              variant="plain"
              alignment="left"
              title={category.name}
              description={category.subtitle}
              descriptionClassName="mt-1.5"
            >
              <Button
                variant="outline"
                size="lg"
                render={<Link href={`/products?category=${category.slug}`} />}
              >
                {t("featuredCta")}
                <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
              </Button>
            </SectionHeading>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {products.slice(0, 10).map((product, index) => (
                <AnimationWrapper key={product.id} delay={index * 0.04}>
                  <ProductCard product={product} />
                </AnimationWrapper>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
