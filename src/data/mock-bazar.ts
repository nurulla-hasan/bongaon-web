export interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  countLabel: string;
  iconName: "flame" | "jar" | "droplet" | "sparkles" | "package" | "gift";
}

export interface ProductPackOption {
  label: string;
  price: number;
  originalPrice?: number;
}

export interface BazarProduct {
  slug: string;
  name: string;
  category: string;
  shortTag: string;
  badge?: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  rating: string;
  reviewCount: number;
  deliveryDays: string;
  shelfLife: string;
  origin: string;
  description: string;
  highlights: string[];
  ingredients: string[];
  packOptions: ProductPackOption[];
  visualTone: "primary" | "secondary" | "accent" | "muted";
}

export interface CartPreviewItem {
  product: BazarProduct;
  selectedPack: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  customerType: "শহরের ক্রেতা" | "প্রবাসী অর্ডার";
  quote: string;
  productName: string;
}

export const BAZAR_CATEGORIES: CategoryItem[] = [
  {
    id: "shutki-bhorta",
    name: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    subtitle: "রেডি-টু-ইট ছুরি, লইট্টা ও চ্যাপা ভর্তা",
    countLabel: "৬টি স্পেশাল প্যাক",
    iconName: "flame",
  },
  {
    id: "achar-chutney",
    name: "ঘরোয়া আচার ও চাটনি",
    subtitle: "রোদে শুকানো আম, জলপাই ও তেঁতুলের আচার",
    countLabel: "৫টি স্পেশাল প্যাক",
    iconName: "jar",
  },
  {
    id: "ghee-oil",
    name: "খাঁটি ঘি ও সরিষার তেল",
    subtitle: "ঘানির প্রথম চাপের তেল ও দানাদার গাওয়া ঘি",
    countLabel: "৪টি স্পেশাল প্যাক",
    iconName: "droplet",
  },
  {
    id: "gur-honey",
    name: "খেজুরের গুড় ও মধু",
    subtitle: "শীতের খাঁটি পাটালি ও সুন্দরবনের মধু",
    countLabel: "৪টি স্পেশাল প্যাক",
    iconName: "sparkles",
  },
  {
    id: "village-spices",
    name: "আস্ত ও গুঁড়া মসলা",
    subtitle: "গ্রামের নিজস্ব ভাঙানো হলুদ, মরিচ ও ধনিয়া",
    countLabel: "৫টি স্পেশাল প্যাক",
    iconName: "package",
  },
  {
    id: "probashi-combo",
    name: "প্রবাসী ফ্যামিলি কম্বো",
    subtitle: "দেশের পরিবারের জন্য সাজানো স্পেশাল গিফট প্যাক",
    countLabel: "৩টি কম্বো প্যাক",
    iconName: "gift",
  },
];

export const BAZAR_PRODUCTS: BazarProduct[] = [
  {
    slug: "churi-shutki-bhorta",
    name: "স্পেশাল ছুরি শুঁটকি ভর্তা (রেডি প্যাক)",
    category: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    shortTag: "সর্বাধিক বিক্রিত",
    badge: "বেস্টসেলার",
    image: "/images/product-churi-shutki.png",
    price: 320,
    originalPrice: 380,
    unit: "২৫০ গ্রাম",
    rating: "4.9",
    reviewCount: 142,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "নরমাল ফ্রিজে ৩০ দিন / ডিপে ৩ মাস",
    origin: "বনগাঁও, কক্সবাজার-স্টাইল ঘরোয়া রেসিপি",
    description:
      "গ্রামের মাটির চুলায় ভেজে হাতে বাটা খাঁটি ছুরি শুঁটকি ভর্তা — ভ্যাকুয়াম-সিলড ফুড-গ্রেড প্যাকেটে। গরম ভাতের সাথে সাথে সাথেই খাওয়ার উপযোগী।",
    highlights: [
      "কোনো প্রিজারভেটিভ বা কৃত্রিম রঙ ছাড়া",
      "ডাবল লেয়ার ভ্যাকুয়াম ও এয়ার-টাইট প্যাকেজিং",
      "সরাসরি গরম ভাত বা খিচুড়ির সাথে পরিবেশনযোগ্য",
    ],
    ingredients: [
      "খাঁটি ছুরি শুঁটকি",
      "দেশি পেঁয়াজ ও রসুন ভাজা",
      "শুকনা লাল মরিচ",
      "খাঁটি সরিষার তেল",
      "লবণ",
    ],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 320, originalPrice: 380 },
      { label: "৫০০ গ্রাম", price: 610, originalPrice: 720 },
      { label: "১ কেজি (ফ্যামিলি প্যাক)", price: 1180, originalPrice: 1400 },
    ],
    visualTone: "accent",
  },
  {
    slug: "chepa-shutki-bhorta",
    name: "ঝাল চ্যাপা শুঁটকি ভর্তা",
    category: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    shortTag: "ঘরোয়া স্বাদ",
    badge: "ইউনিক আইটেম",
    image: "/images/product-chepa-shutki.png",
    price: 340,
    originalPrice: 390,
    unit: "২৫০ গ্রাম",
    rating: "4.8",
    reviewCount: 98,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "ফ্রিজে ৩০ দিন",
    origin: "বনগাঁও, গ্রামের ঐতিহ্যবাহী রান্নাঘর",
    description:
      "রসুন আর দেশি শুকনা মরিচের ঝাঁঝে তৈরি খাঁটি চ্যাপা শুঁটকি ভর্তা। শহরের ব্যস্ত জীবনে গ্রামের আসল স্বাদ পেতে একদম পারফেক্ট।",
    highlights: [
      "আসল মাটির হাড়িতে প্রক্রিয়াজাত চ্যাপা",
      "লিক-প্রুফ সিলড প্যাকেট",
      "ঢাকা ও সারাদেশে ৪–৭ দিনে COD ডেলিভারি",
    ],
    ingredients: ["চ্যাপা শুঁটকি", "দেশি রসুন", "কাঁচা ও শুকনা মরিচ", "সরিষার তেল"],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 340, originalPrice: 390 },
      { label: "৫০০ গ্রাম", price: 650, originalPrice: 750 },
    ],
    visualTone: "primary",
  },
  {
    slug: "kacha-amer-kashundi-achar",
    name: "রোদে শুকানো কাঁচা আমের কাসুন্দি আচার",
    category: "ঘরোয়া আচার ও চাটনি",
    shortTag: "মায়ের হাতের স্বাদ",
    badge: "নতুন ব্যাচ",
    image: "/images/product-mango-achar.png",
    price: 290,
    originalPrice: 340,
    unit: "৪০০ গ্রাম জার",
    rating: "4.9",
    reviewCount: 76,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "স্বাভাবিক তাপমাত্রায় ৬ মাস",
    origin: "বনগাঁও, নিজস্ব বাগানের আম",
    description:
      "গ্রামের টাটকা কাঁচা আম রোদে শুকিয়ে খাঁটি সরিষার তেল ও ঘরোয়া পাঁচফোড়নে তৈরি টক-ঝাল-মিষ্টি আচার।",
    highlights: [
      "ফুড-গ্রেড সিলড জারে প্যাকিং",
      "খিচুড়ি, ভাত ও মুড়িমাখার সাথে দারুণ",
      "দীর্ঘদিন ভালো থাকে",
    ],
    ingredients: ["কাঁচা আম", "সরিষা বাটা", "সরিষার তেল", "পাঁচফোড়ন", "আখের গুড়"],
    packOptions: [
      { label: "৪০০ গ্রাম", price: 290, originalPrice: 340 },
      { label: "৮০০ গ্রাম", price: 550, originalPrice: 650 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "deshi-danadar-gawa-ghee",
    name: "দেশি গরুর দানাদার গাওয়া ঘি",
    category: "খাঁটি ঘি ও সরিষার তেল",
    shortTag: "১০০% খাঁটি",
    badge: "প্রিমিয়াম",
    image: "/images/product-gawa-ghee.png",
    price: 850,
    originalPrice: 950,
    unit: "৫০০ গ্রাম",
    rating: "5.0",
    reviewCount: 115,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "স্বাভাবিক তাপমাত্রায় ৬ মাস",
    origin: "বনগাঁও, গ্রামের খামার থেকে সংগৃহীত",
    description:
      "গ্রামের গৃহস্থ বাড়ির দেশি গরুর দুধের সর থেকে মাটির চুলায় জ্বাল দেওয়া সুগন্ধি দানাদার গাওয়া ঘি।",
    highlights: [
      "কোনো ডালডা বা পাম অয়েল মিশ্রণ নেই",
      "পোলাও, বিরিয়ানি ও বাচ্চাদের খাবারের জন্য সেরা",
      "সুরক্ষিত সিলড প্যাকেজিং",
    ],
    ingredients: ["১০০% দেশি গরুর দুধের মাখন"],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 440 },
      { label: "৫০০ গ্রাম", price: 850, originalPrice: 950 },
      { label: "১ কেজি", price: 1650, originalPrice: 1850 },
    ],
    visualTone: "primary",
  },
  {
    slug: "khejur-patali-gur",
    name: "নলেন খেজুরের পাটালি গুড়",
    category: "খেজুরের গুড় ও মধু",
    shortTag: "সিজনাল স্পেশাল",
    image: "/images/product-khejur-gur.png",
    price: 420,
    originalPrice: 480,
    unit: "১ কেজি",
    rating: "4.8",
    reviewCount: 64,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "২ মাস (ঠান্ডা ও শুষ্ক স্থানে)",
    origin: "বনগাঁও, গাছির সরাসরি সংগ্রহ",
    description:
      "ভোরবেলার টাটকা খেজুরের রস দিয়ে চিনি ছাড়াই তৈরি নরম ও সুগন্ধি পাটালি গুড়। পিঠা-পায়েসের জন্য অতুলনীয়।",
    highlights: [
      "সম্পূর্ণ চিনি ও কেমিক্যালমুক্ত",
      "বাতাসরোধী ফয়েল ও বক্স প্যাকিং",
      "প্রবাসী ভাইদের পরিবারের পছন্দের শীর্ষে",
    ],
    ingredients: ["১০০% খাঁটি খেজুরের রস"],
    packOptions: [
      { label: "১ কেজি", price: 420, originalPrice: 480 },
      { label: "২ কেজি", price: 810, originalPrice: 920 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "probashi-family-shukti-combo",
    name: "প্রবাসী ফ্যামিলি স্পেশাল ভর্তা ও আচার কম্বো",
    category: "প্রবাসী ফ্যামিলি কম্বো",
    shortTag: "পরিবারের জন্য উপহার",
    badge: "কম্বো সেভিংস",
    image: "/images/product-probashi-combo.png",
    price: 1190,
    originalPrice: 1420,
    unit: "৪টি প্যাক সেট",
    rating: "4.9",
    reviewCount: 89,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "প্যাকেট ভেদে ১–৬ মাস",
    origin: "বনগাঁও স্পেশাল কিউরেটেড বক্স",
    description:
      "বিদেশে বসে দেশের মা-বাবা বা পরিবারের জন্য পাঠানোর সেরা কম্বো: ছুরি শুঁটকি ভর্তা (২৫০ গ্রাম), চ্যাপা ভর্তা (২৫০ গ্রাম), আমের আচার (৪০০ গ্রাম) এবং খাঁটি সরিষার তেল (৫০০ মিলি)।",
    highlights: [
      "সুন্দর গিফট-রেডি বক্স প্যাকিং",
      "দেশের যেকোনো ঠিকানায় ক্যাশ অন ডেলিভারি",
      "আলাদা কেনার চেয়ে ২৩০ টাকা সাশ্রয়",
    ],
    ingredients: [
      "ছুরি শুঁটকি ভর্তা ২৫০ গ্রাম",
      "চ্যাপা শুঁটকি ভর্তা ২৫০ গ্রাম",
      "কাঁচা আমের আচার ৪০০ গ্রাম",
      "ঘানি ভাঙা সরিষার তেল ৫০০ মিলি",
    ],
    packOptions: [
      { label: "৪ প্যাক ফ্যামিলি সেট", price: 1190, originalPrice: 1420 },
    ],
    visualTone: "accent",
  },
];

export const MOCK_CART_ITEMS: CartPreviewItem[] = [
  {
    product: BAZAR_PRODUCTS[0],
    selectedPack: "২৫০ গ্রাম",
    quantity: 2,
    unitPrice: 320,
  },
  {
    product: BAZAR_PRODUCTS[2],
    selectedPack: "৪০০ গ্রাম",
    quantity: 1,
    unitPrice: 290,
  },
  {
    product: BAZAR_PRODUCTS[5],
    selectedPack: "৪ প্যাক ফ্যামিলি সেট",
    quantity: 1,
    unitPrice: 1190,
  },
];

export const BAZAR_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "রাশেদুল ইসলাম",
    location: "মিরপুর, ঢাকা",
    customerType: "শহরের ক্রেতা",
    productName: "স্পেশাল ছুরি শুঁটকি ভর্তা",
    quote:
      "ঢাকায় বসে গ্রামের এমন খাঁটি শুঁটকি ভর্তা পাব ভাবিনি। প্যাকিং খুব ভালো ছিল, ৫ দিনের মাথায় হাতে পেয়ে টাকা দিয়েছি।",
  },
  {
    id: "rev-2",
    name: "তানভীর আহমেদ",
    location: "সৌদি আরব (পরিবার: কুমিল্লা)",
    customerType: "প্রবাসী অর্ডার",
    productName: "প্রবাসী ফ্যামিলি স্পেশাল কম্বো",
    quote:
      "প্রবাসে বসে দেশের বাড়িতে মায়ের জন্য অর্ডার করেছিলাম। মা হাতে পেয়ে ক্যাশ অন ডেলিভারিতে টাকা দিয়েছেন—স্বাদ ও প্যাকিং দুটোই দারুণ।",
  },
  {
    id: "rev-3",
    name: "নুসরাত জাহান",
    location: "চট্টগ্রাম",
    customerType: "শহরের ক্রেতা",
    productName: "দেশি গরুর দানাদার গাওয়া ঘি",
    quote:
      "ঘিয়ের ঘ্রাণটা একদম ছোটবেলার গ্রামের বাড়ির মতো। কোনো ঝামেলা ছাড়াই অর্ডার করা যায় এটাই সবচেয়ে ভালো লেগেছে।",
  },
];

export const DELIVERY_CHARGE_BDT = 80;

export async function getBazarData(locale: string) {
  if (locale === "en") {
    const en = await import("./mock-bazar-en");
    return {
      categories: en.BAZAR_CATEGORIES_EN,
      products: en.BAZAR_PRODUCTS_EN,
      cartItems: en.MOCK_CART_ITEMS_EN,
      reviews: en.BAZAR_REVIEWS_EN,
    };
  }

  return {
    categories: BAZAR_CATEGORIES,
    products: BAZAR_PRODUCTS,
    cartItems: MOCK_CART_ITEMS,
    reviews: BAZAR_REVIEWS,
  };
}
