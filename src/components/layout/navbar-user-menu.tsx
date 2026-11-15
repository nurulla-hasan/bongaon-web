"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LogIn, LogOut, MapPin, PackageCheck, User } from "lucide-react";
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

interface NavbarUserMenuProps {
  isLoggedIn?: boolean;
}

export function NavbarUserMenu({ isLoggedIn = false }: NavbarUserMenuProps) {
  const t = useTranslations("Navbar");

  if (!isLoggedIn) {
    return (
      <div className="hidden md:flex">
        <Button variant="ghost" size="lg" render={<Link href="/checkout" />}>
          <LogIn />
          <span>{t("login")}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-lg" aria-label="অ্যাকাউন্ট মেনু">
              <Avatar>
                <AvatarFallback>রা</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">
                  রাশেদুল ইসলাম
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  01712-345678
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/order-success" />}>
              <PackageCheck />
              <span>{t("myOrders")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/checkout" />}>
              <MapPin />
              <span>{t("savedAddresses")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/checkout" />}>
              <User />
              <span>{t("profile")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
