"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/setting.api";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000,
  });
}
