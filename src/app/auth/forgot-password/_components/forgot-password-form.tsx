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
import { useForgotPassword } from "@/services";

const forgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
});

export function ForgotPasswordForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const forgotPassword = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await forgotPassword.mutateAsync(value);
        toast.success(res.message || "Reset OTP sent to your email");
        router.push(`/auth/verify-reset-otp?email=${encodeURIComponent(value.email)}`);
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to send reset OTP"));
      }
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{t("forgotTitle")}</CardTitle>
        <CardDescription>{t("forgotDescription")}</CardDescription>
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
            autoComplete="email"
            disabled={forgotPassword.isPending}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting || forgotPassword.isPending}
                loadingText={t("sendingResetOtp")}
              >
                {t("sendResetOtpButton")}
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
