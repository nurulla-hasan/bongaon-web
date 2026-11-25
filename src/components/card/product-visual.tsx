import Image from "next/image";
import { PackageCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type VisualTone = "primary" | "secondary" | "accent" | "muted";

interface ProductVisualProps {
  tone?: VisualTone;
  unit: string;
  shortTag: string;
  image?: string;
  alt?: string;
  size?: "card" | "detail";
  loading?: "eager" | "lazy";
}

const toneMap: Record<VisualTone, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
};

export function ProductVisual({
  tone = "primary",
  unit,
  shortTag,
  image,
  alt,
  size = "card",
  loading,
}: ProductVisualProps) {
  const t = useTranslations("Common");
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border/70",
        image ? "bg-muted" : toneMap[tone],
        size === "card" ? "aspect-4/3" : "aspect-square"
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={alt ?? shortTag}
            fill
            loading={loading ?? (size === "detail" ? "eager" : undefined)}
            sizes={
              size === "card"
                ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                : "(max-width: 1024px) 100vw, 40vw"
            }
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span
            className={cn(
              "absolute top-3 left-3 items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur",
              size === "card" ? "hidden sm:inline-flex" : "inline-flex"
            )}
          >
            <Sparkles className="size-3.5 text-clay" />
            {shortTag}
          </span>
          <span
            className={cn(
              "absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur",
              size === "card" ? "hidden sm:inline-block" : "inline-block"
            )}
          >
            {t("packPrefix")} {unit}
          </span>
        </>
      ) : (
        <>
          <div className="flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>{shortTag}</span>
          </div>

          <PackageCheck
            className={cn(size === "card" ? "size-14" : "size-20", "opacity-85")}
          />

          <span className="rounded-md bg-background/85 px-2.5 py-0.5 text-xs font-semibold text-foreground">
            {t("packPrefix")} {unit}
          </span>
        </>
      )}
    </div>
  );
}
