"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi, type CreateOrderPayload } from "@/services/api";
import { queryKeys } from "@/services/query-keys";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const res = await orderApi.createOrder(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}
