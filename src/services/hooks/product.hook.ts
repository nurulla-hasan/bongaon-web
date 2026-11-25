"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getHomeSections,
  getProductByIdOrSlug,
  getProducts,
} from "../api/product.api";
import type { GetCategoriesParams, GetProductsParams } from "@/types";

export function useHomeSections() {
  return useQuery({
    queryKey: ["products", "home"],
    queryFn: getHomeSections,
  });
}

export function useProducts(params?: GetProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
}

export function useProductByIdOrSlug(idOrSlug: string, enabled = true) {
  return useQuery({
    queryKey: ["products", idOrSlug],
    queryFn: () => getProductByIdOrSlug(idOrSlug),
    enabled: Boolean(idOrSlug) && enabled,
  });
}

export function useCategories(params?: GetCategoriesParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
    placeholderData: keepPreviousData,
  });
}
