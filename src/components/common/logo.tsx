import Link from "next/link";
import { Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const boxSize = size === "lg" ? "size-10" : size === "md" ? "size-9" : "size-7";
  const iconSize = size === "lg" ? "size-5" : size === "md" ? "size-4" : "size-3.5";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight transition-opacity hover:opacity-90",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground",
          boxSize
        )}
      >
        <Sprout className={iconSize} />
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-bold tracking-tight font-heading text-foreground",
              size === "lg" && "text-xl",
              size === "md" && "text-lg",
              size === "sm" && "text-base"
            )}
          >
            Bongaon Bazar
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            গ্রামের খাঁটি প্যাকেটজাত স্বাদ
          </span>
        </span>
      )}
    </Link>
  );
}
