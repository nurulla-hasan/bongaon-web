import Link from "next/link";
import { ArrowRight, Star, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductVisual } from "@/components/storefront/product-visual";
import type { BazarProduct } from "@/data/mock-bazar";

interface ProductCardProps {
  product: BazarProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("Products");
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="block"
      >
        <ProductVisual
          tone={product.visualTone}
          unit={product.unit}
          shortTag={product.shortTag}
          image={product.image}
          alt={product.name}
          size="card"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 px-2 pt-4 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {product.category}
          </span>
          {product.badge && (
            <span className="ml-auto rounded-full bg-clay/10 px-2.5 py-0.5 text-xs font-semibold text-clay">
              {product.badge}
            </span>
          )}
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="text-base font-semibold leading-snug text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-gold text-gold" />
            {product.rating} ({product.reviewCount})
          </span>
          <span className="inline-flex items-center gap-1">
            <Truck className="size-3.5 text-primary" />
            {product.deliveryDays} • COD
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-clay">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            {t("view")}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
