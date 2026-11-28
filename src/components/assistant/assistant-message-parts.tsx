"use client";

import Image from "next/image";
import Link from "next/link";
import type { UIMessage } from "ai";
import { Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";

interface ProductSearchItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  unit: string;
  stock: number;
  imageUrl: string | null;
}

interface TrackOrderOutput {
  found?: boolean;
  error?: string;
  orderNumber?: string;
  status?: OrderStatus;
  total?: number;
  district?: string;
  itemCount?: number;
}

const orderStatusVariantMap: Record<
  OrderStatus,
  "pending" | "processing" | "info" | "accepted" | "rejected"
> = {
  PENDING: "pending",
  PROCESSING: "processing",
  IN_TRANSIT: "info",
  DELIVERED: "accepted",
  CANCELLED: "rejected",
};

interface AssistantMessagePartsProps {
  message: UIMessage;
  onNavigate?: () => void;
}

export function hasRenderableAssistantContent(message: UIMessage): boolean {
  return message.parts.some((part) => {
    if (part.type === "text") {
      return part.text.trim().length > 0;
    }
    return (
      part.type === "tool-searchProducts" ||
      part.type === "tool-trackOrder" ||
      part.type === "tool-getCategories" ||
      part.type === "tool-getStoreInfo"
    );
  });
}

function renderFormattedText(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, idx) => {
    if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) {
      return (
        <strong key={idx} className="font-semibold">
          {segment.slice(2, -2)}
        </strong>
      );
    }
    return segment;
  });
}

export function AssistantMessageParts({
  message,
  onNavigate,
}: AssistantMessagePartsProps) {
  const t = useTranslations("Assistant");

  return (
    <div className="space-y-2">
      {message.parts.map((part, index) => {
        if (part.type === "text") {
          if (!part.text.trim()) return null;
          return (
            <p key={index} className="whitespace-pre-wrap leading-relaxed">
              {renderFormattedText(part.text)}
            </p>
          );
        }

        if (part.type === "tool-searchProducts") {
          if (part.state !== "output-available") {
            return (
              <p key={index} className="text-xs italic text-muted-foreground">
                {t("searchingProducts")}
              </p>
            );
          }

          const output = part.output as { products?: ProductSearchItem[] };
          const products = output?.products ?? [];
          if (products.length === 0) return null;

          return (
            <div key={index} className="space-y-2 pt-1">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${encodeURIComponent(product.slug)}`}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2 text-card-foreground transition-colors hover:border-primary/40"
                >
                  {product.imageUrl ? (
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Package className="size-4" aria-hidden="true" />
                    </span>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-foreground">
                      {product.name}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs">
                      <span className="font-semibold text-primary">
                        ৳{product.price}
                      </span>
                      <span className="text-muted-foreground">
                        / {product.unit}
                      </span>
                    </div>
                  </div>

                  <Badge variant={product.stock > 0 ? "active" : "secondary"}>
                    {product.stock > 0 ? t("inStock") : t("outOfStock")}
                  </Badge>
                </Link>
              ))}
            </div>
          );
        }

        if (part.type === "tool-trackOrder") {
          if (part.state !== "output-available") {
            return (
              <p key={index} className="text-xs italic text-muted-foreground">
                {t("trackingOrder")}
              </p>
            );
          }

          const output = part.output as TrackOrderOutput;
          if (!output?.found || !output.status) {
            return (
              <p key={index} className="text-xs text-destructive">
                {t("orderNotFound")}
              </p>
            );
          }

          return (
            <div
              key={index}
              className="space-y-1.5 rounded-xl border border-border bg-card p-3 text-xs text-card-foreground"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-semibold text-foreground">
                  {output.orderNumber}
                </span>
                <Badge variant={orderStatusVariantMap[output.status]}>
                  {output.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {output.district} • {output.itemCount ?? 0} items • ৳
                {output.total ?? 0}
              </p>
            </div>
          );
        }

        if (
          part.type === "tool-getCategories" &&
          part.state !== "output-available"
        ) {
          return (
            <p key={index} className="text-xs italic text-muted-foreground">
              {t("checkingCategories")}
            </p>
          );
        }

        if (
          part.type === "tool-getStoreInfo" &&
          part.state !== "output-available"
        ) {
          return (
            <p key={index} className="text-xs italic text-muted-foreground">
              {t("checkingStore")}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}
