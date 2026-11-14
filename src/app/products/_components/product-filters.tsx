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
import { Slider } from "@/components/ui/slider";
import type { BazarProduct, CategoryItem } from "@/data/mock-bazar";
import { useProductFilters } from "@/hooks/useProductFilters";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  products: BazarProduct[];
  categories: CategoryItem[];
  hideHeader?: boolean;
}

export function ProductFilters({
  products,
  categories,
  hideHeader = false,
}: ProductFiltersProps) {
  const t = useTranslations("Products");
  const {
    options,
    total,
    categoryId,
    priceRange,
    priceMin,
    priceMax,
    onlyDiscounted,
    rating,
    isActive,
    setCategory,
    setPriceRange,
    setOnlyDiscounted,
    setRating,
    resetFilters,
  } = useProductFilters(products, categories);

  return (
    <FieldGroup className="gap-4">
      {!hideHeader && (
        <>
          <div className="flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
              <SlidersHorizontal className="size-4 text-primary" />
              {t("filtersTitle")}
            </h2>
            {isActive && (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={resetFilters}
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
            onClick={() => setCategory(null)}
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
              {total}
            </span>
          </button>

          {options.map((item) => {
            const active = categoryId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(active ? null : item.id)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-foreground/85 hover:bg-muted/70 hover:text-foreground",
                )}
              >
                <span className="truncate">{item.name}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-xs tabular-nums",
                    active
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {item.count}
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
          min={priceMin}
          max={priceMax}
          step={50}
          onValueChange={(value) =>
            setPriceRange(value as unknown as [number, number])
          }
        />
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-foreground">
            ৳{priceRange[0]}
          </span>
          <span className="text-xs text-muted-foreground">–</span>
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium tabular-nums text-foreground">
            ৳{priceRange[1]}
            {priceRange[1] >= priceMax ? "+" : ""}
          </span>
        </div>
      </FieldSet>

      <Separator />

      <FieldSet>
        <FieldLegend variant="label">{t("ratingTitle")}</FieldLegend>
        <div className="flex items-center justify-between gap-2">
          <StarRating rating={rating} onRate={setRating} size={22} gap={2} />
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
          onCheckedChange={setOnlyDiscounted}
        />
        <FieldLabel htmlFor="filter-discounted">
          {t("onlyDiscounted")}
        </FieldLabel>
      </Field>
    </FieldGroup>
  );
}
