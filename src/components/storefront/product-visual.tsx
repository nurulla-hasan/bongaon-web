import Image from "next/image";
import { PackageCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BazarProduct } from "@/data/mock-bazar";

interface ProductVisualProps {
  tone: BazarProduct["visualTone"];
  unit: string;
  shortTag: string;
  image?: string;
  alt?: string;
  size?: "card" | "detail";
}

const toneMap: Record<BazarProduct["visualTone"], string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
};

export function ProductVisual({
  tone,
  unit,
  shortTag,
  image,
  alt,
  size = "card",
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border/70",
        image ? "bg-muted" : toneMap[tone],
        size === "card" ? "h-48" : "h-80 sm:h-96"
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={alt ?? shortTag}
            fill
            sizes={
              size === "card"
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 1024px) 100vw, 40vw"
            }
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
            <Sparkles className="size-3.5 text-clay" />
            {shortTag}
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            প্যাকেট: {unit}
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
            প্যাকেট: {unit}
          </span>
        </>
      )}
    </div>
  );
}
