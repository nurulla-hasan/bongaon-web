import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type HeadingAlignment = "left" | "center";
type HeadingVariant = "default" | "plain";

interface SectionHeadingProps {
  badge?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  alignment?: HeadingAlignment;
  className?: string;
  children?: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
  variant?: HeadingVariant;
  titleClassName?: string;
  descriptionClassName?: string;
  constrain?: boolean;
}

const headingSizes: Record<NonNullable<SectionHeadingProps["as"]>, string> = {
  h1: "text-3xl font-bold sm:text-4xl",
  h2: "text-2xl font-semibold sm:text-3xl",
  h3: "text-xl font-semibold sm:text-2xl",
  h4: "text-lg font-semibold",
};

export function SectionHeading({
  badge,
  eyebrow,
  title,
  description,
  alignment = "center",
  className,
  children,
  as: Tag = "h2",
  variant = "default",
  titleClassName,
  descriptionClassName,
  constrain = true,
}: SectionHeadingProps) {
  const hasKicker = Boolean(badge || eyebrow);

  return (
    <div
      className={cn(
        constrain && !children && "max-w-2xl",
        alignment === "center" ? "mx-auto text-center" : "text-left",
        children && "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-0.5">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-clay" aria-hidden />
            {eyebrow}
          </p>
        )}

        {badge && <Badge variant="default">{badge}</Badge>}

        <Tag
          className={cn(
            hasKicker && "mt-3",
            "font-heading leading-tight font-semibold tracking-tight text-foreground",
            variant === "plain" && "text-foreground",
            titleClassName ?? headingSizes[Tag],
          )}
        >
          {title}
        </Tag>

        {description && (
          <p
            className={cn(
              "text-sm leading-5 text-muted-foreground sm:text-base",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}
