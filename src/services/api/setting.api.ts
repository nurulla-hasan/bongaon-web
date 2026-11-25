import { apiClient } from "@/lib/api-client";
import type { ApiResponse, StoreSetting } from "@/types";

export const settingApi = {
  getSettings: () => apiClient<ApiResponse<StoreSetting>>("/settings"),
};
