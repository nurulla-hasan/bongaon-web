import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/card/product-card";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { getBazarData } from "@/data/mock-bazar";

const SHOWCASE_CATEGORY_IDS = [
  "shutki-bhorta",
  "achar-chutney",
  "probashi-combo",
] as const;

export async function CategoryShowcaseSection() {
  const locale = await getLocale();
  const [t, { categories, products }] = await Promise.all([
    getTranslations("Home"),
    getBazarData(locale),
  ]);

  const sections = SHOWCASE_CATEGORY_IDS.map((id) => {
    const category = categories.find((item) => item.id === id);
    if (!category) return null;

    const items = products
      .filter((product) => product.category === category.name)
      .slice(0, 10);

    if (items.length === 0) return null;

    return { category, items };
  }).filter((section) => section !== null);

  return (
    <SectionWrapper id="category-showcase" padding="md">
      <div className="space-y-14">
        {sections.map(({ category, items }) => (
          <div key={category.id}>
            <SectionHeading
              variant="plain"
              alignment="left"
              title={category.name}
              description={category.subtitle}
              descriptionClassName="mt-1.5"
            >
              <Button
                variant="outline"
                size="lg"
                render={<Link href={`/products?category=${category.id}`} />}
              >
                {t("featuredCta")}
                <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
              </Button>
            </SectionHeading>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {items.map((product, index) => (
                <AnimationWrapper key={product.slug} delay={index * 0.04}>
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
