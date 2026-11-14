import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ctaPrimary } from "./cta";

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
