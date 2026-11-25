"use client";

import * as React from "react";
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
import { useLogin } from "@/services";
import { GoogleAuthButton } from "../../_components/google-auth-button";

const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." }),
});

function getSafeRedirect(callbackUrl?: string): string {
  if (!callbackUrl) return "/";
  if (!callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) return "/";
  return callbackUrl;
}

export function LoginForm({
  callbackUrl,
  authError,
}: {
  callbackUrl?: string;
  authError?: string;
}) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const loginMutation = useLogin();
  const shownAuthErrorRef = React.useRef(false);

  React.useEffect(() => {
    if (authError && !shownAuthErrorRef.current) {
      shownAuthErrorRef.current = true;
      toast.error(t("googleSignInFailed"));
    }
  }, [authError, t]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await loginMutation.mutateAsync(value);
        toast.success("Signed in successfully");
        router.push(getSafeRedirect(callbackUrl));
        router.refresh();
      } catch (err) {
        toast.error(getErrorMessage(err, "Invalid email or password"));
      }
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{t("loginTitle")}</CardTitle>
        <CardDescription>{t("loginDescription")}</CardDescription>
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
            disabled={loginMutation.isPending}
          />

          <div className="space-y-1.5">
            <FormInput
              form={form}
              name="password"
              label={t("passwordLabel")}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loginMutation.isPending}
            />
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                {t("forgotPasswordLink")}
              </Link>
            </div>
          </div>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting || loginMutation.isPending}
                loadingText={t("signingIn")}
              >
                {t("signInButton")}
              </Button>
            )}
          </form.Subscribe>

          <GoogleAuthButton disabled={loginMutation.isPending} />

          <p className="text-center text-xs text-muted-foreground">
            {t("noAccount")}{" "}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              {t("createAccountLink")}
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
