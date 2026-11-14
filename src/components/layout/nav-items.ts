import { Globe, Home, Package, ShoppingBag, type LucideIcon } from "lucide-react";

export interface NavLinkItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: "হোম", href: "/", icon: Home },
  { label: "সব প্রোডাক্ট", href: "/products", icon: Package },
  { label: "প্রবাসী গাইড", href: "/#probashi-guide", icon: Globe },
  { label: "চেকআউট", href: "/checkout", icon: ShoppingBag },
];
