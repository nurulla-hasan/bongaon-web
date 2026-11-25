import { apiClient } from "@/lib/api-client";
import type {
  ApiCategory,
  ApiProduct,
  ApiResponse,
  HomeSectionsResponse,
} from "@/types";

export interface GetProductsParams {
  searchTerm?: string;
  categorySlug?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export const productApi = {
  getHomeSections: () =>
    apiClient<ApiResponse<HomeSectionsResponse>>("/products/home"),

  getProducts: (params?: GetProductsParams) =>
    apiClient<ApiResponse<ApiProduct[]>>("/products", { query: params }),

  getProductByIdOrSlug: (idOrSlug: string) =>
    apiClient<ApiResponse<ApiProduct>>(`/products/${idOrSlug}`),

  getCategories: (params?: { isActive?: boolean; limit?: number }) =>
    apiClient<ApiResponse<ApiCategory[]>>("/categories", { query: params }),
};
