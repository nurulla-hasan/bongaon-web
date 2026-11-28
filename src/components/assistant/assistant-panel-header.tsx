"use client";

import { Bot, RotateCcw, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AssistantPanelHeaderProps {
  titleId: string;
  canReset: boolean;
  isBusy: boolean;
  onReset: () => void;
  onClose: () => void;
}

export function AssistantPanelHeader({
  titleId,
  canReset,
  isBusy,
  onReset,
  onClose,
}: AssistantPanelHeaderProps) {
  const t = useTranslations("Assistant");

  return (
    <header className="flex items-center justify-between gap-2 border-b border-border bg-card px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          <Bot className="size-4" />
        </span>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2
              id={titleId}
              className="truncate text-sm font-semibold text-foreground"
            >
              {t("title")}
            </h2>
            <Badge variant="secondary">AI</Badge>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {canReset && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isBusy}
            onClick={onReset}
            aria-label={t("resetAria")}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label={t("closeAria")}
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
