"use client";

import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AssistantComposerProps {
  input: string;
  isBusy: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AssistantComposer({
  input,
  isBusy,
  inputRef,
  onChange,
  onSubmit,
}: AssistantComposerProps) {
  const t = useTranslations("Assistant");

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 border-t border-border bg-card p-3"
    >
      <Input
        ref={inputRef}
        value={input}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("placeholder")}
        disabled={isBusy}
        aria-label={t("placeholder")}
      />
      <Button
        type="submit"
        size="icon"
        disabled={isBusy || !input.trim()}
        aria-label={t("sendAria")}
      >
        <Send className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
