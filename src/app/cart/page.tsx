import { ShieldCheck, Truck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { DELIVERY_CHARGE_BDT, getBazarData } from "@/data/mock-bazar";
import { CartView } from "./_components/cart-view";

export default async function CartPage() {
  const locale = await getLocale();
  const [tCommon, tCart, tProducts, { cartItems }] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Cart"),
    getTranslations("Products"),
    getBazarData(locale),
  ]);

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tCart("breadcrumb"), isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h3"
        variant="plain"
        alignment="left"
        title={tCart("title")}
        description={tCart("description")}
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

      <CartView
        initialItems={cartItems}
        deliveryCharge={DELIVERY_CHARGE_BDT}
      />
    </PageWrapper>
  );
}
