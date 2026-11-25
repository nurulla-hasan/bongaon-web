"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogIn, LogOut, MapPin, PackageCheck, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/error";
import { getInitials } from "@/lib/utils";
import { useLogout, useMe } from "@/services";

interface NavbarUserMenuProps {
  isLoggedIn?: boolean;
}

export function NavbarUserMenu({ isLoggedIn }: NavbarUserMenuProps) {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  const logout = useLogout();

  if (isLoading) {
    return (
      <div className="hidden md:flex">
        <Skeleton className="size-9 rounded-full" />
      </div>
    );
  }

  const signedIn = Boolean(user) || Boolean(isLoggedIn && user !== undefined);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success("Signed out");
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to sign out"));
    }
  };

  if (!signedIn) {
    return (
      <div className="hidden md:flex">
        <Button variant="ghost" size="lg" render={<Link href="/login" />}>
          <LogIn />
          <span>{t("login")}</span>
        </Button>
      </div>
    );
  }

  const displayName = user?.name || "Customer";
  const displaySub = user?.phone || user?.email || "";
  const initials = getInitials(displayName);

  return (
    <div className="hidden md:flex">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-lg" aria-label="অ্যাকাউন্ট মেনু">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="truncate text-sm font-semibold text-foreground">
                  {displayName}
                </span>
                {displaySub && (
                  <span className="truncate text-xs font-normal text-muted-foreground">
                    {displaySub}
                  </span>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/orders" />}>
              <PackageCheck />
              <span>{t("myOrders")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/checkout" />}>
              <MapPin />
              <span>{t("savedAddresses")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/profile" />}>
              <User />
              <span>{t("profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
