"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HandCoins,
  MapPin,
  Package,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { MockOrder, OrderStatus } from "@/data/mock-orders";
import { cn } from "@/lib/utils";

interface OrdersViewProps {
  orders: MockOrder[];
}

type StatusFilter = "all" | OrderStatus;

const statusStepIndex: Record<OrderStatus, number> = {
  processing: 1,
  in_transit: 2,
  delivered: 3,
};

export function OrdersView({ orders }: OrdersViewProps) {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");
  const [filter, setFilter] = React.useState<StatusFilter>("all");
  const [query, setQuery] = React.useState("");
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(
    orders[0]?.id ?? null
  );

  const filterTabs: Array<{ id: StatusFilter; label: string }> = [
    { id: "all", label: t("filterAll") },
    { id: "processing", label: t("filterProcessing") },
    { id: "in_transit", label: t("filterInTransit") },
    { id: "delivered", label: t("filterDelivered") },
  ];

  const statusMeta: Record<
    OrderStatus,
    { label: string; variant: "default" | "secondary" | "outline" }
  > = {
    processing: { label: t("statusProcessing"), variant: "secondary" },
    in_transit: { label: t("statusInTransit"), variant: "outline" },
    delivered: { label: t("statusDelivered"), variant: "default" },
  };

  const trackingSteps = [
    { label: t("stepPlaced"), icon: CheckCircle2 },
    { label: t("stepPacked"), icon: Package },
    { label: t("stepShipped"), icon: Truck },
    { label: t("stepDelivered"), icon: PackageCheck },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "all" || order.status === filter;
    const matchesQuery =
      !normalizedQuery ||
      order.id.toLowerCase().includes(normalizedQuery) ||
      order.receiverName.toLowerCase().includes(normalizedQuery);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              size="default"
              variant={filter === tab.id ? "default" : "outline"}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex w-full items-center gap-2 sm:w-72">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PackageCheck className="size-7" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                {t("emptyTitle")}
              </h2>
              <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                {t("emptyDesc")}
              </p>
              <Button
                size="xl"
                className="mt-6"
                render={<Link href="/products" />}
              >
                {t("browseProducts")}
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const meta = statusMeta[order.status];
            const isExpanded = expandedOrderId === order.id;
            const currentStep = statusStepIndex[order.status];

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-base font-bold text-foreground">
                          #{order.id}
                        </span>
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                        <Badge variant="secondary">
                          <HandCoins className="size-3" />
                          {t("paymentCod")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t("orderDateLabel")} {order.date}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xs text-muted-foreground">
                        {t("totalPayable")}
                      </p>
                      <p className="text-xl font-bold text-primary">
                        {tCommon("currency")}
                        {order.total}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.product.slug}-${item.selectedPack}`}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted">
                            {item.product.image ? (
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center text-muted-foreground">
                                <Package className="size-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="block truncate font-medium text-foreground hover:text-primary"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-muted-foreground">
                              {item.selectedPack} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="shrink-0 font-semibold text-foreground">
                          {tCommon("currency")}
                          {item.unitPrice * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <MapPin className="size-3.5 text-primary" />
                      <strong className="font-medium">
                        {t("receiverLabel")}
                      </strong>{" "}
                      {order.receiverName} ({order.receiverPhone})
                    </span>
                    <span>{order.address}</span>
                  </div>

                  {isExpanded && (
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                      <div className="grid gap-4 sm:grid-cols-4">
                        {trackingSteps.map((step, index) => {
                          const Icon = step.icon;
                          const isCompleted = index <= currentStep;

                          return (
                            <div
                              key={step.label}
                              className="flex items-center gap-3 sm:flex-col sm:text-center"
                            >
                              <span
                                className={cn(
                                  "flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                                  isCompleted
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-card text-muted-foreground"
                                )}
                              >
                                <Icon className="size-4" />
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  isCompleted
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="flex w-full flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="default"
                      onClick={() =>
                        setExpandedOrderId(isExpanded ? null : order.id)
                      }
                    >
                      {isExpanded ? t("hideTracking") : t("trackOrder")}
                      {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="default"
                      render={<Link href="/products" />}
                    >
                      {t("reorder")}
                      <ArrowRight />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
