import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Heart,
  Home,
  Leaf,
  Package,
  Send,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { GrassTuft } from "@/components/common/leaf-decor";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import {
  CONTAINER_GUTTER,
  CONTAINER_MAX_WIDTH,
  HERO_HEIGHT,
  SURFACE_WARM,
} from "@/lib/layout";
import { cn } from "@/lib/utils";
import type { ApiProduct } from "@/types";

export async function HeroBanner({
  highlightProduct,
}: {
  highlightProduct?: ApiProduct;
}) {
  const t = await getTranslations("Home");

  const points = [
    { icon: ShieldCheck, label: t("heroPoint1") },
    { icon: Truck, label: t("heroPoint2") },
    { icon: Gift, label: t("heroPoint3") },
  ];

  const ribbonItems = [
    { icon: Leaf, title: t("ribbon1") },
    { icon: Heart, title: t("ribbon2") },
    { icon: BadgeCheck, title: t("ribbon3") },
    { icon: Home, title: t("ribbon4") },
  ];

  return (
    <SectionWrapper
      container={false}
      padding="none"
      className={cn(
        HERO_HEIGHT,
        "relative isolate flex flex-col overflow-hidden",
        SURFACE_WARM
      )}
    >
      <div
        aria-hidden
        className="paper-grain pointer-events-none absolute inset-0 -z-10 opacity-60"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 size-160 animate-glow rounded-full bg-gold/25 blur-3xl motion-reduce:animate-none" />
        <div className="absolute -bottom-48 -left-40 size-160 animate-glow rounded-full bg-primary/15 blur-3xl motion-reduce:animate-none" />
        <div className="absolute top-1/3 left-2/5 size-96 rounded-full bg-clay/10 blur-3xl" />
        <div className="absolute top-1/2 -left-32 hidden size-125 -translate-y-1/2 rounded-full border border-primary/10 lg:block" />
        <div className="absolute top-1/2 -left-24 hidden size-100 -translate-y-1/2 rounded-full border border-dashed border-gold/30 lg:block" />
      </div>

      <GrassTuft className="pointer-events-none absolute bottom-16 left-4 -z-10 hidden h-20 w-24 text-primary/15 2xl:block" />
      <GrassTuft className="pointer-events-none absolute right-2 bottom-20 -z-10 hidden h-20 w-24 -scale-x-100 text-primary/20 xl:block" />

      <div
        className={cn(
          "mx-auto my-auto grid w-full items-center gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:py-10",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <div className="relative z-10 lg:col-span-6">
          <AnimationWrapper delay={0.05} duration={0.7} once>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Leaf className="size-3.5" />
              {t("heroBadge")}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">
                {t("heroTitleStart")}{" "}
                <span className="relative inline-block text-primary">
                  {t("heroTitleHighlight")}
                  <svg
                    aria-hidden
                    viewBox="0 0 220 18"
                    className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-gold"
                    fill="none"
                  >
                    <path
                      d="M4 12C65 4 150 4 216 13"
                      stroke="currentColor"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={260}
                      className="animate-underline motion-reduce:animate-none"
                    />
                  </svg>
                </span>
              </span>

              <span className="mt-2 block text-primary">
                {t("heroTitleMiddle")}
              </span>

              <span className="mt-1 inline-flex items-center gap-3 text-foreground">
                <span>{t("heroTitleEnd")}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 36 40"
                  className="size-8 text-primary sm:size-10"
                  fill="none"
                >
                  <path
                    d="M6 12L24 4M8 20L28 20M6 28l18 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </AnimationWrapper>

          <AnimationWrapper delay={0.18} duration={0.7} once>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("heroDescription")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="2xl" render={<Link href="/products" />}>
                {t("heroPrimaryCta")}
                <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
              </Button>
              <Button
                variant="outline"
                size="2xl"
                render={<Link href="/checkout" />}
              >
                <Send className="transition-transform group-hover/button:-translate-y-0.5" />
                {t("heroSecondaryCta")}
              </Button>
            </div>
          </AnimationWrapper>

          <AnimationWrapper delay={0.3} duration={0.7} once>
            <div className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-border">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.label}
                    className={cn(
                      "flex items-center gap-2.5",
                      index === 0 ? "pr-3" : index === 2 ? "pl-3" : "px-3"
                    )}
                  >
                    <Icon className="size-5 shrink-0 text-primary" />
                    <span className="text-xs font-medium leading-tight text-foreground sm:text-sm">
                      {point.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </AnimationWrapper>
        </div>

        <AnimationWrapper
          direction="left"
          delay={0.2}
          duration={0.8}
          once
          className="relative lg:col-span-6"
        >
          <div
            aria-hidden
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-4xl bg-primary/15"
          />
          <div className="group relative h-72 overflow-hidden rounded-4xl border border-border/60 shadow-2xl shadow-primary/10 sm:h-96 lg:h-125">
            <Image
              src="/images/hero-village-seamless.png"
              alt="বনগাঁও গ্রামের আচার, ঘি ও গুড়ের আয়োজন"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-right transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
            />

            {highlightProduct?.shortTag && (
              <span className="absolute top-4 left-4 inline-flex animate-float items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur motion-reduce:animate-none">
                <Leaf className="size-3.5" />
                {highlightProduct.shortTag}
              </span>
            )}

            <span className="absolute top-4 right-4 hidden items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur sm:inline-flex">
              <Truck className="size-3.5 text-primary" />
              {t("heroPoint2")}
            </span>

            {highlightProduct && (
              <>
                <Link
                  href={`/products/${highlightProduct.slug}`}
                  className="group absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/95 p-3 pr-4 shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5 sm:right-auto sm:max-w-xs"
                >
                  <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted text-muted-foreground">
                    {highlightProduct.imageUrl ? (
                      <Image
                        src={highlightProduct.imageUrl}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                      />
                    ) : (
                      <Package className="size-6" aria-hidden />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-col">
                    {highlightProduct.badge && (
                      <span className="text-xs text-muted-foreground">
                        {highlightProduct.badge}
                      </span>
                    )}
                    <span className="truncate text-sm font-semibold text-foreground">
                      {highlightProduct.name}
                    </span>
                  </span>
                  <span className="ml-auto text-sm font-bold text-clay">
                    ৳{highlightProduct.price}
                  </span>
                </Link>

                <span className="absolute right-4 bottom-4 hidden items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur sm:inline-flex">
                  <Star className="size-3.5 fill-gold text-gold" />
                  {highlightProduct.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>
        </AnimationWrapper>
      </div>

      <div className="relative border-t border-primary/15 bg-primary/10 backdrop-blur-md">
        <div
          className={cn(
            "mx-auto py-5 sm:py-6",
            CONTAINER_MAX_WIDTH,
            CONTAINER_GUTTER
          )}
        >
          <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-4 sm:divide-x sm:divide-primary/20">
            {ribbonItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group flex items-center justify-center gap-3 px-4 transition-transform hover:-translate-y-0.5"
                >
                  <Icon className="size-7 shrink-0 text-primary transition-transform group-hover:scale-110" />
                  <span className="text-base font-bold text-foreground sm:text-lg">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
