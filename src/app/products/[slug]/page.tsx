import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  HandCoins,
  MapPin,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import BackButton from "@/components/common/back-button";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { ProductVisual } from "@/components/storefront/product-visual";
import { ProductCard } from "@/components/storefront/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BAZAR_PRODUCTS } from "@/data/mock-bazar";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = BAZAR_PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = BAZAR_PRODUCTS.filter(
    (item) => item.slug !== product.slug
  ).slice(0, 3);

  return (
    <PageWrapper>
      <div className="mb-4 flex items-center justify-between gap-4">
        <BackButton label="পেছনে যান" variant="ghost" />
      </div>

      <CustomBreadcrumb
        links={[
          { name: "হোম", href: "/" },
          { name: "সব প্রোডাক্ট", href: "/products" },
          { name: product.name, isCurrent: true },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ProductVisual
            tone={product.visualTone}
            unit={product.unit}
            shortTag={product.shortTag}
            image={product.image}
            alt={product.name}
            size="detail"
          />
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.badge && <Badge variant="outline">{product.badge}</Badge>}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 text-primary" />
                {product.rating} ({product.reviewCount}টি রিভিউ)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                {product.origin}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ৳{product.originalPrice}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              / {product.unit} প্যাক
            </span>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="space-y-2.5">
            <p className="text-sm font-semibold text-foreground">
              প্যাকেট সাইজ বাছাই করুন:
            </p>
            <div className="flex flex-wrap gap-2">
              {product.packOptions.map((option, index) => (
                <Button
                  key={option.label}
                  variant={index === 0 ? "default" : "outline"}
                  size="lg"
                >
                  {option.label} — ৳{option.price}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="xl" render={<Link href="/cart" />}>
              <ShoppingBag />
              কার্টে যোগ করুন
            </Button>
            <Button
              variant="secondary"
              size="xl"
              render={<Link href="/checkout" />}
            >
              সরাসরি COD অর্ডার করুন
            </Button>
          </div>

          <Card>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">ডেলিভারি সময়</p>
                  <p className="text-muted-foreground">
                    {product.deliveryDays} (সারাদেশে)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <HandCoins className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">পেমেন্ট পদ্ধতি</p>
                  <p className="text-muted-foreground">
                    ক্যাশ অন ডেলিভারি (COD)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">সংরক্ষণ</p>
                  <p className="text-muted-foreground">{product.shelfLife}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>কেন স্পেশাল?</CardTitle>
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
                <CardTitle>উপাদানসমূহ</CardTitle>
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
          আরও স্পেশাল প্যাকেটজাত খাবার
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedProducts.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
