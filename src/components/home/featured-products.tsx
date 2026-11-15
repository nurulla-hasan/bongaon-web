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

  const withImages = products.filter((product) => Boolean(product.image));
  const withoutImages = products.filter((product) => !product.image);
  const featuredProducts = [...withImages, ...withoutImages].slice(0, 10);

  return (
    <SectionWrapper id="featured-products" bg="muted" padding="md">
      <SectionHeading
        as="h3"
        variant="plain"
        alignment="left"
        title={t("featuredTitle")}
        description={t("featuredDesc")}
        descriptionClassName="mt-1.5"
      >
        <Button variant="outline" size="lg" render={<Link href="/products" />}>
          {t("featuredCta")}
          <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
        </Button>
      </SectionHeading>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {featuredProducts.map((product, index) => (
          <AnimationWrapper key={product.slug} delay={index * 0.04}>
            <ProductCard product={product} />
          </AnimationWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
