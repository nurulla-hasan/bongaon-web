"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createReview, getReviews } from "../api/review.api";
import type { GetReviewsParams } from "@/types";

export function useReviews(params?: GetReviewsParams) {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getReviews(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
