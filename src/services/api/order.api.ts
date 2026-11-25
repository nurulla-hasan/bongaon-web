import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types";

export interface CreateOrderItemPayload {
  productId: string;
  selectedPack: string;
  quantity: number;
}

export interface CreateOrderPayload {
  receiverName: string;
  receiverPhone: string;
  district: string;
  fullAddress: string;
  whatsappNumber?: string;
  orderNote?: string;
  items: CreateOrderItemPayload[];
}

export interface ApiOrderItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string | null;
  selectedPack: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ApiOrder {
  id: string;
  orderNumber: string;
  receiverName: string;
  receiverPhone: string;
  district: string;
  fullAddress: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  status: "PENDING" | "PROCESSING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  items: ApiOrderItem[];
}

export const orderApi = {
  createOrder: (payload: CreateOrderPayload) =>
    apiClient<ApiResponse<ApiOrder>>("/orders", {
      method: "POST",
      body: payload,
    }),

  getMyOrders: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient<ApiResponse<ApiOrder[]>>("/orders/my-orders", {
      query: params,
    }),

  trackOrder: (orderNumber: string, phone: string) =>
    apiClient<ApiResponse<ApiOrder>>(
      `/orders/track/${encodeURIComponent(orderNumber)}`,
      { query: { phone } },
    ),
};
