import { ShieldCheck, Truck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { DELIVERY_CHARGE_BDT, getBazarData } from "@/data/mock-bazar";
import { CheckoutView } from "./_components/checkout-view";

export default async function CheckoutPage() {
  const locale = await getLocale();
  const [tCommon, tCheckout, tProducts, { cartItems }] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Checkout"),
    getTranslations("Products"),
    getBazarData(locale),
  ]);

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
        as="h3"
        variant="plain"
        alignment="left"
        title={tCheckout("title")}
        description={tCheckout("description")}
        className="border-b pb-6"
      >
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-foreground">
            <Truck className="size-3.5 text-primary" aria-hidden />
            {tProducts("catalogDeliveryTag")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden />
            {tProducts("catalogPaymentTag")}
          </span>
        </div>
      </SectionHeading>

      <CheckoutView
        cartItems={cartItems}
        deliveryCharge={DELIVERY_CHARGE_BDT}
      />
    </PageWrapper>
  );
}
