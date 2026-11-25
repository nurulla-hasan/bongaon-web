"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { BazarProduct } from "@/data/mock-bazar";

interface ProductPurchasePanelProps {
  product: BazarProduct;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const tCommon = useTranslations("Common");
  const tProducts = useTranslations("Products");

  const options =
    product.packOptions.length > 0
      ? product.packOptions
      : [
          {
            label: product.unit,
            price: product.price,
            originalPrice: product.originalPrice,
          },
        ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const selected = options[selectedIndex] ?? options[0];
  const discount =
    selected.originalPrice && selected.originalPrice > selected.price
      ? Math.round(
          ((selected.originalPrice - selected.price) /
            selected.originalPrice) *
            100,
        )
      : 0;

  const totalPrice = selected.price * quantity;
  const totalOriginal = selected.originalPrice
    ? selected.originalPrice * quantity
    : undefined;

  const currency = tCommon("currency");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-bold tabular-nums text-primary">
          {currency}
          {totalPrice}
        </span>
        {totalOriginal && totalOriginal > totalPrice && (
          <span className="text-lg tabular-nums text-muted-foreground line-through">
            {currency}
            {totalOriginal}
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-clay px-2.5 py-0.5 text-xs font-bold text-clay-foreground">
            -{discount}%
          </span>
        )}
        <span className="text-sm text-muted-foreground">
          / {selected.label} {tProducts("packSuffix")}
        </span>
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="space-y-2.5">
        <p className="text-sm font-semibold text-foreground">
          {tProducts("selectPackSize")}
        </p>
        <div className="flex flex-wrap gap-2">
          {options.map((option, index) => (
            <Button
              key={option.label}
              type="button"
              variant={index === selectedIndex ? "default" : "outline"}
              size="lg"
              aria-pressed={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            >
              {option.label} — {currency}
              {option.price}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {tProducts("quantityLabel")}
          </span>
          <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Minus />
            </Button>
            <span className="min-w-8 text-center text-sm font-semibold tabular-nums text-foreground">
              {quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Increase quantity"
              disabled={quantity >= 20}
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <Button size="xl" render={<Link href="/cart" />}>
          <ShoppingBag />
          {tProducts("addToCart")}
        </Button>
        <Button
          variant="secondary"
          size="xl"
          render={<Link href="/checkout" />}
        >
          {tProducts("orderCodNow")}
        </Button>
      </div>
    </div>
  );
}
