"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { StarRating } from "@/components/common/star-rating";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useNextFilter } from "@/hooks/useNextFilter";
import { cn } from "@/lib/utils";
import type { ApiCategory } from "@/types";

const MAX_PRICE = 5000;

interface ProductFiltersProps {
  categories: ApiCategory[];
  hideHeader?: boolean;
}

export function ProductFilters({
  categories,
  hideHeader = false,
}: ProductFiltersProps) {
  const t = useTranslations("Products");
  const { getFilter, updateFilter, clearAll, isFilterActive } = useNextFilter();

  const categoryId = getFilter("category") || null;
  const priceRange: [number, number] = getFilter("price")
    ? (getFilter("price").split("-").map(Number) as [number, number])
    : [0, MAX_PRICE];
  const rating = Number(getFilter("rating", "0")) || 0;
  const onlyDiscounted = getFilter("discount") === "1";

  return (
    <FieldGroup className="gap-4">
      {!hideHeader && (
        <>
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
              <SlidersHorizontal className="size-4 text-primary" />
              {t("filtersTitle")}
            </h2>
            {isFilterActive(["category", "price", "discount", "rating"]) && (
              <Button
                type="button"
                variant="ghost"
                size="default"
                onClick={() => clearAll({ exclude: ["sort"] })}
              >
                <RotateCcw />
                {t("clearFilters")}
              </Button>
            )}
          </div>

          <Separator />
        </>
      )}

      <FieldSet>
        <FieldLegend variant="label">{t("categoryTitle")}</FieldLegend>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => updateFilter("category", null)}
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors",
              categoryId === null
                ? "bg-primary/10 font-semibold text-primary"
                : "text-foreground/85 hover:bg-muted/70 hover:text-foreground",
            )}
          >
            <span className="truncate">{t("allItems")}</span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-xs tabular-nums",
                categoryId === null
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {categories.reduce(
                (sum, category) => sum + (category._count?.products ?? 0),
                0,
              )}
            </span>
          </button>

          {categories.map((category) => {
            const active = categoryId === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  updateFilter("category", active ? null : category.id)
                }
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/85 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <span className="truncate">{category.name}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-xs tabular-nums",
                    active
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {category._count?.products ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </FieldSet>

      <Separator />

      <FieldSet>
        <FieldLegend variant="label">{t("priceTitle")}</FieldLegend>
        <Slider
          value={priceRange}
          min={0}
          max={MAX_PRICE}
          step={50}
          onValueChange={(value) => {
            const [min, max] = value as unknown as [number, number];
            updateFilter(
              "price",
              min <= 0 && max >= MAX_PRICE ? null : `${min}-${max}`,
              { debounce: 300 },
            );
          }}
        />
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-foreground">
            ৳{priceRange[0]}
          </span>
          <span className="text-xs text-muted-foreground">–</span>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-foreground">
            ৳{priceRange[1]}
            {priceRange[1] >= MAX_PRICE ? "+" : ""}
          </span>
        </div>
      </FieldSet>

      <Separator />

      <FieldSet>
        <FieldLegend variant="label">{t("ratingTitle")}</FieldLegend>
        <div className="flex items-center justify-between gap-2">
          <StarRating
            rating={rating}
            onRate={(val) =>
              updateFilter("rating", val > 0 ? String(val) : null)
            }
            size={22}
            gap={2}
          />
          <span className="text-xs font-medium text-muted-foreground">
            {rating > 0 ? `${rating}+` : t("anyRating")}
          </span>
        </div>
      </FieldSet>

      <Separator />

      <Field orientation="horizontal">
        <Checkbox
          id="filter-discounted"
          checked={onlyDiscounted}
          onCheckedChange={(checked) =>
            updateFilter("discount", checked ? "1" : null)
          }
        />
        <FieldLabel htmlFor="filter-discounted">
          {t("onlyDiscounted")}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}

export function ProductFiltersSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-5 w-24" />
        </div>

        <Separator />

        <div className="space-y-2.5">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 rounded-xl px-3 py-2"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-7 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-6 w-12 rounded-md" />
            <Skeleton className="h-6 w-14 rounded-md" />
          </div>
        </div>

        <Separator />

        <div className="space-y-2.5">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
