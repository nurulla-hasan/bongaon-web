import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  CheckCircle2,
  Clock,
  HandCoins,
  MapPin,
  Star,
  Truck,
} from "lucide-react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { ProductCard } from "@/components/card/product-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "./_components/product-image-gallery";
import { ProductPurchasePanel } from "./_components/product-purchase-panel";
import { getBazarData } from "@/data/mock-bazar";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const [tCommon, tProducts, { products }] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Products"),
    getBazarData(locale),
  ]);

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const sameCategory = products.filter(
    (item) => item.slug !== product.slug && item.category === product.category,
  );
  const otherProducts = products.filter(
    (item) => item.slug !== product.slug && item.category !== product.category,
  );
  const relatedProducts = [...sameCategory, ...otherProducts].slice(0, 5);

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tCommon("allProducts"), href: "/products" },
          { name: product.name, isCurrent: true },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:sticky lg:top-24 lg:col-span-5">
          <ProductImageGallery product={product} />
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.badge && (
                <Badge variant="outline">{product.badge}</Badge>
              )}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <Star className="size-4 fill-gold text-gold" />
                {product.rating}
                <span className="font-normal text-muted-foreground">
                  ({product.reviewCount} {tProducts("reviewsLabel")})
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                {product.origin}
              </span>
            </div>
          </div>

          <ProductPurchasePanel product={product} />

          <Card>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {tProducts("deliveryTimeTitle")}
                  </p>
                  <p className="text-muted-foreground">
                    {product.deliveryDays} {tProducts("nationwideSuffix")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <HandCoins className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {tProducts("paymentMethodTitle")}
                  </p>
                  <p className="text-muted-foreground">
                    {tProducts("paymentMethodValue")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {tProducts("storageTitle")}
                  </p>
                  <p className="text-muted-foreground">{product.shelfLife}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{tProducts("whySpecial")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {product.highlights.map((item) => (
                  <p
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{tProducts("ingredientsTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary">
                    {ingredient}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="my-12">
        <Separator />
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          {tProducts("relatedTitle")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {relatedProducts.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
