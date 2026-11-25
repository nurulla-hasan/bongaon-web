"use client";

import { useMutation } from "@tanstack/react-query";
import { contactApi, type CreateContactPayload } from "@/services/api";

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: async (payload: CreateContactPayload) => {
      const res = await contactApi.createMessage(payload);
      return res.data;
    },
  });
}
