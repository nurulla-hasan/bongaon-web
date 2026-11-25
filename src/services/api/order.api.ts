import { apiClient } from "@/lib/api-client";
import type {
  ApiOrder,
  ApiResponse,
  CreateOrderPayload,
  GetMyOrdersParams,
} from "@/types";

export function createOrder(payload: CreateOrderPayload) {
  return apiClient<ApiResponse<ApiOrder>>("/orders", {
    method: "POST",
    body: payload,
  });
}

export function getMyOrders(params?: GetMyOrdersParams) {
  return apiClient<ApiResponse<ApiOrder[]>>("/orders/my-orders", {
    query: params,
  });
}

export function trackOrder(orderNumber: string, phone: string) {
  return apiClient<ApiResponse<ApiOrder>>(
    `/orders/track/${encodeURIComponent(orderNumber)}`,
    { query: { phone } },
  );
}
