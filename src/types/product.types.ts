export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  imageUrl: string;
  sortOrder?: number;
  isActive?: boolean;
  showOnHome?: boolean;
  _count?: {
    products: number;
  };
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  shortTag: string;
  badge: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  price: number;
  originalPrice: number | null;
  unit: string;
  stock: number;
  imageUrl: string;
  gallery: Array<{ url: string; publicId: string }>;
  deliveryDays: string;
  shelfLife: string;
  origin: string;
  description: string;
  highlights: string[];
  ingredients: string[];
  packOptions: Array<{
    label: string;
    price: number;
    originalPrice?: number;
  }>;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HomeShowcase {
  category: ApiCategory;
  products: ApiProduct[];
}

export interface HomeSectionsResponse {
  categories: ApiCategory[];
  featuredProducts: ApiProduct[];
  showcases: HomeShowcase[];
}
