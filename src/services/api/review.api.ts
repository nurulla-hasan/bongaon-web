import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types";

export interface ApiReview {
  id: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    slug: string;
  };
  customerName: string;
  location: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export const reviewApi = {
  getReviews: (params?: {
    isApproved?: boolean;
    limit?: number;
    sortBy?: string;
  }) => apiClient<ApiResponse<ApiReview[]>>("/reviews", { query: params }),
};
