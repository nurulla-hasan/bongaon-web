import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Package } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/common/animation-wrapper";
import type { ApiCategory } from "@/types";

export async function CategoryGrid({
  apiCategories,
}: {
  apiCategories?: ApiCategory[];
}) {
  const categories = apiCategories ?? [];
  if (categories.length === 0) return null;

  const t = await getTranslations("Home");

  return (
    <SectionWrapper id="categories" padding="md">
      <SectionHeading
        as="h3"
        variant="plain"
        alignment="left"
        title={t("catTitle")}
        description={t("catDesc")}
      >
        <Button variant="outline" size="lg" render={<Link href="/products" />}>
          {t("catCta")}
          <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
        </Button>
      </SectionHeading>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category, index) => (
          <AnimationWrapper key={category.id} delay={index * 0.04}>
            <Link
              href={`/products?category=${category.id}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-card p-3 shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-md">
                {category.imageUrl ? (
                  <div className="relative size-full overflow-hidden rounded-xl">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex size-full items-center justify-center rounded-xl bg-primary/5 text-primary/80 transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                    <Package
                      className="size-12 transition-transform duration-300 group-hover:scale-110 sm:size-14"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </div>
                )}
              </div>

              <div className="space-y-0.5 px-1">
                <h3 className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
                {category._count && (
                  <p className="text-xs text-muted-foreground">
                    {category._count.products}{" "}
                    {category._count.products === 1 ? "Product" : "Products"}
                  </p>
                )}
              </div>
            </Link>
          </AnimationWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
