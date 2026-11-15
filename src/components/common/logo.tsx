"use client";

import { Atma } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const brandLogoFont = Atma({
  subsets: ["bengali", "latin"],
  weight: ["700"],
});

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

export function Logo({
  className,
  size = "md",
  showText = true,
  href = "/",
}: LogoProps) {
  const t = useTranslations("Common");
  const brandName = t("brandName");
  const [firstWord, ...restWords] = brandName.split(" ");
  const secondWord = restWords.join(" ");

  const boxSize =
    size === "lg" ? "size-12" : size === "md" ? "size-11" : "size-9";
  const imageSizes =
    size === "lg" ? "48px" : size === "md" ? "44px" : "36px";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 tracking-tight transition-opacity hover:opacity-90",
        className
      )}
    >
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center",
          boxSize
        )}
      >
        <Image
          src="/images/logo-mark.png"
          alt={brandName}
          fill
          sizes={imageSizes}
          className="object-contain"
          priority
        />
      </span>

      {showText && (
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              brandLogoFont.className,
              "font-bold tracking-normal",
              size === "lg" && "text-2xl",
              size === "md" && "text-xl",
              size === "sm" && "text-base"
            )}
          >
            <span className="text-primary">{firstWord}</span>
            {secondWord && (
              <>
                {" "}
                <span className="text-clay">{secondWord}</span>
              </>
            )}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {t("tagline")}
          </span>
        </span>
      )}
    </Link>
  );
}
