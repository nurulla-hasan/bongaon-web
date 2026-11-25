"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
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
import { useRegister } from "@/services";
import { registerSchema } from "@/validations";
import { GoogleAuthButton } from "../../_components/google-auth-button";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: ({ value }) => {
      register(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          ...(value.phone ? { phone: value.phone } : {}),
        },
        {
          onSuccess: (res) => {
            toast.success(res.message || "Verification OTP sent to your email");
            router.push(
              `/auth/verify-email?email=${encodeURIComponent(value.email)}`,
            );
          },
          onError: (err) => {
            toast.error(getErrorMessage(err, "Registration failed"));
          },
        },
      );
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{t("registerTitle")}</CardTitle>
        <CardDescription>{t("registerDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FormInput
            form={form}
            name="name"
            label={t("nameLabel")}
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            disabled={isPending}
          />

          <FormInput
            form={form}
            name="email"
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            disabled={isPending}
          />

          <FormInput
            form={form}
            name="phone"
            label={t("phoneLabel")}
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            disabled={isPending}
          />

          <FormInput
            form={form}
            name="password"
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordMinPlaceholder")}
            autoComplete="new-password"
            disabled={isPending}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isPending}
            loadingText={t("creatingAccount")}
          >
            {t("registerButton")}
          </Button>

          <GoogleAuthButton disabled={isPending} />

          <p className="text-center text-xs text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              {t("signInLink")}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
