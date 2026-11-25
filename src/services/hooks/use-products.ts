"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/services/api";
import { queryKeys } from "@/services/query-keys";

export function useHomeSections() {
  return useQuery({
    queryKey: queryKeys.products.home,
    queryFn: async () => {
      const res = await productApi.getHomeSections();
      return res.data;
    },
  });
}
