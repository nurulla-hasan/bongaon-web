import { getLocale, getTranslations } from "next-intl/server";
import { BadgeCheck, Quote, Star } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { getBazarData } from "@/data/mock-bazar";

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
        title={t("reviewsTitle")}
        description={t("reviewsDesc")}
        alignment="center"
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <AnimationWrapper key={review.id}>
            <figure className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <Quote className="size-6 text-clay/60" />
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {review.customerType}
                </span>
              </div>

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
