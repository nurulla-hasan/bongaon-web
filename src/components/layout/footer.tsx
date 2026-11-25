import Link from "next/link";
import { MapPin, PhoneCall, ShieldCheck, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GrassTuft } from "@/components/common/leaf-decor";
import { Logo } from "@/components/common/logo";
import { Separator } from "@/components/ui/separator";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { getSettings } from "@/services/api";

export async function Footer() {
  const [t, settingsRes] = await Promise.all([
    getTranslations("Footer"),
    getSettings().catch(() => null),
  ]);

  const settings = settingsRes?.data;

  return (
    <footer className="relative isolate overflow-hidden border-t border-border bg-muted/40">
      <GrassTuft className="pointer-events-none absolute -bottom-2 -left-2 -z-10 hidden h-20 w-24 text-primary/20 sm:block" />
      <GrassTuft className="pointer-events-none absolute -right-2 -bottom-2 -z-10 hidden h-24 w-28 -scale-x-100 text-primary/15 md:block" />
      <div
        className={cn(
          "mx-auto py-12",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-foreground">
                  {t("allSpecialProducts")}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-foreground">
                  {t("yourCart")}
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-foreground">
                  {t("codCheckout")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("deliveryPayment")}
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{t("deliveryPromise")}</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{t("codPromise")}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              {t("contactAddress")}
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{settings?.storeAddress || t("address")}</span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{settings?.supportPhone || t("helpline")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8">
          <Separator />
        </div>

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>{t("copyright")}</p>
          <p>
            {t("craftedBy")}{" "}
            <a
              href="https://nurulla-hasan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Nurulla Hasan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
