import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { ProductCard } from "@/components/card/product-card";
import { getBazarData } from "@/data/mock-bazar";

export async function FeaturedProductsSection() {
  const locale = await getLocale();
  const [t, { products }] = await Promise.all([
    getTranslations("Home"),
    getBazarData(locale),
  ]);

  return (
    <SectionWrapper id="featured-products" bg="muted" padding="md">
      <SectionHeading
        variant="plain"
        alignment="left"
        title={t("featuredTitle")}
        description={t("featuredDesc")}
      >
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/products" />}
        >
          {t("featuredCta")}
          <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
        </Button>
      </SectionHeading>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <AnimationWrapper key={product.slug} delay={index * 0.04}>
            <ProductCard product={product} />
          </AnimationWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
