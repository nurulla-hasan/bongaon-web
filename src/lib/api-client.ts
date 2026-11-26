import { ofetch } from "ofetch";

function resolveBaseUrl(): string {
  const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (typeof window !== "undefined") {
    return publicBase || "/api/v1";
  }

  const backendOrigin = process.env.API_BACKEND_URL?.trim().replace(/\/+$/, "");
  if (backendOrigin) {
    return `${backendOrigin}/api/v1`;
  }

  if (publicBase && /^https?:\/\//i.test(publicBase)) {
    return publicBase.replace(/\/+$/, "");
  }

  return "http://localhost:5000/api/v1";
}

export const apiClient = ofetch.create({
  baseURL: resolveBaseUrl(),
  credentials: "include",
  retry: 0,
});

export default apiClient;
