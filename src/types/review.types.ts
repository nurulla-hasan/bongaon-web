export interface ApiReview {
  id: string;
  productId: string;
  product?: {
    id: string;
    name: string;
    slug: string;
  };
  customerName: string;
  location: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
}

export interface GetReviewsParams {
  productId?: string;
  productSlug?: string;
  page?: number;
  isApproved?: boolean;
  limit?: number;
  sortBy?: string;
}

export interface CreateReviewPayload {
  productId: string;
  customerName: string;
  location?: string;
  phone?: string;
  orderNumber?: string;
  rating: number;
  comment: string;
}
