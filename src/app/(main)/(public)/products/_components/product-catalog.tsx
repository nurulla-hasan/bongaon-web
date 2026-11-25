"use client";

import { useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard, ProductCardSkeleton } from "@/components/card/product-card";
import CustomPagination from "@/components/common/custom-pagination";
import { FilterSelect } from "@/components/common/filter-select";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useNextFilter } from "@/hooks/useNextFilter";
import { useCategories, useProducts } from "@/services";
import { ProductFilters, ProductFiltersSkeleton } from "./product-filters";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "all", labelKey: "sortPopular" },
  { value: "price_asc", labelKey: "sortPriceAsc" },
  { value: "price_desc", labelKey: "sortPriceDesc" },
] as const;

export function ProductCatalog() {
  const t = useTranslations("Products");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { getFilter, updateFilter, clearAll, getActiveCount } = useNextFilter();

  const page = Math.max(1, Number(getFilter("page", "1")) || 1);
  const categoryId = getFilter("category") || undefined;
  const priceStr = getFilter("price");
  const [minPrice, maxPrice] = priceStr ? priceStr.split("-").map(Number) : [];
  const onlyDiscounted = getFilter("discount") === "1" ? true : undefined;
  const minRating = Number(getFilter("rating", "0")) || undefined;
  const sort = getFilter("sort", "all");
  const activeFilterCount = getActiveCount([
    "category",
    "price",
    "discount",
    "rating",
  ]);

  const { data: productsRes, isLoading: isProductsLoading } = useProducts({
    isActive: true,
    page,
    limit: PAGE_SIZE,
    categoryId,
    minPrice,
    maxPrice,
    onlyDiscounted,
    minRating,
    sortBy: sort === "all" ? "popular" : sort,
  });
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories({
      isActive: true,
      limit: 100,
    });

  const products = productsRes?.data ?? [];
  const meta = productsRes?.meta;
  const totalCount = meta?.total ?? products.length;

  const resetFilters = () => clearAll({ exclude: ["sort"] });

  return (
    <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block xl:w-72">
        {isCategoriesLoading ? (
          <ProductFiltersSkeleton />
        ) : (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <ProductFilters categories={categories} />
          </div>
        )}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isProductsLoading ? (
              <Skeleton className="h-5 w-28" />
            ) : (
              <p className="text-sm font-medium text-muted-foreground">
                {totalCount} {t("itemsSuffix")}
              </p>
            )}
            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="default"
                onClick={resetFilters}
              >
                <RotateCcw />
                {t("clearFilters")}
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
                {t("sortTitle")}:
              </span>
              <FilterSelect
                filterKey="sort"
                placeholder={t("sortPopular")}
                options={SORT_OPTIONS.map((option) => ({
                  value: option.value,
                  label: t(option.labelKey),
                }))}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="default"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
            >
              <SlidersHorizontal />
              {t("filterButton")}
              {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
          </div>
        </div>

        {isProductsLoading ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  eager={index < 4}
                />
              ))}
            </div>

            <CustomPagination
              currentPage={meta?.page ?? page}
              totalPages={meta?.totalPages ?? 1}
              className="mt-8"
              updatePage={(nextPage) =>
                updateFilter("page", nextPage <= 1 ? null : nextPage, {
                  resetPage: false,
                })
              }
            />
          </>
        ) : (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            {t("noResults")}
          </p>
        )}
      </div>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} showSwipeHandle>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t("filtersTitle")}</DrawerTitle>
            <DrawerDescription>{t("filtersDescription")}</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="min-h-0 flex-1">
            <div className="px-4 py-4">
              <ProductFilters categories={categories} hideHeader />
            </div>
          </ScrollArea>
          <DrawerFooter>
            {activeFilterCount > 0 && (
              <Button type="button" variant="outline" onClick={resetFilters}>
                <RotateCcw />
                {t("clearFilters")}
              </Button>
            )}
            <Button type="button" onClick={() => setMobileOpen(false)}>
              {t("showResults")} ({totalCount})
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
