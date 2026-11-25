import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  ApiReview,
  CreateReviewPayload,
  GetReviewsParams,
} from "@/types";

export function getReviews(params?: GetReviewsParams) {
  return apiClient<ApiResponse<ApiReview[]>>("/reviews", { query: params });
}

export function createReview(payload: CreateReviewPayload) {
  return apiClient<ApiResponse<ApiReview>>("/reviews", {
    method: "POST",
    body: payload,
  });
}
