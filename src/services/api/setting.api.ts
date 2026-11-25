import { apiClient } from "@/lib/api-client";
import type { ApiResponse, StoreSetting } from "@/types";

export function getSettings() {
  return apiClient<ApiResponse<StoreSetting>>("/settings");
}
