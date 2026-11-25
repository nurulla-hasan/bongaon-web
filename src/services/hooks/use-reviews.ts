"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "@/services/api";
import { queryKeys, type QueryParams } from "@/services/query-keys";

export function useReviews(params?: {
  isApproved?: boolean;
  limit?: number;
  sortBy?: string;
}) {
  return useQuery({
    queryKey: queryKeys.reviews.list(params as QueryParams | undefined),
    queryFn: async () => {
      const res = await reviewApi.getReviews(params);
      return Array.isArray(res.data) ? res.data : [];
    },
  });
}
