"use client";

import { useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/card/product-card";
import { ProductFilters } from "./product-filters";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductFilters, type SortKey } from "@/hooks/useProductFilters";
import type { ApiCategory, ApiProduct } from "@/types";

const SORT_OPTIONS: { value: SortKey; labelKey: string }[] = [
  { value: "popular", labelKey: "sortPopular" },
  { value: "priceAsc", labelKey: "sortPriceAsc" },
  { value: "priceDesc", labelKey: "sortPriceDesc" },
  { value: "discount", labelKey: "sortDiscount" },
];

interface ProductCatalogProps {
  products: ApiProduct[];
  categories: ApiCategory[];
}

export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const t = useTranslations("Products");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { visibleProducts, activeFilterCount, sort, setSort, resetFilters } =
    useProductFilters(products, categories);

  return (
    <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
      <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block xl:w-72">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
          <ProductFilters products={products} categories={categories} />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              {visibleProducts.length} {t("itemsSuffix")}
            </p>
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
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortKey)}
              >
                <SelectTrigger size="sm">
                  <SelectValue>
                    {(value) =>
                      t(
                        SORT_OPTIONS.find((option) => option.value === value)
                          ?.labelKey ?? "sortPopular",
                      )
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="end">
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

        {visibleProducts.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                eager={index < 4}
              />
            ))}
          </div>
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
              <ProductFilters
                products={products}
                categories={categories}
                hideHeader
              />
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
              {t("showResults")} ({visibleProducts.length})
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
