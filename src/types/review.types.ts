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
  isApproved?: boolean;
  limit?: number;
  sortBy?: string;
}
