import { getLocale, getTranslations } from "next-intl/server";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "@/components/storefront/product-card";
import { Badge } from "@/components/ui/badge";
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
        eyebrow={tProducts("catalogEyebrow")}
        title={tProducts("catalogTitle")}
        description={tProducts("catalogDescription")}
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="default">
          {tProducts("allFilter")} ({products.length})
        </Badge>
        {categories.map((category) => (
          <Badge key={category.id} variant="outline">
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </PageWrapper>
  );
}
