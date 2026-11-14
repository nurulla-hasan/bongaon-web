import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import {
  CheckCircle2,
  Globe,
  HandCoins,
  Home,
  ShieldCheck,
  Truck,
} from "lucide-react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
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
import { DELIVERY_CHARGE_BDT, getBazarData } from "@/data/mock-bazar";

export default async function CheckoutPage() {
  const locale = await getLocale();
  const [tCommon, tCheckout, { cartItems }] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Checkout"),
    getBazarData(locale),
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + DELIVERY_CHARGE_BDT;

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tCheckout("cartBreadcrumb"), href: "/cart" },
          { name: tCheckout("breadcrumb"), isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h1"
        variant="plain"
        alignment="left"
        eyebrow={tCheckout("eyebrow")}
        title={tCheckout("title")}
        description={tCheckout("description")}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>{tCheckout("step1Title")}</CardTitle>
              <CardDescription>{tCheckout("step1Desc")}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border-2 border-primary bg-primary/5 p-4">
                <Home className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {tCheckout("forSelfTitle")}
                    </p>
                    <Badge variant="default">{tCheckout("selected")}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {tCheckout("forSelfDesc")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Globe className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {tCheckout("forFamilyTitle")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tCheckout("forFamilyDesc")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{tCheckout("step2Title")}</CardTitle>
              <CardDescription>{tCheckout("step2Desc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="receiver-name">
                    {tCheckout("receiverName")}
                  </Label>
                  <Input
                    id="receiver-name"
                    placeholder={tCheckout("receiverNamePlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiver-phone">
                    {tCheckout("receiverPhone")}
                  </Label>
                  <Input
                    id="receiver-phone"
                    placeholder={tCheckout("receiverPhonePlaceholder")}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="district">{tCheckout("district")}</Label>
                  <Input
                    id="district"
                    placeholder={tCheckout("districtPlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probashi-whatsapp">
                    {tCheckout("whatsapp")}
                  </Label>
                  <Input
                    id="probashi-whatsapp"
                    placeholder={tCheckout("whatsappPlaceholder")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-address">
                  {tCheckout("fullAddress")}
                </Label>
                <Textarea
                  id="full-address"
                  rows={3}
                  placeholder={tCheckout("fullAddressPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-note">{tCheckout("orderNote")}</Label>
                <Input
                  id="order-note"
                  placeholder={tCheckout("orderNotePlaceholder")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{tCheckout("step3Title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
                <HandCoins className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {tCheckout("codTitle")}
                    </p>
                    <Badge variant="secondary">
                      {tCheckout("onlyMethod")}
                    </Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {tCheckout("codDescPrefix")} ৳{total}{" "}
                    {tCheckout("codDescSuffix")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>{tCheckout("orderDetailsTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.slug}-${item.selectedPack}`}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedPack} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-foreground">
                      ৳{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {tCheckout("subtotal")}
                  </span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {tCheckout("deliveryCharge")}
                  </span>
                  <span>৳{DELIVERY_CHARGE_BDT}</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">
                  {tCheckout("totalPayable")}
                </span>
                <span className="text-2xl font-bold text-primary">
                  ৳{total}
                </span>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Truck className="size-4 shrink-0 text-primary" />
                  <span>{tCheckout("estDelivery")}</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-primary" />
                  <span>{tCheckout("bdOnly")}</span>
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
                {tCheckout("confirmOrder")}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                render={<Link href="/cart" />}
              >
                {tCheckout("backToCart")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
