import { apiClient } from "@/lib/api-client";
import type {
  ApiCategory,
  ApiProduct,
  ApiResponse,
  GetCategoriesParams,
  GetProductsParams,
  HomeSectionsResponse,
} from "@/types";

export function getHomeSections() {
  return apiClient<ApiResponse<HomeSectionsResponse>>("/products/home");
}

export function getProducts(params?: GetProductsParams) {
  return apiClient<ApiResponse<ApiProduct[]>>("/products", { query: params });
}

export function getProductByIdOrSlug(idOrSlug: string) {
  return apiClient<ApiResponse<ApiProduct>>(`/products/${idOrSlug}`);
}

export function getCategories(params?: GetCategoriesParams) {
  return apiClient<ApiResponse<ApiCategory[]>>("/categories", { query: params });
}
