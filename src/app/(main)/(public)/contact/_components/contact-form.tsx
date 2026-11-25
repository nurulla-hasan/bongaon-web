"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/error";
import { useCreateContactMessage } from "@/services";

const contactSchema = z.object({
  name: z.string().trim().min(2, { error: "Name must be at least 2 characters." }).max(120),
  phone: z.string().trim().min(6, { error: "Valid phone number is required." }).max(30),
  subject: z.string().trim().max(150),
  message: z
    .string()
    .trim()
    .min(5, { error: "Message must be at least 5 characters." })
    .max(2000),
});

export function ContactForm() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = React.useState(false);
  const createContact = useCreateContactMessage();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      subject: "",
      message: "",
    },
    validators: {
      onSubmit: contactSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createContact.mutateAsync({
          name: value.name.trim(),
          phone: value.phone.trim(),
          subject: value.subject.trim() || undefined,
          message: value.message.trim(),
        });
        form.reset();
        setSubmitted(true);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => (
                <FormInput
                  field={field}
                  label={t("nameLabel")}
                  placeholder={t("namePlaceholder")}
                />
              )}
            </form.Field>
            <form.Field name="phone">
              {(field) => (
                <FormInput
                  field={field}
                  type="tel"
                  label={t("phoneLabel")}
                  placeholder={t("phonePlaceholder")}
                />
              )}
            </form.Field>
          </div>

          <form.Field name="subject">
            {(field) => (
              <FormInput
                field={field}
                label={t("subjectLabel")}
                placeholder={t("subjectPlaceholder")}
              />
            )}
          </form.Field>

          <form.Field name="message">
            {(field) => {
              const hasError =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={hasError}>
                  <FieldLabel htmlFor="contact-message">
                    {t("messageLabel")}
                  </FieldLabel>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t("messagePlaceholder")}
                    aria-invalid={hasError}
                  />
                  {hasError && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            size="xl"
            className="w-full sm:w-auto"
            disabled={createContact.isPending}
          >
            <Send />
            {t("submitButton")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
