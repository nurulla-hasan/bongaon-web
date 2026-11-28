"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Bot,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AssistantMessageParts,
  hasRenderableAssistantContent,
} from "./assistant-message-parts";

export function FloatingAssistant() {
  const t = useTranslations("Assistant");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, setMessages, status, error, clearError } =
    useChat();

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    clearError();
    sendMessage({ text: trimmed });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isBusy) return;
    handleSend(input);
    setInput("");
  };

  const handleReset = () => {
    clearError();
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  const quickPrompts = [
    t("quickProducts"),
    t("quickDelivery"),
    t("quickTrack"),
  ];

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-label={t("title")}
          className="fixed inset-x-3 bottom-22 z-50 flex h-132 max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-3xl border border-border/80 bg-card/95 text-card-foreground shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-96"
        >
          <header className="relative flex items-center justify-between gap-2 border-b border-border/80 bg-linear-to-r from-primary/15 via-gold/10 to-clay/10 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex size-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                <Bot className="size-5" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 flex size-3"
                >
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex size-3 rounded-full border-2 border-card bg-primary" />
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="truncate text-sm font-semibold text-foreground">
                    {t("title")}
                  </h2>
                  <Badge variant="secondary">
                    <Sparkles className="size-3 text-primary" />
                    AI
                  </Badge>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {messages.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={isBusy}
                  onClick={handleReset}
                  aria-label={t("resetAria")}
                >
                  <RotateCcw className="size-4" />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setOpen(false);
                  launcherRef.current?.focus();
                }}
                aria-label={t("closeAria")}
              >
                <X className="size-4" />
              </Button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                  </span>
                  <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-muted/60 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                    {t("greeting")}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pl-9">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleSend(prompt)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Sparkles
                        className="size-3 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => {
                const isUser = message.role === "user";
                if (isUser) {
                  return (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-72 rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground shadow-xs">
                        <AssistantMessageParts
                          message={message}
                          onNavigate={() => setOpen(false)}
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

                return (
                  <div key={message.id} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Sparkles
                        className={cn(
                          "size-3.5",
                          isLastStreamingEmpty && "animate-pulse",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <div className="max-w-72 rounded-2xl rounded-tl-sm border border-border/60 bg-muted/60 px-3.5 py-2.5 text-sm text-foreground">
                      {isLastStreamingEmpty ? (
                        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{t("thinking")}</span>
                          <span className="inline-flex gap-1" aria-hidden="true">
                            <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                            <span
                              className="size-1.5 animate-bounce rounded-full bg-primary"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="size-1.5 animate-bounce rounded-full bg-primary"
                              style={{ animationDelay: "300ms" }}
                            />
                          </span>
                        </div>
                      ) : (
                        <AssistantMessageParts
                          message={message}
                          onNavigate={() => setOpen(false)}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {status === "submitted" && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-2.5"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Sparkles
                    className="size-3.5 animate-pulse"
                    aria-hidden="true"
                  />
                </span>
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm border border-border/60 bg-muted/60 px-3.5 py-2.5 text-xs text-muted-foreground">
                  <span>{t("thinking")}</span>
                  <span className="inline-flex gap-1" aria-hidden="true">
                    <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-primary"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="size-1.5 animate-bounce rounded-full bg-primary"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="flex items-center justify-between gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive"
              >
                <span>{t("errorFallback")}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="default"
                  onClick={() => clearError()}
                >
                  {t("retry")}
                </Button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-border/80 bg-background/80 p-3 backdrop-blur-xs"
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 py-1.5 pr-1.5 pl-4 transition-colors focus-within:border-primary/60 focus-within:bg-background">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("placeholder")}
                disabled={isBusy}
                aria-label={t("placeholder")}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                aria-label={t("sendAria")}
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send className="size-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
        <button
          ref={launcherRef}
          type="button"
          aria-expanded={open}
          aria-label={open ? t("closeAria") : t("openAria")}
          onClick={() => setOpen((prev) => !prev)}
          className="group relative flex h-13 cursor-pointer items-center gap-2.5 rounded-full border border-primary/30 bg-linear-to-r from-primary via-primary to-primary/90 px-4 text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/35 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:scale-95"
        >
          <span className="relative flex size-7 items-center justify-center rounded-full bg-primary-foreground/15">
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Sparkles className="size-4" aria-hidden="true" />
            )}
            {!open && (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border border-primary bg-gold"
              />
            )}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {t("launcherLabel")}
          </span>
        </button>
      </div>
    </>
  );
}
