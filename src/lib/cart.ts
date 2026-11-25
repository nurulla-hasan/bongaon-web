export const CART_STORAGE_KEY = "bongaon_bajar_cart";
export const CART_UPDATED_EVENT = "bongaon-cart-updated";
export const DEFAULT_DELIVERY_CHARGE_BDT = 120;

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  categoryName: string;
  image?: string;
  selectedPack: string;
  quantity: number;
  unitPrice: number;
}

export function readCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        Boolean(item) &&
        typeof item.slug === "string" &&
        typeof item.name === "string" &&
        typeof item.selectedPack === "string" &&
        typeof item.quantity === "number" &&
        typeof item.unitPrice === "number",
    );
  } catch {
    return [];
  }
}

export function writeCartItems(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addToCart(nextItem: CartItem): void {
  const current = readCartItems();
  const existingIndex = current.findIndex(
    (item) =>
      item.slug === nextItem.slug &&
      item.selectedPack === nextItem.selectedPack,
  );

  if (existingIndex >= 0) {
    const updated = [...current];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: Math.min(20, updated[existingIndex].quantity + nextItem.quantity),
    };
    writeCartItems(updated);
    return;
  }

  writeCartItems([...current, nextItem]);
}

export function readCartCount(): number {
  return readCartItems().reduce(
    (sum, item) => sum + Math.max(0, item.quantity),
    0,
  );
}

export function clearCart(): void {
  writeCartItems([]);
}

export function calculateDeliveryCharge(
  subtotal: number,
  defaultCharge = DEFAULT_DELIVERY_CHARGE_BDT,
  freeDeliveryMinOrder = 0,
): number {
  if (subtotal <= 0) return 0;
  if (freeDeliveryMinOrder > 0 && subtotal >= freeDeliveryMinOrder) return 0;
  return defaultCharge;
}
