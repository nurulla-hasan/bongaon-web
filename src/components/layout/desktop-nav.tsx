"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { isNavLinkActive, NAV_LINKS } from "./nav-items";

export function DesktopNav() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  return (
    <nav
      aria-label="প্রধান নেভিগেশন"
      className="hidden items-center gap-1.5 md:flex"
    >
      {NAV_LINKS.map((link) => {
        const isActive = isNavLinkActive(pathname, link.href, hash);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            onClick={() =>
              setHash(link.href.startsWith("/#") ? link.href.slice(1) : "")
            }
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-primary/10 font-semibold text-primary"
                : "font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            )}
          >
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );
}
