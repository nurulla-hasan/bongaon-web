import { DELIVERY_CHARGE_BDT, getBazarData, type BazarProduct } from "./mock-bazar";

export type OrderStatus = "processing" | "in_transit" | "delivered";

export interface MockOrderItem {
  product: BazarProduct;
  selectedPack: string;
  quantity: number;
  unitPrice: number;
}

export interface MockOrder {
  id: string;
  date: string;
  status: OrderStatus;
  receiverName: string;
  receiverPhone: string;
  address: string;
  deliveryCharge: number;
  total: number;
  items: MockOrderItem[];
}

export async function getMockOrders(locale: string): Promise<MockOrder[]> {
  const { products } = await getBazarData(locale);
  const isEn = locale === "en";

  const p1 = products[0];
  const p2 = products[1] ?? products[0];
  const p3 = products[2] ?? products[0];
  const p4 = products[4] ?? products[0];

  const order1Items: MockOrderItem[] = [
    {
      product: p1,
      selectedPack: p1.packOptions[0]?.label ?? p1.unit,
      quantity: 2,
      unitPrice: p1.price,
    },
    {
      product: p2,
      selectedPack: p2.packOptions[0]?.label ?? p2.unit,
      quantity: 1,
      unitPrice: p2.price,
    },
  ];

  const order2Items: MockOrderItem[] = [
    {
      product: p3,
      selectedPack: p3.packOptions[0]?.label ?? p3.unit,
      quantity: 1,
      unitPrice: p3.price,
    },
  ];

  const order3Items: MockOrderItem[] = [
    {
      product: p4,
      selectedPack: p4.packOptions[0]?.label ?? p4.unit,
      quantity: 2,
      unitPrice: p4.price,
    },
  ];

  const calcTotal = (items: MockOrderItem[]) =>
    items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) +
    DELIVERY_CHARGE_BDT;

  return [
    {
      id: "BB-2026-1042",
      date: isEn ? "12 Nov 2026" : "১২ নভেম্বর ২০২৬",
      status: "in_transit",
      receiverName: isEn ? "Md. Rashedul Islam" : "মো. রাশেদুল ইসলাম",
      receiverPhone: "01712-345678",
      address: isEn
        ? "House 14, Road 6, Mirpur-10, Dhaka"
        : "বাসা ১৪, রোড ৬, মিরপুর-১০, ঢাকা",
      deliveryCharge: DELIVERY_CHARGE_BDT,
      total: calcTotal(order1Items),
      items: order1Items,
    },
    {
      id: "BB-2026-1038",
      date: isEn ? "05 Nov 2026" : "০৫ নভেম্বর ২০২৬",
      status: "processing",
      receiverName: isEn ? "Rokeya Begum" : "রোকেয়া বেগম",
      receiverPhone: "01819-223344",
      address: isEn
        ? "Station Road, Sadar, Cumilla"
        : "স্টেশন রোড, সদর, কুমিল্লা",
      deliveryCharge: DELIVERY_CHARGE_BDT,
      total: calcTotal(order2Items),
      items: order2Items,
    },
    {
      id: "BB-2026-1019",
      date: isEn ? "24 Oct 2026" : "২৪ অক্টোবর ২০২৬",
      status: "delivered",
      receiverName: isEn ? "Md. Rashedul Islam" : "মো. রাশেদুল ইসলাম",
      receiverPhone: "01712-345678",
      address: isEn
        ? "House 14, Road 6, Mirpur-10, Dhaka"
        : "বাসা ১৪, রোড ৬, মিরপুর-১০, ঢাকা",
      deliveryCharge: DELIVERY_CHARGE_BDT,
      total: calcTotal(order3Items),
      items: order3Items,
    },
  ];
}
