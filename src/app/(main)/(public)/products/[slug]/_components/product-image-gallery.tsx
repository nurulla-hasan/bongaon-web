"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductVisual } from "@/components/card/product-visual";
import { cn } from "@/lib/utils";
import type { ApiProduct } from "@/types";

interface ProductImageGalleryProps {
  product: ApiProduct;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const mainImage = product.imageUrl || undefined;
  const galleryUrls = (product.gallery ?? [])
    .map((item) => item.url)
    .filter(Boolean);
  const images = Array.from(
    new Set(
      [mainImage, ...galleryUrls].filter((src): src is string => Boolean(src)),
    ),
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? mainImage;

  return (
    <div>
      <ProductVisual
        tone="primary"
        unit={product.unit}
        shortTag={product.shortTag || product.category?.name || ""}
        image={activeImage}
        alt={product.name}
        size="detail"
      />

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={src}
                type="button"
                aria-label={`${product.name} ${index + 1}`}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl border bg-muted transition-all",
                  isActive
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border/70 opacity-75 hover:border-primary/40 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
