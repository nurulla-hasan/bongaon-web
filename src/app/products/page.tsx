import { Suspense } from "react";
import { ShieldCheck, Truck } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductCatalog } from "@/app/products/_components/product-catalog";
import { getBazarData } from "@/data/mock-bazar";

export default async function ProductsPage() {
  const locale = await getLocale();
  const [tCommon, tProducts, { categories, products }] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Products"),
    getBazarData(locale),
  ]);

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tCommon("allProducts"), isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h1"
        variant="plain"
        alignment="left"
        title={tProducts("catalogTitle")}
        description={tProducts("catalogDescription")}
        titleClassName="text-2xl font-bold sm:text-3xl"
        descriptionClassName="mt-1.5 max-w-xl"
        className="border-b border-border pb-6"
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

      <Suspense fallback={null}>
        <ProductCatalog products={products} categories={categories} />
      </Suspense>
    </PageWrapper>
  );
}
