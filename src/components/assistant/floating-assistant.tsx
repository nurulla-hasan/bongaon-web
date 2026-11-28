"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AssistantComposer } from "./assistant-composer";
import { AssistantMessageList } from "./assistant-message-list";
import { AssistantPanelHeader } from "./assistant-panel-header";

export function FloatingAssistant() {
  const t = useTranslations("Assistant");
  const titleId = useId();
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

  const handleClose = () => {
    setOpen(false);
    launcherRef.current?.focus();
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
          aria-labelledby={titleId}
          className="fixed inset-x-3 top-20 bottom-20 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-22 sm:h-128 sm:w-96"
        >
          <AssistantPanelHeader
            titleId={titleId}
            canReset={messages.length > 0}
            isBusy={isBusy}
            onReset={handleReset}
            onClose={handleClose}
          />

          <AssistantMessageList
            messages={messages}
            status={status}
            error={error}
            isBusy={isBusy}
            quickPrompts={quickPrompts}
            bottomRef={bottomRef}
            onSelectPrompt={handleSend}
            onClearError={clearError}
            onNavigate={() => setOpen(false)}
          />

          <AssistantComposer
            input={input}
            isBusy={isBusy}
            inputRef={inputRef}
            onChange={setInput}
            onSubmit={handleSubmit}
          />
        </section>
      )}

      <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
        <Button
          ref={launcherRef}
          type="button"
          size="lg"
          aria-expanded={open}
          aria-label={open ? t("closeAria") : t("openAria")}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <X className="size-4" aria-hidden="true" />
          ) : (
            <MessageSquare className="size-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{t("launcherLabel")}</span>
        </Button>
      </div>
    </>
  );
}
