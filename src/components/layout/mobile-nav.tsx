"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogIn, LogOut, Menu, PackageCheck } from "lucide-react";
import { LanguageToggle } from "@/components/common/language-toggle";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { isNavLinkActive, NAV_LINKS } from "./nav-items";

interface MobileNavProps {
  isLoggedIn?: boolean;
  className?: string;
}

export function MobileNav({
  isLoggedIn = false,
  className,
}: MobileNavProps) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex md:hidden", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon-lg" aria-label={t("menu")}>
              <Menu />
            </Button>
          }
        />
        <SheetContent side="right">
          <div className="flex h-full flex-col gap-5 p-4">
            <SheetHeader>
              <SheetTitle>
                <div onClick={() => setOpen(false)}>
                  <Logo size="sm" />
                </div>
              </SheetTitle>
            </SheetHeader>

            <nav
              aria-label="মোবাইল নেভিগেশন"
              className="flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = isNavLinkActive(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{t(link.key)}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {t("language")} & {t("theme")}
                </span>
                <div className="flex items-center gap-1">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
              </div>

              {isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5">
                    <Avatar>
                      <AvatarFallback>রা</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        রাশেদুল ইসলাম
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        01712-345678
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    render={<Link href="/order-success" />}
                    onClick={() => setOpen(false)}
                  >
                    <PackageCheck />
                    <span>{t("myOrders")}</span>
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    <LogOut />
                    <span>{t("logout")}</span>
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  render={<Link href="/checkout" />}
                  onClick={() => setOpen(false)}
                >
                  <LogIn />
                  <span>{t("loginTrack")}</span>
                </Button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
