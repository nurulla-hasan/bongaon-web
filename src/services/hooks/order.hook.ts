"use client";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createOrder,
  getMyOrders,
  trackOrder,
} from "../api/order.api";
import type { GetMyOrdersParams } from "@/types";

export function useMyOrders(params?: GetMyOrdersParams, enabled = true) {
  return useQuery({
    queryKey: ["orders", "my", params],
    queryFn: () => getMyOrders(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useTrackOrder() {
  return useMutation({
    mutationFn: ({
      orderNumber,
      phone,
    }: {
      orderNumber: string;
      phone: string;
    }) => trackOrder(orderNumber, phone),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "my"] });
    },
  });
}
