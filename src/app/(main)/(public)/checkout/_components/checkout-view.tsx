"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  HandCoins,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FormInput } from "@/components/common/form-input";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  CART_UPDATED_EVENT,
  calculateDeliveryCharge,
  clearCart,
  readCartItems,
  type CartItem,
} from "@/lib/cart";
import { getErrorMessage } from "@/lib/error";
import { useCreateOrder, useSettings } from "@/services";

const checkoutSchema = z.object({
  receiverName: z.string().trim().min(2, { error: "Receiver name is required." }),
  receiverPhone: z
    .string()
    .trim()
    .min(6, { error: "Valid receiver phone is required." })
    .max(30),
  district: z.string().trim().min(2, { error: "District is required." }).max(100),
  fullAddress: z
    .string()
    .trim()
    .min(5, { error: "Full address is required." })
    .max(500),
  whatsappNumber: z.string().trim().max(30),
  orderNote: z.string().trim().max(500),
});

export function CheckoutView() {
  const t = useTranslations("Checkout");
  const router = useRouter();
  const { data: settings } = useSettings();
  const createOrder = useCreateOrder();

  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setCartItems(readCartItems());
    sync();
    setMounted(true);
    window.addEventListener("storage", sync);
    window.addEventListener(CART_UPDATED_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_UPDATED_EVENT, sync);
    };
  }, []);

  const isOrderingDisabled = settings?.isOrderingEnabled === false;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const deliveryCharge = calculateDeliveryCharge(
    subtotal,
    settings?.defaultDeliveryCharge,
    settings?.freeDeliveryMinOrder,
  );
  const total = subtotal + deliveryCharge;

  const form = useForm({
    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      district: "",
      fullAddress: "",
      whatsappNumber: "",
      orderNote: "",
    },
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      if (cartItems.length === 0 || isOrderingDisabled) return;

      try {
        const order = await createOrder.mutateAsync({
          receiverName: value.receiverName.trim(),
          receiverPhone: value.receiverPhone.trim(),
          district: value.district.trim(),
          fullAddress: value.fullAddress.trim(),
          whatsappNumber: value.whatsappNumber.trim() || undefined,
          orderNote: value.orderNote.trim() || undefined,
          items: cartItems.map((item) => ({
            productId: item.productId,
            selectedPack: item.selectedPack,
            quantity: item.quantity,
          })),
        });

        clearCart();
        router.push(
          `/order-success?orderNumber=${encodeURIComponent(order.orderNumber)}`,
        );
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
  });

  if (!mounted) {
    return (
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <Skeleton className="h-96 w-full rounded-2xl" />
          <Skeleton className="h-36 w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-8">
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="size-7" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {t("emptyCartTitle")}
              </h2>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                {t("emptyCartDesc")}
              </p>
              <Button
                size="xl"
                className="mt-6"
                render={<Link href="/products" />}
              >
                {t("browseProducts")}
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="mt-8 grid items-start gap-8 lg:grid-cols-12"
    >
      <div className="space-y-6 lg:col-span-7">
        <Card>
          <CardHeader>
            <CardTitle>{t("step2Title")}</CardTitle>
            <CardDescription>{t("step2Desc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="receiverName">
                {(field) => (
                  <FormInput
                    field={field}
                    label={t("receiverName")}
                    placeholder={t("receiverNamePlaceholder")}
                  />
                )}
              </form.Field>
              <form.Field name="receiverPhone">
                {(field) => (
                  <FormInput
                    field={field}
                    type="tel"
                    label={t("receiverPhone")}
                    placeholder={t("receiverPhonePlaceholder")}
                  />
                )}
              </form.Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <form.Field name="district">
                {(field) => (
                  <FormInput
                    field={field}
                    label={t("district")}
                    placeholder={t("districtPlaceholder")}
                  />
                )}
              </form.Field>
              <form.Field name="whatsappNumber">
                {(field) => (
                  <FormInput
                    field={field}
                    type="tel"
                    label={t("whatsapp")}
                    placeholder={t("whatsappPlaceholder")}
                  />
                )}
              </form.Field>
            </div>

            <form.Field name="fullAddress">
              {(field) => {
                const hasError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={hasError}>
                    <FieldLabel htmlFor="full-address">
                      {t("fullAddress")}
                    </FieldLabel>
                    <Textarea
                      id="full-address"
                      rows={3}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={t("fullAddressPlaceholder")}
                      aria-invalid={hasError}
                    />
                    {hasError && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="orderNote">
              {(field) => (
                <FormInput
                  field={field}
                  label={t("orderNote")}
                  placeholder={t("orderNotePlaceholder")}
                />
              )}
            </form.Field>
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
                  key={`${item.slug}-${item.selectedPack}`}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
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
                        {item.name}
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

            {isOrderingDisabled && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                {t("orderingPaused")}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              size="xl"
              type="submit"
              className="w-full"
              disabled={createOrder.isPending || isOrderingDisabled}
            >
              <CheckCircle2 />
              {createOrder.isPending
                ? t("submittingOrder")
                : t("confirmOrder")}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              type="button"
              className="w-full"
              render={<Link href="/cart" />}
            >
              {t("backToCart")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
}
