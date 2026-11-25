"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  HandCoins,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { CartPreviewItem } from "@/data/mock-bazar";

interface CheckoutViewProps {
  cartItems: CartPreviewItem[];
  deliveryCharge: number;
}

export function CheckoutView({
  cartItems,
  deliveryCharge,
}: CheckoutViewProps) {
  const t = useTranslations("Checkout");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + deliveryCharge;

  return (
    <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-7">
        <Card>
          <CardHeader>
            <CardTitle>{t("step2Title")}</CardTitle>
            <CardDescription>{t("step2Desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="receiver-name">{t("receiverName")}</Label>
                <Input
                  id="receiver-name"
                  placeholder={t("receiverNamePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiver-phone">{t("receiverPhone")}</Label>
                <Input
                  id="receiver-phone"
                  placeholder={t("receiverPhonePlaceholder")}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="district">{t("district")}</Label>
                <Input
                  id="district"
                  placeholder={t("districtPlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="probashi-whatsapp">{t("whatsapp")}</Label>
                <Input
                  id="probashi-whatsapp"
                  placeholder={t("whatsappPlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full-address">{t("fullAddress")}</Label>
              <Textarea
                id="full-address"
                rows={3}
                placeholder={t("fullAddressPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order-note">{t("orderNote")}</Label>
              <Input
                id="order-note"
                placeholder={t("orderNotePlaceholder")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("step3Title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
              <HandCoins className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {t("codTitle")}
                  </p>
                  <Badge variant="secondary">{t("onlyMethod")}</Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t("codDescPrefix")} ৳{total} {t("codDescSuffix")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-24 lg:col-span-5">
        <Card>
          <CardHeader>
            <CardTitle>{t("orderDetailsTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.slug}-${item.selectedPack}`}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <Package className="size-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedPack} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 font-semibold text-foreground">
                    ৳{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("subtotal")}</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("deliveryCharge")}
                </span>
                <span>৳{deliveryCharge}</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">
                {t("totalPayable")}
              </span>
              <span className="text-2xl font-bold text-primary">৳{total}</span>
            </div>

            <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Truck className="size-4 shrink-0 text-primary" />
                <span>{t("estDelivery")}</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 shrink-0 text-primary" />
                <span>{t("bdOnly")}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              size="xl"
              className="w-full"
              render={<Link href="/order-success" />}
            >
              <CheckCircle2 />
              {t("confirmOrder")}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              render={<Link href="/cart" />}
            >
              {t("backToCart")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
