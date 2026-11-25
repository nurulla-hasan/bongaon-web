import { apiClient } from "@/lib/api-client";
import type { ApiResponse, CreateContactPayload } from "@/types";

export function createContactMessage(payload: CreateContactPayload) {
  return apiClient<ApiResponse<unknown>>("/contacts", {
    method: "POST",
    body: payload,
  });
}
