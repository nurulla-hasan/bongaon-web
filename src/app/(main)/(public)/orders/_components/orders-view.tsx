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
  WifiOff,
} from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/error";
import { cn, formatDate } from "@/lib/utils";
import { useMe, useMyOrders, useTrackOrder } from "@/services";
import type { ApiOrder, OrderStatus } from "@/types";

type StatusFilter = "all" | "PROCESSING" | "IN_TRANSIT" | "DELIVERED";

const statusStepIndex: Record<OrderStatus, number> = {
  PENDING: 0,
  PROCESSING: 1,
  IN_TRANSIT: 2,
  DELIVERED: 3,
  CANCELLED: -1,
};

export function OrdersView() {
  const t = useTranslations("Orders");
  const tCommon = useTranslations("Common");

  const { data: meRes, isLoading: isMeLoading } = useMe();
  const me = meRes?.data?.user;
  const [filter, setFilter] = React.useState<StatusFilter>("all");
  const [query, setQuery] = React.useState("");
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(
    null,
  );

  const [trackOrderNumber, setTrackOrderNumber] = React.useState("");
  const [trackPhone, setTrackPhone] = React.useState("");
  const [trackedOrder, setTrackedOrder] = React.useState<ApiOrder | null>(null);

  const {
    data: myOrdersRes,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    refetch: refetchOrders,
  } = useMyOrders(
    {
      status: filter === "all" ? undefined : filter,
      limit: 20,
    },
    Boolean(me),
  );
  const { mutate: trackOrder, isPending: isTracking } = useTrackOrder();

  const orders = React.useMemo(
    () => (me ? (myOrdersRes?.data ?? []) : trackedOrder ? [trackedOrder] : []),
    [me, myOrdersRes?.data, trackedOrder],
  );

  React.useEffect(() => {
    if (orders.length > 0 && !expandedOrderId) {
      setExpandedOrderId(orders[0].id);
    }
  }, [orders, expandedOrderId]);

  const filterTabs: Array<{ id: StatusFilter; label: string }> = [
    { id: "all", label: t("filterAll") },
    { id: "PROCESSING", label: t("filterProcessing") },
    { id: "IN_TRANSIT", label: t("filterInTransit") },
    { id: "DELIVERED", label: t("filterDelivered") },
  ];

  const statusMeta: Record<
    OrderStatus,
    { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
  > = {
    PENDING: { label: t("statusPending"), variant: "secondary" },
    PROCESSING: { label: t("statusProcessing"), variant: "secondary" },
    IN_TRANSIT: { label: t("statusInTransit"), variant: "outline" },
    DELIVERED: { label: t("statusDelivered"), variant: "default" },
    CANCELLED: { label: t("statusCancelled"), variant: "destructive" },
  };

  const trackingSteps = [
    { label: t("stepPlaced"), icon: CheckCircle2 },
    { label: t("stepPacked"), icon: Package },
    { label: t("stepShipped"), icon: Truck },
    { label: t("stepDelivered"), icon: PackageCheck },
  ];

  const handleTrackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderNumber = trackOrderNumber.trim().replace(/^#/, "");
    const phone = trackPhone.trim();
    if (!orderNumber || !phone) return;

    trackOrder(
      { orderNumber, phone },
      {
        onSuccess: (orderRes) => {
          setTrackedOrder(orderRes.data);
          setExpandedOrderId(orderRes.data.id);
        },
        onError: (error) => {
          setTrackedOrder(null);
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filter === "all" || order.status === filter;
    const matchesQuery =
      !normalizedQuery ||
      order.orderNumber.toLowerCase().includes(normalizedQuery) ||
      order.receiverName.toLowerCase().includes(normalizedQuery);
    return matchesStatus && matchesQuery;
  });

  if (isMeLoading || (me && isOrdersLoading)) {
    return (
      <div className="mt-8 space-y-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {!me && (
        <Card>
          <CardHeader>
            <CardTitle>{t("trackSectionTitle")}</CardTitle>
            <CardDescription>{t("trackSectionDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleTrackSubmit}
              className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
            >
              <Input
                value={trackOrderNumber}
                onChange={(e) => setTrackOrderNumber(e.target.value)}
                placeholder={t("orderNumberPlaceholder")}
                required
              />
              <Input
                type="tel"
                value={trackPhone}
                onChange={(e) => setTrackPhone(e.target.value)}
                placeholder={t("phonePlaceholder")}
                required
              />
              <Button
                type="submit"
                loading={isTracking}
                loadingText={t("trackingLoading")}
              >
                <Search />
                {t("trackSubmit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {me && (
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
      )}

      {me && isOrdersError ? (
        <EmptyState
          icon={<WifiOff className="size-5" aria-hidden />}
          title={t("loadErrorTitle")}
          description={t("loadErrorDescription")}
          action={
            <Button
              type="button"
              variant="outline"
              onClick={() => refetchOrders()}
            >
              {t("retry")}
            </Button>
          }
        />
      ) : filteredOrders.length === 0 ? (
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
            const meta = statusMeta[order.status] ?? statusMeta.PENDING;
            const isExpanded = expandedOrderId === order.id;
            const currentStep = statusStepIndex[order.status] ?? 0;

            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-base font-bold text-foreground">
                          #{order.orderNumber}
                        </span>
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                        <Badge variant="secondary">
                          <HandCoins className="size-3" />
                          {t("paymentCod")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t("orderDateLabel")} {formatDate(order.createdAt)}
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
                          key={item.id}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted">
                              {item.productImage ? (
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
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
                                href={`/products/${item.productSlug}`}
                                className="block truncate font-medium text-foreground hover:text-primary"
                              >
                                {item.productName}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                {item.selectedPack} × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 font-semibold text-foreground">
                            {tCommon("currency")}
                            {item.lineTotal}
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
                      <span>
                        {order.district} — {order.fullAddress}
                      </span>
                    </div>

                    {isExpanded && order.status !== "CANCELLED" && (
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
                                <div
                                  className={cn(
                                    "flex size-9 shrink-0 items-center justify-center rounded-full border",
                                    isCompleted
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border bg-card text-muted-foreground",
                                  )}
                                >
                                  <Icon className="size-4" />
                                </div>
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    isCompleted
                                      ? "text-foreground"
                                      : "text-muted-foreground",
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

                <CardFooter className="flex flex-wrap items-center justify-between gap-3">
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
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
