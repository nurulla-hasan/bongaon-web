"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getReviews } from "../api/review.api";
import type { GetReviewsParams } from "@/types";

export function useReviews(params?: GetReviewsParams) {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviews(params),
    placeholderData: keepPreviousData,
  });
}
