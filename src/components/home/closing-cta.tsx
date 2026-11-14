import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

export async function ClosingCta() {
  const t = await getTranslations("Home");

  return (
    <SectionWrapper padding="md">
      <div className="relative isolate overflow-hidden rounded-4xl border border-border/70 bg-secondary/70 px-6 py-12 text-left sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/4 size-64 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("closingTitle")}
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("closingDesc")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
          <Button size="xl" render={<Link href="/products" />}>
            {t("closingPrimary")}
            <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            size="xl"
            render={<Link href="/checkout" />}
          >
            <HandCoins />
            {t("closingSecondary")}
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-xs text-muted-foreground">
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
