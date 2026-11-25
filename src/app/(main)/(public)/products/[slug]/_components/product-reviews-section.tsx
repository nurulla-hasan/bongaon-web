"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { MessageSquarePlus, Star, WifiOff } from "lucide-react";
import { toast } from "sonner";
import CustomPagination from "@/components/common/custom-pagination";
import { EmptyState } from "@/components/common/empty-state";
import { FormInput } from "@/components/common/form-input";
import { StarRating } from "@/components/common/star-rating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/error";
import { formatDate } from "@/lib/utils";
import { useCreateReview, useMe, useReviews } from "@/services";
import { createReviewSchema } from "@/validations";

interface ProductReviewsSectionProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

const REVIEWS_PER_PAGE = 6;

function ReviewFormCard({
  productId,
  defaultName,
  isSignedIn,
}: {
  productId: string;
  defaultName: string;
  isSignedIn: boolean;
}) {
  const t = useTranslations("Products");
  const { mutate: submitReview, isPending } = useCreateReview();

  const form = useForm({
    defaultValues: {
      customerName: defaultName,
      location: "",
      phone: "",
      orderNumber: "",
      rating: 5,
      comment: "",
    },
    validators: {
      onChange: createReviewSchema,
    },
    onSubmit: ({ value }) => {
      if (!isSignedIn && value.phone.trim().length < 6) {
        toast.error(t("guestPhoneRequired"));
        return;
      }

      submitReview(
        {
          productId,
          customerName: value.customerName.trim(),
          location: value.location.trim() || undefined,
          phone: !isSignedIn ? value.phone.trim() : undefined,
          orderNumber:
            !isSignedIn && value.orderNumber.trim()
              ? value.orderNumber.trim()
              : undefined,
          rating: value.rating,
          comment: value.comment.trim(),
        },
        {
          onSuccess: () => {
            toast.success(t("reviewSubmitted"));
            form.reset();
          },
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        },
      );
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="size-4 text-primary" aria-hidden />
          {t("writeReviewTitle")}
        </CardTitle>
        <CardDescription>{t("writeReviewHint")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              form={form}
              name="customerName"
              label={t("reviewNameLabel")}
              placeholder={t("reviewNamePlaceholder")}
            />
            <FormInput
              form={form}
              name="location"
              label={t("reviewLocationLabel")}
              placeholder={t("reviewLocationPlaceholder")}
            />
          </div>

          {!isSignedIn && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormInput
                form={form}
                name="phone"
                type="tel"
                label={t("reviewPhoneLabel")}
                placeholder={t("reviewPhonePlaceholder")}
              />
              <FormInput
                form={form}
                name="orderNumber"
                label={t("reviewOrderNumberLabel")}
                placeholder={t("reviewOrderNumberPlaceholder")}
              />
            </div>
          )}

          <form.Field name="rating">
            {(field) => {
              const hasError =
                (field.state.meta.isTouched ||
                  field.form.state.submissionAttempts > 0) &&
                field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={hasError}>
                  <FieldLabel>{t("reviewRatingLabel")}</FieldLabel>
                  <StarRating
                    rating={field.state.value}
                    onRate={(val) => field.handleChange(val)}
                    size={22}
                    gap={4}
                  />
                  {hasError && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <FormInput
            form={form}
            name="comment"
            type="textarea"
            label={t("reviewCommentLabel")}
            placeholder={t("reviewCommentPlaceholder")}
          />

          <Button
            type="submit"
            size="lg"
            loading={isPending}
            loadingText={t("submittingReview")}
          >
            {t("submitReview")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProductReviewsSection({
  productId,
  rating,
  reviewCount,
}: ProductReviewsSectionProps) {
  const t = useTranslations("Products");
  const [page, setPage] = React.useState(1);

  const { data: meRes } = useMe();
  const me = meRes?.data?.user;

  const {
    data: reviewsRes,
    isLoading,
    isError,
    refetch,
  } = useReviews({
    productId,
    isApproved: true,
    page,
    limit: REVIEWS_PER_PAGE,
    sortBy: "newest",
  });

  const reviews = Array.isArray(reviewsRes?.data) ? reviewsRes.data : [];
  const meta = reviewsRes?.meta;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t("customerReviewsTitle")}
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-foreground">
            <Star className="size-3.5 fill-gold text-gold" aria-hidden />
            {rating.toFixed(1)} ({meta?.total ?? reviewCount})
          </span>
        </div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardContent className="space-y-3 pt-6">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <EmptyState
              icon={<WifiOff className="size-5" aria-hidden />}
              title={t("loadErrorTitle")}
              description={t("loadErrorDescription")}
              action={
                <Button type="button" variant="outline" onClick={() => refetch()}>
                  {t("retry")}
                </Button>
              }
            />
          ) : reviews.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                {t("noReviewsYet")}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="space-y-3 pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {review.customerName.charAt(0)}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {review.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {review.location
                                ? `${review.location} • `
                                : ""}
                              {formatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={
                                index < review.rating
                                  ? "size-3.5 fill-gold text-gold"
                                  : "size-3.5 text-muted-foreground/30"
                              }
                              aria-hidden
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {review.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <CustomPagination
                currentPage={meta?.page ?? page}
                totalPages={meta?.totalPages ?? 1}
                updatePage={setPage}
              />
            </>
          )}
        </div>

        <div className="lg:col-span-5">
          <ReviewFormCard
            key={me?.id ?? "guest"}
            productId={productId}
            defaultName={me?.name ?? ""}
            isSignedIn={Boolean(me)}
          />
        </div>
      </div>
    </section>
  );
}
