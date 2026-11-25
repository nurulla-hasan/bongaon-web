"use client";

import { useQuery } from "@tanstack/react-query";
import { settingApi } from "@/services/api";
import { queryKeys } from "@/services/query-keys";

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.detail,
    queryFn: async () => {
      const res = await settingApi.getSettings();
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
