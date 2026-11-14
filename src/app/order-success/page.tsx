import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2, HandCoins, Truck } from "lucide-react";
import { PageWrapper } from "@/components/common/page-wrapper";
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
import { DELIVERY_CHARGE_BDT, getBazarData } from "@/data/mock-bazar";

export default async function OrderSuccessPage() {
  const locale = await getLocale();
  const [t, { cartItems }] = await Promise.all([
    getTranslations("OrderSuccess"),
    getBazarData(locale),
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + DELIVERY_CHARGE_BDT;

  return (
    <PageWrapper padding="spacious">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-9" />
            </div>
            <div className="flex justify-center">
              <Badge variant="secondary">{t("orderRef")}</Badge>
            </div>
            <CardTitle>{t("title")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <Truck className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t("deliveryWindowLabel")}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {t("deliveryWindowValue")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <HandCoins className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {t("paymentLabel")}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {t("paymentValuePrefix")} (৳{total})
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <p className="font-semibold text-foreground">
                {t("orderedItems")}
              </p>
              {cartItems.map((item) => (
                <div
                  key={`${item.product.slug}-${item.selectedPack}`}
                  className="flex items-center justify-between text-muted-foreground"
                >
                  <span>
                    {item.product.name} ({item.selectedPack}) × {item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    ৳{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap justify-center gap-3">
            <Button size="lg" render={<Link href="/products" />}>
              {t("moreProducts")}
              <ArrowRight />
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/" />}>
              {t("backHome")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
