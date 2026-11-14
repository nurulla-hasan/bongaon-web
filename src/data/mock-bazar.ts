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
  image?: string;
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
      "ঢাকা ও সারাদেশে ৪–৭ দিনে ডেলিভারি, হাতে পেয়ে টাকা",
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
  {
    slug: "loitta-shutki-bhorta",
    name: "লইট্টা শুঁটকি ভর্তা (রেডি প্যাক)",
    category: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    shortTag: "ঝাল-টক স্বাদ",
    badge: "নতুন",
    image: "/images/product-loitta-shutki.jpg",
    price: 350,
    originalPrice: 410,
    unit: "২৫০ গ্রাম",
    rating: "4.7",
    reviewCount: 76,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "ফ্রিজে ৩০ দিন",
    origin: "বনগাঁও, কক্সবাজার-স্টাইল রেসিপি",
    description:
      "মাটির চুলায় ভাজা লইট্টা শুঁটকি হাতে বাটা মসলায় মাখা — ভাত বা খিচুড়ির সাথে সাথে খাওয়ার জন্য রেডি প্যাকেট।",
    highlights: [
      "প্রিজারভেটিভ-মুক্ত ঘরোয়া রেসিপি",
      "এয়ার-টাইট ভ্যাকুয়াম প্যাকেট",
      "গরম ভাতের সাথে রেডি টু ইট",
    ],
    ingredients: [
      "লইট্টা শুঁটকি",
      "দেশি পেঁয়াজ",
      "রসুন",
      "শুকনা মরিচ",
      "সরিষার তেল",
    ],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 350, originalPrice: 410 },
      { label: "৫০০ গ্রাম", price: 660, originalPrice: 780 },
    ],
    visualTone: "primary",
  },
  {
    slug: "rupchanda-shutki-bhorta",
    name: "রূপচাঁদা শুঁটকি ভর্তা",
    category: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    shortTag: "প্রিমিয়াম প্যাক",
    badge: "ইউনিক আইটেম",
    image: "/images/product-rupchanda-shutki.jpg",
    price: 390,
    originalPrice: 450,
    unit: "২৫০ গ্রাম",
    rating: "4.8",
    reviewCount: 64,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "ফ্রিজে ৩০ দিন",
    origin: "বনগাঁও, গ্রামের ঐতিহ্যবাহী রান্নাঘর",
    description:
      "রূপচাঁদা শুঁটকি ভেজে মসলার সাথে মাখা — নরম টেক্সচার আর হালকা মিষ্টি ঘ্রাণের স্পেশাল প্যাক।",
    highlights: [
      "হাতে বাছাই করা রূপচাঁদা শুঁটকি",
      "কম ঝাল, বেশি স্বাদ",
      "ভ্যাকুয়াম সিলড প্যাকেট",
    ],
    ingredients: [
      "রূপচাঁদা শুঁটকি",
      "দেশি পেঁয়াজ",
      "আদা",
      "শুকনা মরিচ",
      "সরিষার তেল",
    ],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 390, originalPrice: 450 },
      { label: "৫০০ গ্রাম", price: 740, originalPrice: 860 },
    ],
    visualTone: "accent",
  },
  {
    slug: "deshi-chingri-shutki",
    name: "দেশি চিংড়ি শুঁটকি (শুকনা)",
    category: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    shortTag: "হাই প্রোটিন",
    badge: "প্রিমিয়াম",
    image: "/images/product-chingri-shutki.jpg",
    price: 480,
    originalPrice: 560,
    unit: "২০০ গ্রাম",
    rating: "4.7",
    reviewCount: 42,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "৬ মাস (এয়ারটাইট)",
    origin: "বনগাঁও, সুন্দরবন অঞ্চলের সংগ্রহ",
    description:
      "রোদে শুকানো ছোট দেশি চিংড়ি — ডাল, বড়া বা ভর্তায় ব্যবহারের জন্য পরিষ্কার করে প্যাক করা।",
    highlights: [
      "সম্পূর্ণ রোদে শুকানো, কেমিক্যাল ছাড়া",
      "পরিষ্কার করা রেডি টু কুক",
      "প্রোটিনে ভরপুর",
    ],
    ingredients: [
      "১০০% দেশি চিংড়ি",
    ],
    packOptions: [
      { label: "২০০ গ্রাম", price: 480, originalPrice: 560 },
      { label: "৪০০ গ্রাম", price: 910, originalPrice: 1080 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "mixed-shutki-family-pack",
    name: "মিক্সড শুঁটকি ফ্যামিলি প্যাক (৩ ভর্তা)",
    category: "প্যাকেটজাত ভর্তা ও শুঁটকি",
    shortTag: "সেভিংস কম্বো",
    badge: "ফ্যামিলি প্যাক",
    image: "/images/product-mixed-shutki-pack.jpg",
    price: 990,
    originalPrice: 1180,
    unit: "৩টি প্যাক সেট",
    rating: "4.9",
    reviewCount: 58,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "প্যাক ভেদে ১–৩ মাস",
    origin: "বনগাঁও স্পেশাল কিউরেটেড সেট",
    description:
      "ছুরি, লইট্টা ও চ্যাপা — তিন ধরনের শুঁটকি ভর্তা একসাথে। আলাদা কেনার চেয়ে ১৯০ টাকা সাশ্রয়।",
    highlights: [
      "৩টি জনপ্রিয় ভর্তা এক বক্সে",
      "গিফট-রেডি প্যাকিং",
      "আলাদা কেনার চেয়ে সাশ্রয়",
    ],
    ingredients: [
      "ছুরি শুঁটকি ভর্তা ২৫০ গ্রাম",
      "লইট্টা শুঁটকি ভর্তা ২৫০ গ্রাম",
      "চ্যাপা শুঁটকি ভর্তা ২৫০ গ্রাম",
    ],
    packOptions: [
      { label: "৩ প্যাক সেট", price: 990, originalPrice: 1180 },
    ],
    visualTone: "muted",
  },
  {
    slug: "boroi-achar",
    name: "বরইয়ের টক-ঝাল আচার",
    category: "ঘরোয়া আচার ও চাটনি",
    shortTag: "টক-ঝাল",
    badge: "সিজনাল",
    image: "/images/product-boroi-achar.jpg",
    price: 280,
    originalPrice: 330,
    unit: "৪০০ গ্রাম",
    rating: "4.7",
    reviewCount: 61,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, রোদে শুকানো হাতে তৈরি",
    description:
      "দেশি বরই, মরিচ আর মশলায় রোদে শুকানো টক-ঝাল আচার — ভাত, খিচুড়ি বা পরোটার সাথে দারুণ।",
    highlights: [
      "রোদে শুকানো, প্রিজারভেটিভ ছাড়া",
      "সরিষার তেলে সংরক্ষিত",
      "কাচের জারে সিল করা",
    ],
    ingredients: [
      "দেশি বরই",
      "লাল মরিচ",
      "পাঁচফোড়ন",
      "লবণ",
      "সরিষার তেল",
    ],
    packOptions: [
      { label: "৪০০ গ্রাম", price: 280, originalPrice: 330 },
      { label: "৮০০ গ্রাম", price: 530, originalPrice: 620 },
    ],
    visualTone: "accent",
  },
  {
    slug: "jolpai-mustard-achar",
    name: "জলপাইয়ের আচার (সরিষা তেলে)",
    category: "ঘরোয়া আচার ও চাটনি",
    shortTag: "ক্লাসিক স্বাদ",
    badge: "ঘরোয়া",
    image: "/images/product-jolpai-achar.jpg",
    price: 320,
    originalPrice: 380,
    unit: "৪০০ গ্রাম",
    rating: "4.8",
    reviewCount: 55,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, দাদির রেসিপি",
    description:
      "সরিষার তেলে মাখানো দেশি জলপাইয়ের আচার — টক, ঝাল আর মশলার পুরনো দিনের স্বাদ।",
    highlights: [
      "দেশি জলপাই, কেমিক্যাল-মুক্ত",
      "সরিষার তেলে সংরক্ষিত",
      "টক-ঝাল ব্যালান্স",
    ],
    ingredients: [
      "দেশি জলপাই",
      "সরিষার তেল",
      "মরিচ গুঁড়া",
      "হলুদ",
      "লবণ",
    ],
    packOptions: [
      { label: "৪০০ গ্রাম", price: 320, originalPrice: 380 },
      { label: "৮০০ গ্রাম", price: 600, originalPrice: 710 },
    ],
    visualTone: "primary",
  },
  {
    slug: "tetul-mishti-chutney",
    name: "তেঁতুলের মিষ্টি চাটনি",
    category: "ঘরোয়া আচার ও চাটনি",
    shortTag: "মিষ্টি-টক",
    badge: "নতুন",
    image: "/images/product-tetul-chutney.jpg",
    price: 260,
    originalPrice: 310,
    unit: "৩৫০ গ্রাম",
    rating: "4.6",
    reviewCount: 48,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "৯ মাস",
    origin: "বনগাঁও, ঘরোয়া রেসিপি",
    description:
      "পাকা তেঁতুল, গুড় আর মশলায় তৈরি মিষ্টি-টক চাটনি — বিরিয়ানি, কাবাব বা সিঙ্গারার সাথে দারুণ।",
    highlights: [
      "পাকা তেঁতুল ও খাঁটি গুড়",
      "কোনো কৃত্রিম রঙ নেই",
      "সব বয়সের পছন্দের স্বাদ",
    ],
    ingredients: [
      "পাকা তেঁতুল",
      "খেজুরের গুড়",
      "ভাজা মশলা",
      "লবণ",
    ],
    packOptions: [
      { label: "৩৫০ গ্রাম", price: 260, originalPrice: 310 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "achar-trio-combo",
    name: "৩ ধরনের আচার কম্বো",
    category: "ঘরোয়া আচার ও চাটনি",
    shortTag: "কম্বো সেভিংস",
    badge: "গিফট প্যাক",
    image: "/images/product-achar-trio.jpg",
    price: 860,
    originalPrice: 1050,
    unit: "৩টি প্যাক সেট",
    rating: "4.9",
    reviewCount: 37,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "৯–১২ মাস",
    origin: "বনগাঁও স্পেশাল কিউরেটেড সেট",
    description:
      "কাঁচা আম, জলপাই আর বরই — তিনটি ক্লাসিক আচার একসাথে, ১৯০ টাকা সাশ্রয়ে।",
    highlights: [
      "৩টি ক্লাসিক আচার এক বক্সে",
      "গিফট-রেডি প্যাকিং",
      "আলাদা কেনার চেয়ে সাশ্রয়",
    ],
    ingredients: [
      "কাঁচা আমের আচার ৪০০ গ্রাম",
      "জলপাইয়ের আচার ৪০০ গ্রাম",
      "বরইয়ের আচার ৪০০ গ্রাম",
    ],
    packOptions: [
      { label: "৩ প্যাক সেট", price: 860, originalPrice: 1050 },
    ],
    visualTone: "muted",
  },
  {
    slug: "ghani-mustard-oil",
    name: "ঘানির সরিষার তেল (প্রথম চাপ)",
    category: "খাঁটি ঘি ও সরিষার তেল",
    shortTag: "প্রথম চাপ",
    badge: "সেরা বিক্রি",
    image: "/images/product-mustard-oil.jpg",
    price: 420,
    originalPrice: 490,
    unit: "১ লিটার",
    rating: "4.8",
    reviewCount: 97,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, কাঠের ঘানিতে ভাঙা",
    description:
      "দেশি সরিষা কাঠের ঘানিতে ভেঙে প্রথম চাপের তেল — ঝাঁঝ আর ঘ্রাণে খাঁটি, ভেজালমুক্ত।",
    highlights: [
      "কাঠের ঘানিতে প্রথম চাপ",
      "কোনো পাম বা মিক্সিং নেই",
      "বোতলে সিল করা",
    ],
    ingredients: [
      "১০০% দেশি সরিষা",
    ],
    packOptions: [
      { label: "১ লিটার", price: 420, originalPrice: 490 },
      { label: "২ লিটার", price: 800, originalPrice: 940 },
    ],
    visualTone: "primary",
  },
  {
    slug: "deshi-murgir-ghee",
    name: "দেশি মুরগির চর্বির ঘি",
    category: "খাঁটি ঘি ও সরিষার তেল",
    shortTag: "ঘরোয়া",
    badge: "ইউনিক",
    image: "/images/product-deshi-murgir-ghee.jpg",
    price: 680,
    originalPrice: 780,
    unit: "৫০০ গ্রাম",
    rating: "4.7",
    reviewCount: 44,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "৯ মাস",
    origin: "বনগাঁও, ঘরে জ্বালানো",
    description:
      "দেশি মুরগির চর্বি ধীরে জ্বালিয়ে তৈরি ঘি — গরম ভাত বা খিচুড়িতে এক চামচেই গ্রামের স্বাদ।",
    highlights: [
      "ধীরে জ্বালানো, কেমিক্যাল-মুক্ত",
      "কাচের জারে সিল করা",
      "গ্রামের ঐতিহ্যবাহী স্বাদ",
    ],
    ingredients: [
      "১০০% দেশি মুরগির চর্বি",
    ],
    packOptions: [
      { label: "৫০০ গ্রাম", price: 680, originalPrice: 780 },
      { label: "১ কেজি", price: 1280, originalPrice: 1460 },
    ],
    visualTone: "accent",
  },
  {
    slug: "mohish-danadar-ghee",
    name: "মহিষের দুধের দানাদার ঘি",
    category: "খাঁটি ঘি ও সরিষার তেল",
    shortTag: "দানাদার",
    badge: "প্রিমিয়াম",
    price: 750,
    originalPrice: 860,
    unit: "৫০০ গ্রাম",
    rating: "4.9",
    reviewCount: 71,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, ঐতিহ্যবাহী পদ্ধতিতে জ্বালানো",
    description:
      "মহিষের খাঁটি দুধের মাখন থেকে জ্বালানো দানাদার ঘি — ঘ্রাণে আর দানায় চেনা যায় খাঁটিত্ব।",
    highlights: [
      "খাঁটি মহিষের দুধের মাখন",
      "দানাদার টেক্সচার ও তীব্র ঘ্রাণ",
      "কাচের জারে সিল করা",
    ],
    ingredients: [
      "১০০% মহিষের দুধের মাখন",
    ],
    packOptions: [
      { label: "৫০০ গ্রাম", price: 750, originalPrice: 860 },
      { label: "১ কেজি", price: 1420, originalPrice: 1620 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "sundarban-honey",
    name: "সুন্দরবনের খাঁটি মধু",
    category: "খেজুরের গুড় ও মধু",
    shortTag: "খাঁটি সংগ্রহ",
    badge: "বেস্টসেলার",
    image: "/images/product-sundarban-honey.jpg",
    price: 650,
    originalPrice: 750,
    unit: "৫০০ গ্রাম",
    rating: "4.9",
    reviewCount: 112,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "২ বছর",
    origin: "সুন্দরবন, মৌয়ালদের সংগ্রহ",
    description:
      "সুন্দরবনের খলিশা ফুলের প্রাকৃতিক মধু — মৌয়ালদের সরাসরি সংগ্রহ, কোনো চিনি বা সিরাপ মেশানো নেই।",
    highlights: [
      "মৌয়ালদের সরাসরি সংগ্রহ",
      "কোনো চিনি বা সিরাপ নেই",
      "কাচের জারে সিল করা",
    ],
    ingredients: [
      "১০০% প্রাকৃতিক মধু",
    ],
    packOptions: [
      { label: "৫০০ গ্রাম", price: 650, originalPrice: 750 },
      { label: "১ কেজি", price: 1230, originalPrice: 1420 },
    ],
    visualTone: "accent",
  },
  {
    slug: "khejur-jhola-gur",
    name: "খেজুরের ঝোলা গুড়",
    category: "খেজুরের গুড় ও মধু",
    shortTag: "শীতের স্পেশাল",
    badge: "সিজনাল",
    image: "/images/product-jhola-gur.jpg",
    price: 380,
    originalPrice: 440,
    unit: "১ কেজি",
    rating: "4.8",
    reviewCount: 84,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "৬ মাস",
    origin: "বনগাঁও, খেজুর রস থেকে জ্বালানো",
    description:
      "শীতের খেজুর রস থেকে জ্বালানো নরম ঝোলা গুড় — পিঠা, পায়েস বা চায়ে খাঁটি মিষ্টি স্বাদ।",
    highlights: [
      "খাঁটি খেজুর রসের তৈরি",
      "কোনো চিনি মেশানো নেই",
      "শীতে সীমিত সংগ্রহ",
    ],
    ingredients: [
      "১০০% খেজুরের রস",
    ],
    packOptions: [
      { label: "১ কেজি", price: 380, originalPrice: 440 },
      { label: "২ কেজি", price: 730, originalPrice: 840 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "shorisha-phooler-modhu",
    name: "সরিষা ফুলের মধু",
    category: "খেজুরের গুড় ও মধু",
    shortTag: "ফ্লোরাল",
    badge: "নতুন",
    image: "/images/product-shorisha-honey.jpg",
    price: 520,
    originalPrice: 600,
    unit: "৫০০ গ্রাম",
    rating: "4.7",
    reviewCount: 39,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "২ বছর",
    origin: "বনগাঁও, সরিষা খেতের মৌচাক",
    description:
      "সরিষা খেতের ফুল থেকে সংগ্রহ করা হালকা সোনালি মধু — হালকা ঝাঁঝ আর প্রাকৃতিক মিষ্টি।",
    highlights: [
      "সরিষা খেতের প্রাকৃতিক মধু",
      "হালকা সোনালি রঙ",
      "কোনো প্রসেসিং নেই",
    ],
    ingredients: [
      "১০০% সরিষা ফুলের মধু",
    ],
    packOptions: [
      { label: "৫০০ গ্রাম", price: 520, originalPrice: 600 },
    ],
    visualTone: "primary",
  },
  {
    slug: "village-holud-gura",
    name: "গ্রামের ভাঙানো হলুদ গুঁড়া",
    category: "আস্ত ও গুঁড়া মসলা",
    shortTag: "নিজস্ব ভাঙা",
    badge: "ফ্রেশ",
    image: "/images/product-holud-gura.jpg",
    price: 180,
    originalPrice: 210,
    unit: "২৫০ গ্রাম",
    rating: "4.8",
    reviewCount: 66,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, দেশি চুলায় শুকানো",
    description:
      "দেশি হলুদ রোদে শুকিয়ে ঢেঁকিতে ভাঙা — রঙ, ঘ্রাণ আর ঔষধিগুণে ভরপুর খাঁটি গুঁড়া।",
    highlights: [
      "ঢেঁকিতে ভাঙা, মেশানো নেই",
      "রোদে শুকানো দেশি হলুদ",
      "তীব্র প্রাকৃতিক রঙ",
    ],
    ingredients: [
      "১০০% দেশি হলুদ",
    ],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 180, originalPrice: 210 },
      { label: "৫০০ গ্রাম", price: 340, originalPrice: 400 },
    ],
    visualTone: "accent",
  },
  {
    slug: "deshi-lal-morich-gura",
    name: "দেশি লাল মরিচ গুঁড়া",
    category: "আস্ত ও গুঁড়া মসলা",
    shortTag: "ঝাল গ্যারান্টি",
    badge: "গরম",
    price: 160,
    originalPrice: 190,
    unit: "২৫০ গ্রাম",
    rating: "4.7",
    reviewCount: 59,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, দেশি মরিচের সংগ্রহ",
    description:
      "দেশি শুকনা লাল মরিচ ভাঙা গুঁড়া — ঝাল জোরালো, রঙ উজ্জ্বল, কোনো স্টার্চ বা রঙ মেশানো নেই।",
    highlights: [
      "কোনো কৃত্রিম রঙ নেই",
      "দেশি মরিচ, ঝাল জোরালো",
      "এয়ারটাইট প্যাকেট",
    ],
    ingredients: [
      "১০০% দেশি লাল মরিচ",
    ],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 160, originalPrice: 190 },
      { label: "৫০০ গ্রাম", price: 300, originalPrice: 360 },
    ],
    visualTone: "primary",
  },
  {
    slug: "dhonia-gura",
    name: "ধনিয়া গুঁড়া",
    category: "আস্ত ও গুঁড়া মসলা",
    shortTag: "সুগন্ধি",
    badge: "ফ্রেশ",
    image: "/images/product-dhonia-gura.jpg",
    price: 140,
    originalPrice: 165,
    unit: "২৫০ গ্রাম",
    rating: "4.6",
    reviewCount: 45,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, দেশি ধনিয়ার বীজ",
    description:
      "হালকা ভেজে ভাঙা দেশি ধনিয়ার গুঁড়া — রান্নায় তীব্র সুগন্ধ আর খাঁটি স্বাদ।",
    highlights: [
      "হালকা ভাজা ধনিয়ার বীজ",
      "খাঁটি সুগন্ধ, মেশানো নেই",
      "এয়ারটাইট প্যাকেট",
    ],
    ingredients: [
      "১০০% দেশি ধনিয়া",
    ],
    packOptions: [
      { label: "২৫০ গ্রাম", price: 140, originalPrice: 165 },
    ],
    visualTone: "muted",
  },
  {
    slug: "panch-foron",
    name: "পাঁচফোড়ন (ঘরে মিশ্রিত)",
    category: "আস্ত ও গুঁড়া মসলা",
    shortTag: "স্পেশাল মিশ্রণ",
    badge: "ঘরোয়া",
    image: "/images/product-panch-foron.jpg",
    price: 150,
    originalPrice: 180,
    unit: "২০০ গ্রাম",
    rating: "4.8",
    reviewCount: 53,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, ঘরে মাপা মিশ্রণ",
    description:
      "মেথি, কালোজিরা, মৌরি, জিরা আর সর্ষদ — ঘরে মাপা পাঁচফোড়ন, ভর্তা বা সবজিতে খাঁটি ঘ্রাণ।",
    highlights: [
      "ঘরে মাপা ৫ মসলার মিশ্রণ",
      "আস্ত মসলা, গুঁড়া নয়",
      "এয়ারটাইট প্যাকেট",
    ],
    ingredients: [
      "মেথি",
      "কালোজিরা",
      "মৌরি",
      "জিরা",
      "সরিষা",
    ],
    packOptions: [
      { label: "২০০ গ্রাম", price: 150, originalPrice: 180 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "ghorowa-garam-masala",
    name: "ঘরোয়া গরম মসলা",
    category: "আস্ত ও গুঁড়া মসলা",
    shortTag: "খাঁটি মিশ্রণ",
    badge: "স্পেশাল",
    image: "/images/product-garam-masala.jpg",
    price: 220,
    originalPrice: 260,
    unit: "১৫০ গ্রাম",
    rating: "4.9",
    reviewCount: 62,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও, নিজস্ব রেসিপিতে ভাঙা",
    description:
      "দারুচিনি, এলাচ, লবঙ্গ, গোলমরিচ আর জায়ফল — নিজস্ব অনুপাতে ভাঙা গরম মসলা, ঝোল-মাংসে দুর্দান্ত।",
    highlights: [
      "নিজস্ব অনুপাতে মিশ্রিত",
      "আস্ত মসলা ভেঙে তৈরি",
      "কোনো ফিলার নেই",
    ],
    ingredients: [
      "দারুচিনি",
      "এলাচ",
      "লবঙ্গ",
      "গোলমরিচ",
      "জায়ফল",
    ],
    packOptions: [
      { label: "১৫০ গ্রাম", price: 220, originalPrice: 260 },
    ],
    visualTone: "accent",
  },
  {
    slug: "probashi-breakfast-combo",
    name: "প্রবাসী ব্রেকফাস্ট কম্বো (গুড় + মধু + ঘি)",
    category: "প্রবাসী ফ্যামিলি কম্বো",
    shortTag: "সকালের সেট",
    badge: "নতুন কম্বো",
    image: "/images/product-probashi-breakfast-combo.jpg",
    price: 1490,
    originalPrice: 1750,
    unit: "৩টি প্যাক সেট",
    rating: "4.8",
    reviewCount: 31,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "প্যাক ভেদে ৬–২৪ মাস",
    origin: "বনগাঁও স্পেশাল কিউরেটেড বক্স",
    description:
      "খেজুরের গুড়, সুন্দরবনের মধু আর দানাদার ঘি — প্রবাস থেকে দেশের পরিবারের সকালের নাস্তার জন্য সেরা গিফট।",
    highlights: [
      "গিফট-রেডি বক্স প্যাকিং",
      "সারাদেশে হাতে পেয়ে টাকা",
      "আলাদা কেনার চেয়ে ২৬০ টাকা সাশ্রয়",
    ],
    ingredients: [
      "খেজুরের পাটালি গুড় ১ কেজি",
      "সুন্দরবনের মধু ৫০০ গ্রাম",
      "দানাদার ঘি ৫০০ গ্রাম",
    ],
    packOptions: [
      { label: "৩ প্যাক সেট", price: 1490, originalPrice: 1750 },
    ],
    visualTone: "secondary",
  },
  {
    slug: "probashi-spice-combo",
    name: "প্রবাসী রান্নাঘর মসলা কম্বো (৫ মসলা)",
    category: "প্রবাসী ফ্যামিলি কম্বো",
    shortTag: "রান্নাঘর সেট",
    badge: "ফ্যামিলি প্যাক",
    image: "/images/product-probashi-spice-combo.jpg",
    price: 990,
    originalPrice: 1180,
    unit: "৫টি প্যাক সেট",
    rating: "4.7",
    reviewCount: 26,
    deliveryDays: "৪–৭ দিন",
    shelfLife: "১২ মাস",
    origin: "বনগাঁও স্পেশাল কিউরেটেড সেট",
    description:
      "হলুদ, মরিচ, ধনিয়া, পাঁচফোড়ন আর গরম মসলা — প্রবাসী পরিবারের রান্নাঘরের জন্য পাঁচটি খাঁটি মসলা একসাথে।",
    highlights: [
      "৫টি খাঁটি মসলা এক প্যাকে",
      "এয়ারটাইট প্যাকেট",
      "আলাদা কেনার চেয়ে ১৯০ টাকা সাশ্রয়",
    ],
    ingredients: [
      "হলুদ গুঁড়া ২৫০ গ্রাম",
      "মরিচ গুঁড়া ২৫০ গ্রাম",
      "ধনিয়া গুঁড়া ২৫০ গ্রাম",
      "পাঁচফোড়ন ২০০ গ্রাম",
      "গরম মসলা ১৫০ গ্রাম",
    ],
    packOptions: [
      { label: "৫ প্যাক সেট", price: 990, originalPrice: 1180 },
    ],
    visualTone: "primary",
  }
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
