import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Droplet,
  Flame,
  Gift,
  Globe,
  HandCoins,
  Leaf,
  Package,
  Quote,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { ProductCard } from "@/components/storefront/product-card";
import {
  getBazarData,
  type CategoryItem,
} from "@/data/mock-bazar";
import { cn } from "@/lib/utils";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";

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

const ctaPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90";

const ctaSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary";

export async function HeroBanner() {
  const t = await getTranslations("Home");

  return (
    <SectionWrapper
      container={false}
      padding="none"
      className="hero-viewport relative isolate flex items-center overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-clay/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 size-64 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background" />
      </div>

      <div
        className={cn(
          "mx-auto grid w-full items-center gap-10 py-10 sm:py-12 lg:grid-cols-12 lg:gap-16 lg:py-8",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sprout className="size-3.5" />
            {t("heroBadge")}
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("heroTitleStart")}{" "}
            <span className="text-primary">{t("heroTitleHighlight")}</span>
            {t("heroTitleEnd")}
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
              <Globe className="size-4 text-clay" />
              {t("heroSecondaryCta")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              {t("heroPoint1")}
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              {t("heroPoint2")}
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              {t("heroPoint3")}
            </span>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                { label: "রা", tone: "bg-primary/15 text-primary" },
                { label: "তা", tone: "bg-clay/15 text-clay" },
                { label: "নু", tone: "bg-gold/30 text-gold-foreground" },
              ].map((avatar) => (
                <span
                  key={avatar.label}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 border-background text-xs font-semibold",
                    avatar.tone
                  )}
                >
                  {avatar.label}
                </span>
              ))}
            </div>
            <p className="text-xs leading-snug text-muted-foreground">
              {t("heroSocialPrefix")}{" "}
              <span className="font-semibold text-foreground">
                {t("heroSocialHighlight")}
              </span>
            </p>
          </div>
        </div>

        <div className="relative isolate lg:col-span-6">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-4xl bg-gold/20 blur-2xl"
          />
          <div className="relative h-80 overflow-hidden rounded-4xl border border-border/70 bg-muted shadow-2xl sm:h-112 lg:h-150">
            <Image
              src="/images/hero-village-spread.png"
              alt="বনগাঁও গ্রামের আচার, ঘি, গুড় ও শুঁটকি ভর্তার আয়োজন"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Truck className="size-3.5" />
            </span>
            {t("heroCodBadge")}
          </div>

          <Link
            href="/products/deshi-danadar-gawa-ghee"
            className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-background/95 p-3 pr-4 shadow-lg backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            <span className="relative size-12 overflow-hidden rounded-xl">
              <Image
                src="/images/product-gawa-ghee.png"
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {t("heroTopSeller")}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {t("heroTopProduct")}
              </span>
            </span>
            <span className="ml-2 text-sm font-bold text-clay">
              {t("heroTopPrice")}
            </span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export async function TrustBar() {
  const t = await getTranslations("Home");
  const trustItems = [
    {
      icon: Truck,
      title: t("trust1Title"),
      desc: t("trust1Desc"),
      tone: "bg-primary/10 text-primary",
    },
    {
      icon: HandCoins,
      title: t("trust2Title"),
      desc: t("trust2Desc"),
      tone: "bg-clay/10 text-clay",
    },
    {
      icon: ShieldCheck,
      title: t("trust3Title"),
      desc: t("trust3Desc"),
      tone: "bg-gold/20 text-gold-foreground",
    },
    {
      icon: Globe,
      title: t("trust4Title"),
      desc: t("trust4Desc"),
      tone: "bg-primary/10 text-primary",
    },
  ];

  return (
    <SectionWrapper padding="sm">
      <div className="rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3.5">
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-2xl",
                    item.tone
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

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
        eyebrow={t("featuredEyebrow")}
        title={t("featuredTitle")}
        description={t("featuredDesc")}
      >
        <Link href="/products" className={ctaSecondary}>
          {t("featuredCta")}
          <ArrowRight className="size-4" />
        </Link>
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

export async function StorySection() {
  const t = await getTranslations("Home");
  const points = [
    t("heroPoint2"),
    t("trust3Desc"),
    t("trust1Desc"),
  ];

  return (
    <SectionWrapper id="story" padding="lg">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative isolate">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-4xl bg-primary/10 blur-2xl"
          />
          <div className="relative aspect-4/3 overflow-hidden rounded-4xl border border-border/70 shadow-xl">
            <Image
              src="/images/story-village-kitchen.png"
              alt="বনগাঁও গ্রামের রান্নাঘরে হাতে আচার বয়াম ভরা হচ্ছে"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sprout className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t("storyFamilies")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("storyInvolved")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-1.5 text-xs font-semibold text-clay">
            <Leaf className="size-3.5" />
            {t("storyBadge")}
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("storyTitle")}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("storyDesc")}
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Link href="/products" className={cn(ctaPrimary, "mt-8")}>
            {t("storyCta")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export async function ProbashiGuideSection() {
  const t = await getTranslations("Home");
  const steps = [
    {
      step: t("step1Num"),
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      step: t("step2Num"),
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      step: t("step3Num"),
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
  ];

  return (
    <SectionWrapper id="probashi-guide" padding="md">
      <div className="relative isolate overflow-hidden rounded-4xl border border-primary/15 bg-primary/5 p-6 sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 -z-10 size-80 rounded-full bg-gold/20 blur-3xl"
        />

        <SectionHeading
          eyebrow={t("probashiEyebrow")}
          title={t("probashiTitle")}
          description={t("probashiDesc")}
          alignment="center"
        />

        <div className="relative mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center text-center"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-6 left-1/2 hidden w-full border-t border-dashed border-primary/25 md:block"
                />
              )}
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                {item.step}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/checkout" className={ctaPrimary}>
            {t("probashiCta")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export async function ReviewsSection() {
  const locale = await getLocale();
  const [t, { reviews }] = await Promise.all([
    getTranslations("Home"),
    getBazarData(locale),
  ]);

  return (
    <SectionWrapper id="reviews" bg="muted" padding="md">
      <SectionHeading
        variant="plain"
        eyebrow={t("reviewsEyebrow")}
        title={t("reviewsTitle")}
        description={t("reviewsDesc")}
        alignment="center"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <AnimationWrapper key={review.id}>
            <figure className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
              <Quote className="size-6 text-clay/60" />

              <div className="mt-3 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((index) => (
                  <Star key={index} className="size-3.5 fill-gold text-gold" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                “{review.quote}”
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {review.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <BadgeCheck className="size-3.5" />
                  {t("verified")}
                </span>
              </figcaption>

              <p className="mt-3 text-xs font-medium text-clay">
                {t("productPrefix")} {review.productName}
              </p>
            </figure>
          </AnimationWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}

export async function ClosingCta() {
  const t = await getTranslations("Home");

  return (
    <SectionWrapper padding="md">
      <div className="relative isolate overflow-hidden rounded-4xl border border-border/70 bg-secondary/70 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-20 left-1/4 size-64 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" />
          {t("closingBadge")}
        </span>

        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("closingTitle")}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("closingDesc")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/products" className={ctaPrimary}>
            {t("closingPrimary")}
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/checkout" className={ctaSecondary}>
            <HandCoins className="size-4 text-clay" />
            {t("closingSecondary")}
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="size-3.5 text-primary" />
            {t("closingPoint1")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            {t("closingPoint2")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-primary" />
            {t("closingPoint3")}
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
