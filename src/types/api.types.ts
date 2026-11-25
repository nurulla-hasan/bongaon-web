export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: PaginationMeta;
  data: T;
}

export interface ApiError {
  success: false;
  statusCode?: number;
  message: string;
  errorMessages?: Array<{
    path: string | number;
    message: string;
  }>;
  stack?: string;
}

export type UserRole = "ADMIN" | "USER";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface HeroBannerSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
}

export interface StoreSetting {
  id: string;
  storeName: string;
  supportPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  storeAddress: string;
  defaultDeliveryCharge: number;
  freeDeliveryMinOrder: number;
  estimatedDeliveryDays: string;
  announcementEnabled: boolean;
  announcementText: string;
  heroBanners: HeroBannerSlide[];
  isOrderingEnabled: boolean;
  orderAlertEmail: string;
  updatedAt: string;
}
