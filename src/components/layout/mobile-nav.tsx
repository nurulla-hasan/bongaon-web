"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogIn, LogOut, Menu, PackageCheck } from "lucide-react";
import { toast } from "sonner";
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
import { getErrorMessage } from "@/lib/error";
import { cn, getInitials } from "@/lib/utils";
import { useLogout, useMe } from "@/services";
import { isNavLinkActive, NAV_LINKS } from "./nav-items";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: user } = useMe();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      setOpen(false);
      toast.success("Signed out");
      router.push("/auth/login");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to sign out"));
    }
  };

  const displayName = user?.name || "Customer";
  const displaySub = user?.phone || user?.email || "";
  const initials = getInitials(displayName);

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

              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-2.5">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {displayName}
                      </p>
                      {displaySub && (
                        <p className="truncate text-xs text-muted-foreground">
                          {displaySub}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    render={<Link href="/orders" />}
                    onClick={() => setOpen(false)}
                  >
                    <PackageCheck />
                    <span>{t("myOrders")}</span>
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full"
                    loading={logout.isPending}
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>{t("logout")}</span>
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  render={<Link href="/auth/login" />}
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
