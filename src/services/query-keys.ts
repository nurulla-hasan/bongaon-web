export type QueryParams = Record<string, string | number | boolean | undefined>;

export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: (params?: QueryParams) => ["categories", "list", params ?? {}] as const,
    detail: (idOrSlug: string) => ["categories", "detail", idOrSlug] as const,
  },
  products: {
    all: ["products"] as const,
    home: ["products", "home"] as const,
    list: (params?: QueryParams) => ["products", "list", params ?? {}] as const,
    detail: (idOrSlug: string) => ["products", "detail", idOrSlug] as const,
  },
  orders: {
    my: (params?: QueryParams) => ["orders", "my", params ?? {}] as const,
    track: (orderNumber: string, phone: string) =>
      ["orders", "track", orderNumber, phone] as const,
  },
  reviews: {
    list: (params?: QueryParams) => ["reviews", "list", params ?? {}] as const,
  },
  settings: {
    detail: ["settings"] as const,
  },
} as const;
