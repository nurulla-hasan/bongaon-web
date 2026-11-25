export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export interface CreateOrderItemPayload {
  productId: string;
  selectedPack: string;
  quantity: number;
}

export interface CreateOrderPayload {
  receiverName: string;
  receiverPhone: string;
  district: string;
  fullAddress: string;
  whatsappNumber?: string;
  orderNote?: string;
  items: CreateOrderItemPayload[];
}

export interface ApiOrderItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string | null;
  selectedPack: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ApiOrder {
  id: string;
  orderNumber: string;
  receiverName: string;
  receiverPhone: string;
  district: string;
  fullAddress: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  items: ApiOrderItem[];
}

export interface GetMyOrdersParams {
  status?: string;
  page?: number;
  limit?: number;
}
