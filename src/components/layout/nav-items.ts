import {
  Home,
  Info,
  LayoutGrid,
  Package,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

export type NavLinkKey =
  | "home"
  | "categories"
  | "products"
  | "about"
  | "contact"
  | "checkout";

export interface NavLinkItem {
  key: NavLinkKey;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLinkItem[] = [
  { key: "home", href: "/", icon: Home },
  { key: "categories", href: "/#categories", icon: LayoutGrid },
  { key: "products", href: "/products", icon: Package },
  { key: "about", href: "/about", icon: Info },
  { key: "contact", href: "/contact", icon: PhoneCall },
];

export function isNavLinkActive(
  pathname: string | null,
  href: string,
  hash = ""
): boolean {
  if (!pathname) return false;
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  if (href === "/") {
    return (
      pathname === "/" &&
      !NAV_LINKS.some(
        (item) => item.href.startsWith("/#") && hash === item.href.slice(1)
      )
    );
  }
  return pathname.startsWith(href);
}
