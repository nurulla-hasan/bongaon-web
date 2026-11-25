"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCountdown } from "@/hooks/useUtilityHooks";
import { getErrorMessage } from "@/lib/error";
import { useResendOtp, useVerifyEmail } from "@/services";
import { verifyEmailSchema } from "@/validations";

export function VerifyEmailForm({ email }: { email: string }) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { secondsLeft, isRunning, start } = useCountdown(60, "web-verify-otp");
  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const { mutate: resendOtp, isPending: isResending } = useResendOtp();

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onChange: verifyEmailSchema,
    },
    onSubmit: ({ value }) => {
      if (!email) {
        toast.error("Email is missing. Please register again.");
        router.push("/auth/register");
        return;
      }

      verifyEmail(
        { email, otp: value.otp },
        {
          onSuccess: (res) => {
            toast.success(res.message || "Email verified! Please sign in.");
            router.push("/auth/login");
          },
          onError: (err) => {
            toast.error(
              getErrorMessage(err, "Invalid or expired verification code"),
            );
          },
        },
      );
    },
  });

  const handleResend = () => {
    if (!email) {
      toast.error("Email is missing.");
      return;
    }

    resendOtp(
      { email },
      {
        onSuccess: (res) => {
          start();
          toast.success(res.message || `Verification OTP resent to ${email}`);
        },
        onError: (err) => {
          toast.error(getErrorMessage(err, "Failed to resend OTP"));
        },
      },
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{t("verifyEmailTitle")}</CardTitle>
        <CardDescription>
          {t("verifyEmailDescription")}{" "}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <form.Field name="otp">
            {(field) => {
              const rawError = field.state.meta.errors[0];
              const errors = rawError
                ? [
                    {
                      message: String(
                        (rawError as { message?: string })?.message ?? rawError,
                      ),
                    },
                  ]
                : undefined;

              return (
                <Field
                  data-invalid={Boolean(errors)}
                  className="items-center text-center"
                >
                  <FieldLabel htmlFor="verify-email-otp" className="justify-center">
                    {t("otpLabel")}
                  </FieldLabel>
                  <div className="flex justify-center">
                    <InputOTP
                      id="verify-email-otp"
                      maxLength={6}
                      value={field.state.value}
                      onChange={(val) => field.handleChange(val)}
                      disabled={isPending}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {errors && <FieldError errors={errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={isPending}
            loadingText={t("verifying")}
          >
            {t("verifyEmailButton")}
          </Button>

          <div className="flex items-center justify-between text-xs">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              {t("backToRegister")}
            </Link>

            <button
              type="button"
              disabled={isRunning || isResending}
              onClick={handleResend}
              className="cursor-pointer font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending
                ? t("sendingOtp")
                : isRunning
                  ? `${t("resendIn")} ${secondsLeft}`
                  : t("resendOtp")}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
