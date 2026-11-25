"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { FormInput } from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getErrorMessage } from "@/lib/error";
import { useCreateContactMessage } from "@/services";
import { contactSchema } from "@/validations";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = React.useState(false);
  const { mutate: createContact, isPending } = useCreateContactMessage();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      subject: "",
      message: "",
    },
    validators: {
      onChange: contactSchema,
    },
    onSubmit: ({ value }) => {
      createContact(
        {
          name: value.name.trim(),
          phone: value.phone.trim(),
          subject: value.subject.trim() || undefined,
          message: value.message.trim(),
        },
        {
          onSuccess: () => {
            form.reset();
            setSubmitted(true);
          },
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        },
      );
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
            <FormInput
              form={form}
              name="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
            />
            <FormInput
              form={form}
              name="phone"
              type="tel"
              label={t("phoneLabel")}
              placeholder={t("phonePlaceholder")}
            />
          </div>

          <FormInput
            form={form}
            name="subject"
            label={t("subjectLabel")}
            placeholder={t("subjectPlaceholder")}
          />

          <FormInput
            form={form}
            name="message"
            type="textarea"
            label={t("messageLabel")}
            placeholder={t("messagePlaceholder")}
          />

          <Button
            type="submit"
            size="xl"
            className="w-full sm:w-auto"
            loading={isPending}
          >
            <Send />
            {t("submitButton")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
