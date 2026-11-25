import { apiClient } from "@/lib/api-client";
import type { ApiResponse } from "@/types";

export interface CreateContactPayload {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}

export const contactApi = {
  createMessage: (payload: CreateContactPayload) =>
    apiClient<ApiResponse<unknown>>("/contacts", {
      method: "POST",
      body: payload,
    }),
};
