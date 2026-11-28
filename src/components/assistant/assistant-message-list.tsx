"use client";

import type { UIMessage } from "ai";
import { Bot, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  AssistantMessageParts,
  hasRenderableAssistantContent,
} from "./assistant-message-parts";

interface AssistantMessageListProps {
  messages: UIMessage[];
  status: string;
  error: Error | undefined;
  isBusy: boolean;
  quickPrompts: string[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onSelectPrompt: (prompt: string) => void;
  onClearError: () => void;
  onNavigate: () => void;
}

function ThinkingIndicator({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2.5"
    >
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Bot className="size-3.5" />
      </span>
      <div className="inline-flex items-center gap-2 rounded-xl rounded-tl-xs border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <Loader2
          className="size-3.5 animate-spin text-primary motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span>{label}</span>
      </div>
    </div>
  );
}

export function AssistantMessageList({
  messages,
  status,
  error,
  isBusy,
  quickPrompts,
  bottomRef,
  onSelectPrompt,
  onClearError,
  onNavigate,
}: AssistantMessageListProps) {
  const t = useTranslations("Assistant");

  return (
    <div
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm"
    >
      {messages.length === 0 ? (
        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <Bot className="size-3.5" />
            </span>
            <div className="rounded-xl rounded-tl-xs border border-border bg-muted/50 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
              {t("greeting")}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pl-9">
            {quickPrompts.map((prompt) => (
              <Button
                key={prompt}
                type="button"
                variant="outline"
                disabled={isBusy}
                onClick={() => onSelectPrompt(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((message, index) => {
          if (message.role === "user") {
            return (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-72 rounded-xl rounded-br-xs bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
                  <AssistantMessageParts
                    message={message}
                    onNavigate={onNavigate}
                  />
                </div>
              </div>
            );
          }

          const hasContent = hasRenderableAssistantContent(message);
          const isLastStreamingEmpty =
            !hasContent && isBusy && index === messages.length - 1;

          if (!hasContent && !isLastStreamingEmpty) {
            return null;
          }

          if (isLastStreamingEmpty) {
            return <ThinkingIndicator key={message.id} label={t("thinking")} />;
          }

          return (
            <div key={message.id} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <Bot className="size-3.5" />
              </span>
              <div className="max-w-72 rounded-xl rounded-tl-xs border border-border bg-muted/50 px-3.5 py-2.5 text-sm text-foreground">
                <AssistantMessageParts
                  message={message}
                  onNavigate={onNavigate}
                />
              </div>
            </div>
          );
        })
      )}

      {status === "submitted" && <ThinkingIndicator label={t("thinking")} />}

      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          <span>{t("errorFallback")}</span>
          <Button type="button" variant="ghost" onClick={onClearError}>
            {t("retry")}
          </Button>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
