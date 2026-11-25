"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi, type CreateOrderPayload } from "@/services/api";
import { queryKeys, type QueryParams } from "@/services/query-keys";

export function useMyOrders(
  params?: { status?: string; page?: number; limit?: number },
  enabled = true,
) {
  return useQuery({
    queryKey: queryKeys.orders.my(params as QueryParams | undefined),
    queryFn: async () => {
      const res = await orderApi.getMyOrders(params);
      return {
        data: Array.isArray(res.data) ? res.data : [],
        meta: res.meta,
      };
    },
    enabled,
  });
}

export function useTrackOrder() {
  return useMutation({
    mutationFn: async ({
      orderNumber,
      phone,
    }: {
      orderNumber: string;
      phone: string;
    }) => {
      const res = await orderApi.trackOrder(orderNumber, phone);
      return res.data;
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await orderApi.createOrder(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: ["orders", "my"] });
    },
  });
}
