import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Droplet,
  Flame,
  Gift,
  Package,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { getBazarData, type CategoryItem } from "@/data/mock-bazar";
import { cn } from "@/lib/utils";
import { ctaSecondary } from "./cta";

const categoryIconMap: Record<CategoryItem["iconName"], typeof Flame> = {
  flame: Flame,
  jar: UtensilsCrossed,
  droplet: Droplet,
  sparkles: Sparkles,
  package: Package,
  gift: Gift,
};

const categoryTints = [
  "bg-primary/5",
  "bg-clay/5",
  "bg-gold/10",
  "bg-secondary",
  "bg-muted",
  "bg-accent/30",
];

export async function CategoryGrid() {
  const locale = await getLocale();
  const [t, { categories }] = await Promise.all([
    getTranslations("Home"),
    getBazarData(locale),
  ]);

  return (
    <SectionWrapper id="categories" padding="md">
      <SectionHeading
        variant="plain"
        eyebrow={t("catEyebrow")}
        title={t("catTitle")}
        description={t("catDesc")}
      >
        <Link href="/products" className={ctaSecondary}>
          {t("catCta")}
          <ArrowRight className="size-4" />
        </Link>
      </SectionHeading>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = categoryIconMap[category.iconName];
          return (
            <AnimationWrapper key={category.id} delay={index * 0.05}>
              <Link
                href="/products"
                className={cn(
                  "group flex h-full flex-col gap-3 rounded-3xl border border-border/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5",
                  categoryTints[index % categoryTints.length]
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                    <Icon className="size-6" />
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {category.subtitle}
                  </p>
                </div>

                <span className="mt-auto pt-2 text-xs font-semibold text-clay">
                  {category.countLabel}
                </span>
              </Link>
            </AnimationWrapper>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
