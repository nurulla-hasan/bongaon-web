import { Globe, Home, Package, ShoppingBag, type LucideIcon } from "lucide-react";

export type NavLinkKey = "home" | "products" | "probashiGuide" | "checkout";

export interface NavLinkItem {
  key: NavLinkKey;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLinkItem[] = [
  { key: "home", href: "/", icon: Home },
  { key: "products", href: "/products", icon: Package },
  { key: "probashiGuide", href: "/#probashi-guide", icon: Globe },
  { key: "checkout", href: "/checkout", icon: ShoppingBag },
];
