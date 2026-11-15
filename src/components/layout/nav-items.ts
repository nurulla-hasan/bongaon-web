import { Home, LayoutGrid, Package, ShoppingBag, type LucideIcon } from "lucide-react";

export type NavLinkKey = "home" | "products" | "categories" | "checkout";

export interface NavLinkItem {
  key: NavLinkKey;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLinkItem[] = [
  { key: "home", href: "/", icon: Home },
  { key: "categories", href: "/#categories", icon: LayoutGrid },
  { key: "products", href: "/products", icon: Package },
  { key: "checkout", href: "/checkout", icon: ShoppingBag },
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
