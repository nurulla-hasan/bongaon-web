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
  const highlights = [
    { icon: Truck, label: t("closingPoint1") },
    { icon: ShieldCheck, label: t("closingPoint2") },
    { icon: CheckCircle2, label: t("closingPoint3") },
  ];

  return (
    <SectionWrapper padding="md">
      <div className="relative isolate overflow-hidden rounded-4xl border border-border/70 bg-secondary/70 px-6 py-12 text-left sm:px-12 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/4 size-64 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 size-72 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-clay" aria-hidden />
              {t("closingBadge")}
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
          </div>

          <div className="lg:col-span-5">
            <ul className="space-y-3 rounded-3xl border border-border/70 bg-card/85 p-6 shadow-sm backdrop-blur">
              {highlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3.5 rounded-2xl border border-border/50 bg-background/80 px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
