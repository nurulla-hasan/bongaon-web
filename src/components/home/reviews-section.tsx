"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, Quote, Star, WifiOff } from "lucide-react";
import AnimationWrapper from "@/components/common/animation-wrapper";
import { EmptyState } from "@/components/common/empty-state";
import { SectionHeading } from "@/components/common/section-heading";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useReviews } from "@/services";

export function ReviewsSection() {
  const t = useTranslations("Home");
  const tProducts = useTranslations("Products");
  const { data: reviews = [], isLoading, isError, refetch } = useReviews({
    isApproved: true,
    limit: 3,
    sortBy: "rating_desc",
  });

  if (!isLoading && !isError && reviews.length === 0) return null;

  return (
    <SectionWrapper id="reviews" bg="muted" padding="md">
      <SectionHeading
        variant="plain"
        title={t("reviewsTitle")}
        description={t("reviewsDesc")}
        alignment="center"
      />

      {isLoading ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="size-6 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="mt-3 h-4 w-24" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="mt-10">
          <EmptyState
            icon={<WifiOff className="size-5" aria-hidden />}
            title={tProducts("loadErrorTitle")}
            description={tProducts("loadErrorDescription")}
            action={
              <Button type="button" variant="outline" onClick={() => refetch()}>
                {tProducts("retry")}
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <AnimationWrapper key={review.id}>
              <figure className="flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <Quote className="size-6 text-clay/60" />
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {t("verified")}
                  </span>
                </div>

                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < review.rating
                          ? "size-3.5 fill-gold text-gold"
                          : "size-3.5 text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{review.comment}”
                </blockquote>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {review.customerName.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {review.customerName}
                    </p>
                    {review.location && (
                      <p className="text-xs text-muted-foreground">
                        {review.location}
                      </p>
                    )}
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <BadgeCheck className="size-3.5" />
                    {t("verified")}
                  </span>
                </figcaption>

                {review.product?.name && (
                  <p className="mt-3 text-xs font-medium text-clay">
                    {t("productPrefix")} {review.product.name}
                  </p>
                )}
              </figure>
            </AnimationWrapper>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
