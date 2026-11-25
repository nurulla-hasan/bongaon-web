"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
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
import { useResetPassword } from "@/services";

const resetPasswordSchema = z
  .object({
    email: z.email({ error: "Please enter a valid email address." }),
    otp: z.string().length(6, { error: "Reset code must be 6 digits." }),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your new password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });

export function ResetPasswordForm({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const resetPassword = useResetPassword();

  const form = useForm({
    defaultValues: {
      email,
      otp,
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await resetPassword.mutateAsync({
          email: value.email,
          otp: value.otp,
          password: value.password,
        });
        toast.success(res.message || "Password reset successfully");
        router.push("/auth/login");
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to reset password"));
      }
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{t("resetTitle")}</CardTitle>
        <CardDescription>{t("resetDescription")}</CardDescription>
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
            name="email"
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            disabled={resetPassword.isPending}
          />

          <FormInput
            form={form}
            name="otp"
            label={t("otpFieldLabel")}
            placeholder="123456"
            maxLength={6}
            inputMode="numeric"
            disabled={resetPassword.isPending}
          />

          <FormInput
            form={form}
            name="password"
            label={t("newPasswordLabel")}
            type="password"
            placeholder={t("passwordMinPlaceholder")}
            autoComplete="new-password"
            disabled={resetPassword.isPending}
          />

          <FormInput
            form={form}
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            autoComplete="new-password"
            disabled={resetPassword.isPending}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting || resetPassword.isPending}
                loadingText={t("resetting")}
              >
                {t("resetButton")}
              </Button>
            )}
          </form.Subscribe>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              {t("backToSignIn")}
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
