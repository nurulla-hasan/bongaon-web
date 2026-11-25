"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi, type GetProductsParams } from "@/services/api";
import { queryKeys, type QueryParams } from "@/services/query-keys";

export function useHomeSections() {
  return useQuery({
    queryKey: queryKeys.products.home,
    queryFn: async () => {
      const res = await productApi.getHomeSections();
      return res.data;
    },
  });
}

export function useProducts(params?: GetProductsParams) {
  return useQuery({
    queryKey: queryKeys.products.list(params as QueryParams | undefined),
    queryFn: async () => {
      const res = await productApi.getProducts(params);
      return {
        data: Array.isArray(res.data) ? res.data : [],
        meta: res.meta,
      };
    },
  });
}

export function useCategories(params?: { isActive?: boolean; limit?: number }) {
  return useQuery({
    queryKey: queryKeys.categories.list(params as QueryParams | undefined),
    queryFn: async () => {
      const res = await productApi.getCategories(params);
      return Array.isArray(res.data) ? res.data : [];
    },
  });
}
