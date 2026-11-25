"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
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
import { getErrorMessage } from "@/lib/error";
import { useRegister } from "@/services";
import { GoogleAuthButton } from "../../_components/google-auth-button";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100),
  email: z.email({ error: "Please enter a valid email address." }),
  phone: z.string().trim(),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." })
    .max(100),
});

export function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const registerMutation = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await registerMutation.mutateAsync({
          name: value.name,
          email: value.email,
          password: value.password,
          ...(value.phone ? { phone: value.phone } : {}),
        });
        toast.success(res.message || "Verification OTP sent to your email");
        router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
      } catch (err) {
        toast.error(getErrorMessage(err, "Registration failed"));
      }
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
            disabled={registerMutation.isPending}
          />

          <FormInput
            form={form}
            name="email"
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            disabled={registerMutation.isPending}
          />

          <FormInput
            form={form}
            name="phone"
            label={t("phoneLabel")}
            placeholder={t("phonePlaceholder")}
            autoComplete="tel"
            disabled={registerMutation.isPending}
          />

          <FormInput
            form={form}
            name="password"
            label={t("passwordLabel")}
            type="password"
            placeholder={t("passwordMinPlaceholder")}
            autoComplete="new-password"
            disabled={registerMutation.isPending}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting || registerMutation.isPending}
                loadingText={t("creatingAccount")}
              >
                {t("registerButton")}
              </Button>
            )}
          </form.Subscribe>

          <GoogleAuthButton disabled={registerMutation.isPending} />

          <p className="text-center text-xs text-muted-foreground">
            {t("haveAccount")}{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t("signInLink")}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
