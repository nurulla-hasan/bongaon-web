import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  Heart,
  Home,
  Leaf,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { getBazarData } from "@/data/mock-bazar";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH, HERO_HEIGHT } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ctaPrimary, ctaSecondary } from "./cta";

export async function HeroBanner() {
  const locale = await getLocale();
  const [t, { products }] = await Promise.all([
    getTranslations("Home"),
    getBazarData(locale),
  ]);

  const highlightProduct =
    products.find((product) => product.slug === "deshi-danadar-gawa-ghee") ??
    products[0];

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
        "relative isolate flex flex-col overflow-hidden bg-secondary/40"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
      >
        <Image
          src="/images/hero-village-seamless.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/10" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 lg:hidden"
      >
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <svg
        aria-hidden
        viewBox="0 0 160 240"
        className="pointer-events-none absolute -left-8 bottom-28 -z-10 hidden h-48 w-32 text-primary/20 lg:block"
        fill="currentColor"
      >
        <path
          d="M20 228C52 176 76 128 112 84"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path d="M44 196c-22-2-32-16-32-34 20 2 32 14 32 34Z" />
        <path d="M62 168c18-10 22-26 14-42-16 8-22 24-14 42Z" />
        <path d="M80 138c-20-4-28-18-26-36 18 4 28 18 26 36Z" />
        <path d="M100 108c16-10 20-26 12-42-16 8-20 24-12 42Z" />
      </svg>

      <div
        className={cn(
          "mx-auto my-auto grid w-full gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:py-12",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <div className="relative z-10 lg:col-span-6 lg:self-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/80 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
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

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("heroDescription")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products" className={ctaPrimary}>
              {t("heroPrimaryCta")}
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/checkout" className={ctaSecondary}>
              <Send className="size-4 text-primary" />
              {t("heroSecondaryCta")}
            </Link>
          </div>

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
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative h-72 overflow-hidden rounded-3xl border border-border/60 shadow-xl sm:h-96 lg:hidden">
            <Image
              src="/images/hero-village-seamless.png"
              alt="বনগাঁও গ্রামের আচার, ঘি ও গুড়ের আয়োজন"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>

          <Link
            href={`/products/${highlightProduct.slug}`}
            className="group mt-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/90 p-3 pr-5 shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0"
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={highlightProduct.image}
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">
                {highlightProduct.badge}
              </span>
              <span className="max-w-56 truncate text-sm font-semibold text-foreground">
                {highlightProduct.name}
              </span>
            </span>
            <span className="ml-2 text-sm font-bold text-clay">
              ৳{highlightProduct.price}
            </span>
          </Link>
        </div>
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
                  className="flex items-center justify-center gap-3 px-4"
                >
                  <Icon className="size-7 shrink-0 text-primary" />
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
