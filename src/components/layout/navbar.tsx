import Link from "next/link";
import { ShoppingBag, Truck } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_CART_ITEMS } from "@/data/mock-bazar";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "./nav-items";
import { NavbarUserMenu } from "./navbar-user-menu";

export function Navbar() {
  const totalItems = MOCK_CART_ITEMS.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="border-b border-border bg-muted/60 text-muted-foreground">
        <div
          className={cn(
            "mx-auto flex items-center justify-center gap-2 py-1.5 text-center text-xs font-medium",
            CONTAINER_MAX_WIDTH,
            CONTAINER_GUTTER
          )}
        >
          <Truck className="size-3.5 shrink-0 text-primary" />
          <span>
            ৪–৭ দিনের মধ্যে সারাদেশে ডেলিভারি • শুধুমাত্র ক্যাশ অন ডেলিভারি (COD)
          </span>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-4",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <Logo size="md" />

        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>

          <Button
            variant="outline"
            size="lg"
            render={<Link href="/cart" />}
          >
            <ShoppingBag />
            <span className="hidden sm:inline">কার্ট</span>
            <Badge variant="secondary">{totalItems}</Badge>
          </Button>

          <NavbarUserMenu isLoggedIn={false} />

          <MobileNav isLoggedIn={false} />
        </div>
      </div>
    </header>
  );
}
