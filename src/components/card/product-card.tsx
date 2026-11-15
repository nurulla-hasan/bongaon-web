import Link from "next/link";
import { ArrowRight, Star, Truck } from "lucide-react";
import { ProductVisual } from "@/components/card/product-visual";
import type { BazarProduct } from "@/data/mock-bazar";

interface ProductCardProps {
  product: BazarProduct;
  eager?: boolean;
}

export function ProductCard({ product, eager = false }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="relative block"
      >
        <ProductVisual
          tone={product.visualTone}
          unit={product.unit}
          shortTag={product.shortTag}
          image={product.image}
          alt={product.name}
          size="card"
          loading={eager ? "eager" : undefined}
        />
        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-clay px-2.5 py-1 text-xs font-bold text-clay-foreground shadow-sm">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="truncate text-xs font-medium text-muted-foreground">
            {product.category}
          </span>
          {product.badge && (
            <span className="ml-auto shrink-0 rounded-full bg-clay/10 px-2 py-0.5 text-xs font-semibold text-clay">
              {product.badge}
            </span>
          )}
        </div>

        <Link
          href={`/products/${product.slug}`}
          title={product.name}
          className="truncate text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-gold text-gold" />
            {product.rating} ({product.reviewCount})
          </span>
          <span className="inline-flex items-center gap-1">
            <Truck className="size-3.5 text-primary" />
            {product.deliveryDays}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-lg font-bold text-clay">
              ৳{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
