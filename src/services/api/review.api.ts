import { apiClient } from "@/lib/api-client";
import type { ApiResponse, ApiReview, GetReviewsParams } from "@/types";

export function getReviews(params?: GetReviewsParams) {
  return apiClient<ApiResponse<ApiReview[]>>("/reviews", { query: params });
}
