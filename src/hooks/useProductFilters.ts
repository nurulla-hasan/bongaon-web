"use client";

import { useMemo } from "react";
import { useNextFilter } from "@/hooks/useNextFilter";
import type { ApiCategory, ApiProduct } from "@/types";

export type ProductFilterKey =
  | "category"
  | "price"
  | "discount"
  | "rating"
  | "sort";

export type SortKey = "popular" | "priceAsc" | "priceDesc" | "discount";

interface FilterCategory {
  id: string;
  name: string;
  count: number;
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 5000;

const SORT_KEYS: SortKey[] = ["popular", "priceAsc", "priceDesc", "discount"];
const FILTER_KEYS: ProductFilterKey[] = [
  "category",
  "price",
  "discount",
  "rating",
];

function discountPercent(product: ApiProduct) {
  if (!product.originalPrice || product.originalPrice <= product.price) {
    return 0;
  }

  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}

function parsePriceRange(value: string): [number, number] {
  const [low, high] = value.split("-").map(Number);

  if (!Number.isFinite(low) || !Number.isFinite(high)) {
    return [PRICE_MIN, PRICE_MAX];
  }

  return [
    Math.min(Math.max(low, PRICE_MIN), PRICE_MAX),
    Math.min(Math.max(high, PRICE_MIN), PRICE_MAX),
  ];
}

function countByCategory(
  products: ApiProduct[],
  categories: ApiCategory[],
): FilterCategory[] {
  const counts = new Map<string, number>();

  products.forEach((product) => {
    const slug = product.category?.slug;
    if (slug) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  });

  return categories
    .map((category) => ({
      id: category.slug,
      name: category.name,
      count: counts.get(category.slug) ?? 0,
    }))
    .filter((category) => category.count > 0);
}

export function useProductFilters(
  products: ApiProduct[],
  categories: ApiCategory[],
) {
  const { getFilter, updateFilter, clearAll, getActiveCount } =
    useNextFilter<ProductFilterKey>();

  const categoryOptions = useMemo(
    () => countByCategory(products, categories),
    [products, categories],
  );

  const activeCategory =
    categoryOptions.find((item) => item.id === getFilter("category")) ?? null;
  const [priceLow, priceHigh] = parsePriceRange(
    getFilter("price", `${PRICE_MIN}-${PRICE_MAX}`),
  );
  const onlyDiscounted = getFilter("discount") === "1";
  const rating = Number(getFilter("rating", "0")) || 0;
  const sortParam = getFilter("sort", "popular") as SortKey;
  const sort: SortKey = SORT_KEYS.includes(sortParam) ? sortParam : "popular";

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (activeCategory && product.category?.slug !== activeCategory.id) {
          return false;
        }
        if (product.price < priceLow) return false;
        if (priceHigh < PRICE_MAX && product.price > priceHigh) return false;
        if (onlyDiscounted && discountPercent(product) === 0) return false;
        if (rating > 0 && product.rating < rating) return false;

        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "priceAsc":
            return a.price - b.price;
          case "priceDesc":
            return b.price - a.price;
          case "discount":
            return discountPercent(b) - discountPercent(a);
          default:
            return b.reviewCount - a.reviewCount;
        }
      });
  }, [products, activeCategory, priceLow, priceHigh, onlyDiscounted, rating, sort]);

  const activeFilterCount = getActiveCount(FILTER_KEYS);

  return {
    options: categoryOptions,
    total: products.length,
    categoryId: activeCategory?.id ?? null,
    priceRange: [priceLow, priceHigh] as [number, number],
    priceMin: PRICE_MIN,
    priceMax: PRICE_MAX,
    onlyDiscounted,
    rating,
    sort,
    isActive: activeFilterCount > 0,
    activeFilterCount,
    visibleProducts,
    setCategory: (value: string | null) => updateFilter("category", value),
    setPriceRange: ([low, high]: [number, number]) => {
      const isFullRange = low <= PRICE_MIN && high >= PRICE_MAX;

      updateFilter("price", isFullRange ? null : `${low}-${high}`, {
        debounce: 300,
      });
    },
    setOnlyDiscounted: (checked: boolean) =>
      updateFilter("discount", checked ? "1" : null),
    setRating: (value: number) =>
      updateFilter("rating", value > 0 ? String(value) : null),
    setSort: (value: SortKey) =>
      updateFilter("sort", value === "popular" ? null : value),
    resetFilters: () => clearAll({ exclude: ["sort"] }),
  };
}
