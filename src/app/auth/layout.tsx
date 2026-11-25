import type { ReactNode } from "react";
import { Leaf, ShieldCheck, Truck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LanguageToggle } from "@/components/common/language-toggle";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Badge } from "@/components/ui/badge";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const t = await getTranslations("Auth");

  const highlights = [
    {
      icon: Leaf,
      title: t("highlight1Title"),
      description: t("highlight1Desc"),
    },
    {
      icon: Truck,
      title: t("highlight2Title"),
      description: t("highlight2Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("highlight3Title"),
      description: t("highlight3Desc"),
    },
  ] as const;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden flex-col justify-between border-r border-border bg-sidebar p-10 lg:flex">
        <Logo size="lg" href="/" />

        <div className="my-auto max-w-lg space-y-8 py-12">
          <div className="space-y-3">
            <Badge variant="secondary">{t("badge")}</Badge>
            <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-foreground">
              {t("heroTitlePrefix")}{" "}
              <span className="text-primary">{t("heroBrand")}</span>
              {t("heroTitleSuffix")}
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>

          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-xl border border-border bg-card/70 p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4" />
                </span>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("copyright")}
        </p>
      </aside>

      <main className="relative flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4 sm:p-8">
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="mb-6 lg:hidden">
          <Logo size="lg" href="/" />
        </div>

        {children}
      </main>
    </div>
  );
}
