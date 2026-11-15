"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-7" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              {t("sentTitle")}
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
              {t("sentDesc")}
            </p>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              {t("sendAnother")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("formTitle")}</CardTitle>
        <CardDescription>{t("formDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t("nameLabel")}</Label>
              <Input
                id="contact-name"
                required
                placeholder={t("namePlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">{t("phoneLabel")}</Label>
              <Input
                id="contact-phone"
                required
                placeholder={t("phonePlaceholder")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-subject">{t("subjectLabel")}</Label>
            <Input
              id="contact-subject"
              placeholder={t("subjectPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">{t("messageLabel")}</Label>
            <Textarea
              id="contact-message"
              required
              rows={4}
              placeholder={t("messagePlaceholder")}
            />
          </div>

          <Button type="submit" size="xl" className="w-full sm:w-auto">
            <Send />
            {t("submitButton")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
