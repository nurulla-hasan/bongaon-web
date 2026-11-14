import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { ctaPrimary, ctaSecondary } from "./cta";

export async function ClosingCta() {
  const t = await getTranslations("Home");

  return (
    <SectionWrapper padding="md">
      <div className="relative isolate overflow-hidden rounded-4xl border border-border/70 bg-secondary/70 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
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
