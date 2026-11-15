import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GrassTuft, LeafSprig } from "@/components/common/leaf-decor";
import { LanguageToggle } from "@/components/common/language-toggle";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CART_ITEMS } from "@/data/mock-bazar";
import {
  CONTAINER_GUTTER,
  CONTAINER_MAX_WIDTH,
  SURFACE_WARM,
} from "@/lib/layout";
import { cn } from "@/lib/utils";
import { AnnouncementBar } from "./announcement-bar";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { NavbarUserMenu } from "./navbar-user-menu";

export async function Navbar() {
  const t = await getTranslations("Navbar");
  const totalItems = MOCK_CART_ITEMS.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <AnnouncementBar message={t("announcement")} />

      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          SURFACE_WARM
        )}
      >
        <LeafSprig className="pointer-events-none absolute top-2 left-2 hidden h-14 w-10 text-primary/15 2xl:block" />
        <GrassTuft className="pointer-events-none absolute top-2 right-2 hidden h-12 w-16 -scale-x-100 text-primary/15 2xl:block" />

      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-4",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <Logo size="md" />

        <DesktopNav />

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <Button
            variant="outline"
            size="lg"
            render={<Link href="/cart" />}
          >
            <ShoppingBag />
            <span className="hidden sm:inline">{t("cart")}</span>
            <Badge variant="secondary">{totalItems}</Badge>
          </Button>

          <NavbarUserMenu isLoggedIn={true} />

          <MobileNav isLoggedIn={true} />
        </div>
        </div>
      </header>
    </>
  );
}
