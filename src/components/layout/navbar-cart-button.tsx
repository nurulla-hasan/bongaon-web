"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CART_UPDATED_EVENT, readCartCount } from "@/lib/cart";

interface NavbarCartButtonProps {
  label: string;
}

export function NavbarCartButton({ label }: NavbarCartButtonProps) {
  const [totalItems, setTotalItems] = React.useState(0);

  React.useEffect(() => {
    const syncCount = () => setTotalItems(readCartCount());
    syncCount();

    window.addEventListener("storage", syncCount);
    window.addEventListener(CART_UPDATED_EVENT, syncCount);
    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener(CART_UPDATED_EVENT, syncCount);
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
