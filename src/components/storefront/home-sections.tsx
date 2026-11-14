import Image from "next/image";
import Link from "next/link";
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
  BAZAR_CATEGORIES,
  BAZAR_PRODUCTS,
  BAZAR_REVIEWS,
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

export function HeroBanner() {
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
            বনগাঁও গ্রামের ঘরোয়া রান্নাঘর থেকে
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            গ্রামের <span className="text-primary">খাঁটি স্বাদ</span>, এখন আপনার
            শহরের দরজায়
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            হাতে বাটা শুঁটকি ভর্তা, রোদে শুকানো আচার, দানাদার গাওয়া ঘি আর
            খেজুরের গুড় — নিজের রান্নাঘরের জন্য, কিংবা প্রবাস থেকে দেশের
            পরিবারের জন্য।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products" className={ctaPrimary}>
              স্পেশাল প্রোডাক্ট দেখুন
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/checkout" className={ctaSecondary}>
              <Globe className="size-4 text-clay" />
              প্রবাস থেকে অর্ডার করুন
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              লগইন ছাড়াই অর্ডার
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              ভ্যাকুয়াম-সিলড প্যাক
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              হাতে পেয়ে COD
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
              শহর ও প্রবাসের পরিবারগুলোর{" "}
              <span className="font-semibold text-foreground">ভরসার ঠিকানা</span>
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
            ৪–৭ দিনে COD ডেলিভারি
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
              <span className="text-xs text-muted-foreground">সেরা বিক্রিত</span>
              <span className="text-sm font-semibold text-foreground">
                দানাদার গাওয়া ঘি
              </span>
            </span>
            <span className="ml-2 text-sm font-bold text-clay">৳৮৫০</span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function TrustBar() {
  const trustItems = [
    {
      icon: Truck,
      title: "৪–৭ দিনে হোম ডেলিভারি",
      desc: "ঢাকা, চট্টগ্রামসহ বাংলাদেশের যেকোনো জেলায় নিরাপদ ডেলিভারি।",
      tone: "bg-primary/10 text-primary",
    },
    {
      icon: HandCoins,
      title: "১০০% ক্যাশ অন ডেলিভারি",
      desc: "প্যাকেট হাতে পেয়ে যাচাই করে তারপর টাকা পরিশোধের সুবিধা।",
      tone: "bg-clay/10 text-clay",
    },
    {
      icon: ShieldCheck,
      title: "হাইজেনিক প্যাকেটজাত পণ্য",
      desc: "ভ্যাকুয়াম-সিলড ও ফুড-গ্রেড জারে প্যাকিং, তাই স্বাদ থাকে অটুট।",
      tone: "bg-gold/20 text-gold-foreground",
    },
    {
      icon: Globe,
      title: "প্রবাসীদের জন্য সহজ অর্ডার",
      desc: "বিদেশে বসে অর্ডার করুন, দেশে পরিবার হাতে পেয়ে টাকা দেবে।",
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

export function CategoryGrid() {
  return (
    <SectionWrapper id="categories" padding="md">
      <SectionHeading
        variant="plain"
        eyebrow="ক্যাটাগরি"
        title="গ্রামের কোন স্পেশাল স্বাদ খুঁজছেন?"
        description="আমাদের সব পণ্য নিজস্ব তত্ত্বাবধানে প্যাকেটজাত — শহরের রান্নাঘর কিংবা পরিবারের উপহারের জন্য তৈরি।"
      >
        <Link href="/products" className={ctaSecondary}>
          সব প্রোডাক্ট দেখুন
          <ArrowRight className="size-4" />
        </Link>
      </SectionHeading>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BAZAR_CATEGORIES.map((category, index) => {
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

export function FeaturedProductsSection() {
  return (
    <SectionWrapper id="featured-products" bg="muted" padding="md">
      <SectionHeading
        variant="plain"
        eyebrow="স্পেশাল কালেকশন"
        title="ঘরোয়া হাতে বানানো জনপ্রিয় প্যাক"
        description="প্রতিটি পণ্য অর্ডার অনুযায়ী ফ্রেশ প্যাক করে ৪–৭ দিনের মধ্যে পৌঁছে দেওয়া হয়।"
      >
        <Link href="/products" className={ctaSecondary}>
          সব দেখুন
          <ArrowRight className="size-4" />
        </Link>
      </SectionHeading>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BAZAR_PRODUCTS.map((product, index) => (
          <AnimationWrapper key={product.slug} delay={index * 0.04}>
            <ProductCard product={product} />
          </AnimationWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function StorySection() {
  const points = [
    "প্রতিটি ব্যাচ গ্রামের ঘরোয়া রান্নাঘরে হাতে তৈরি",
    "কোনো প্রিজারভেটিভ, কৃত্রিম রঙ বা ফ্লেভার নেই",
    "ভ্যাকুয়াম-সিলড ফুড-গ্রেড প্যাকে সারা দেশে ডেলিভারি",
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
                ২০+ গ্রামের পরিবার
              </p>
              <p className="text-xs text-muted-foreground">আমাদের সাথে জড়িত</p>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-1.5 text-xs font-semibold text-clay">
            <Leaf className="size-3.5" />
            আমাদের গল্প
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            বনগাঁও থেকে সরাসরি আপনার রান্নাঘরে
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            বনগাঁও গ্রামের গৃহস্থ রান্নাঘরে পুরনো রেসিপিতে তৈরি হয় আমাদের ভর্তা,
            আচার আর ঘি। মাটির চুলা, রোদ আর হাতের ছোঁয়ায় তৈরি সেই স্বাদই আমরা সিল
            করে পাঠিয়ে দিই শহর থেকে প্রবাস পর্যন্ত।
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
            গ্রামের প্যাকগুলো দেখুন
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function ProbashiGuideSection() {
  const steps = [
    {
      step: "০১",
      title: "প্রোডাক্ট ও কম্বো বাছাই করুন",
      desc: "শুঁটকি ভর্তা, আচার, ঘি বা প্রবাসী ফ্যামিলি কম্বো পছন্দ করে কার্টে রাখুন।",
    },
    {
      step: "০২",
      title: "দেশের পরিবারের ঠিকানা দিন",
      desc: "চেকআউটে 'পরিবারের জন্য অর্ডার' সিলেক্ট করে দেশে থাকা রিসিভারের নাম ও মোবাইল নম্বর দিন।",
    },
    {
      step: "০৩",
      title: "৪–৭ দিনে হাতে পেয়ে COD পেমেন্ট",
      desc: "আপনার পরিবার ৪–৭ দিনের মধ্যে পার্সেল হাতে পেয়ে ক্যাশ টাকা পরিশোধ করবে।",
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
          eyebrow="প্রবাসী ও শহরের ক্রেতাদের জন্য"
          title="বিদেশে বসেও দেশের পরিবারের জন্য অর্ডার করুন"
          description="কোনো আন্তর্জাতিক কার্ড বা লগইন ছাড়াই, মাত্র ৩টি ধাপে আপনার প্রিয়জনের ঠিকানায় গ্রামের খাঁটি খাবার পৌঁছে দিন।"
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
            পরিবারের জন্য অর্ডার করুন
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function ReviewsSection() {
  return (
    <SectionWrapper id="reviews" bg="muted" padding="md">
      <SectionHeading
        variant="plain"
        eyebrow="ক্রেতাদের অভিজ্ঞতা"
        title="শহর ও প্রবাস থেকে যারা অর্ডার করেছেন"
        description="প্রথমবার অর্ডার করা ক্রেতাদের বাস্তব অভিজ্ঞতা।"
        alignment="center"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {BAZAR_REVIEWS.map((review) => (
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
                  ভেরিফাইড
                </span>
              </figcaption>

              <p className="mt-3 text-xs font-medium text-clay">
                পণ্য: {review.productName}
              </p>
            </figure>
          </AnimationWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function ClosingCta() {
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
          আজকের অর্ডার আজই কনফার্ম
        </span>

        <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          আপনার প্রিয়জনের জন্য গ্রামের খাঁটি স্বাদ পাঠান
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          লগইন ছাড়াই অর্ডার করুন। ৪–৭ দিনের মধ্যে পার্সেল হাতে পেয়ে ক্যাশ টাকা
          পরিশোধ করবেন।
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/products" className={ctaPrimary}>
            অর্ডার শুরু করুন
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/checkout" className={ctaSecondary}>
            <HandCoins className="size-4 text-clay" />
            COD চেকআউট
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="size-3.5 text-primary" />
            সারা দেশে ডেলিভারি
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" />
            ১০০% ক্যাশ অন ডেলিভারি
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-primary" />
            লগইন ছাড়াই
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
