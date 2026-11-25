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
  status: string;
  createdAt: string;
}

export const orderApi = {
  createOrder: (payload: CreateOrderPayload) =>
    apiClient<ApiResponse<ApiOrder>>("/orders", {
      method: "POST",
      body: payload,
    }),
};
