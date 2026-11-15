"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartPreviewItem } from "@/data/mock-bazar";

interface CartViewProps {
  initialItems: CartPreviewItem[];
  deliveryCharge: number;
}

export function CartView({ initialItems, deliveryCharge }: CartViewProps) {
  const t = useTranslations("Cart");
  const [items, setItems] = React.useState<CartPreviewItem[]>(initialItems);

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + (items.length > 0 ? deliveryCharge : 0);

  const updateQuantity = (slug: string, selectedPack: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.slug === slug && item.selectedPack === selectedPack
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (slug: string, selectedPack: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.slug === slug && item.selectedPack === selectedPack)
      )
    );
  };

  if (items.length === 0) {
    return (
      <div className="mt-8">
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="size-7" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {t("emptyTitle")}
              </h2>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                {t("emptyDesc")}
              </p>
              <Button
                size="xl"
                className="mt-6"
                render={<Link href="/products" />}
              >
                {t("addMore")}
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        {items.map((item) => (
          <Card key={`${item.product.slug}-${item.selectedPack}`}>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted sm:w-36">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <Package className="size-6" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Badge variant="secondary">{item.product.category}</Badge>
                    <h2 className="mt-1 text-base font-semibold text-foreground">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {t("packLabel")} {item.selectedPack} • {t("perPack")} ৳
                      {item.unitPrice}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-primary">
                    ৳{item.unitPrice * item.quantity}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={item.quantity <= 1}
                      aria-label={t("decrease")}
                      onClick={() =>
                        updateQuantity(
                          item.product.slug,
                          item.selectedPack,
                          -1
                        )
                      }
                    >
                      <Minus />
                    </Button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={t("increase")}
                      onClick={() =>
                        updateQuantity(item.product.slug, item.selectedPack, 1)
                      }
                    >
                      <Plus />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="default"
                    onClick={() =>
                      removeItem(item.product.slug, item.selectedPack)
                    }
                  >
                    <Trash2 />
                    {t("remove")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="lg:sticky lg:top-24 lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("summaryTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span className="font-medium text-foreground">৳{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("deliveryCharge")}
                </span>
                <span className="font-medium text-foreground">
                  ৳{deliveryCharge}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">
                {t("totalCod")}
              </span>
              <span className="text-xl font-bold text-primary">৳{total}</span>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Truck className="size-4 shrink-0 text-primary" />
                <span>{t("deliveryNote")}</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-primary" />
                <span>{t("codNote")}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              size="xl"
              className="w-full"
              render={<Link href="/checkout" />}
            >
              {t("proceedCheckout")}
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              render={<Link href="/products" />}
            >
              {t("addMore")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
