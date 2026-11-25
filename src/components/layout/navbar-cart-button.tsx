"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const CART_STORAGE_KEY = "bongaon_bajar_cart";

function readCartCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return 0;
    return parsed.reduce((sum, item) => {
      const qty = typeof item?.quantity === "number" ? item.quantity : 0;
      return sum + Math.max(0, qty);
    }, 0);
  } catch {
    return 0;
  }
}

interface NavbarCartButtonProps {
  label: string;
}

export function NavbarCartButton({ label }: NavbarCartButtonProps) {
  const [totalItems, setTotalItems] = React.useState(0);

  React.useEffect(() => {
    const syncCount = () => setTotalItems(readCartCount());
    syncCount();

    window.addEventListener("storage", syncCount);
    window.addEventListener("bongaon-cart-updated", syncCount);
    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener("bongaon-cart-updated", syncCount);
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`${label} (${totalItems})`}
      className="relative"
      render={<Link href="/cart" />}
    >
      <ShoppingBag />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Button>
  );
}
