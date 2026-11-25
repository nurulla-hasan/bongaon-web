"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/error";
import { useChangePassword, useMe, useUpdateMe } from "@/services";

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100),
  email: z.email({ error: "Invalid email address." }),
  phone: z.string().trim().max(30),
});

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { error: "Current password is required." }),
    newPassword: z
      .string()
      .min(6, { error: "New password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your new password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });

function ProfileDetailsCard({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  const t = useTranslations("Profile");
  const updateMe = useUpdateMe();

  const form = useForm({
    defaultValues: { name, email, phone },
    validators: { onSubmit: profileSchema },
    onSubmit: async ({ value }) => {
      try {
        await updateMe.mutateAsync({
          name: value.name,
          phone: value.phone,
        });
        toast.success("Profile updated");
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to update profile"));
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("accountTitle")}</CardTitle>
        <CardDescription>{t("accountDescription")}</CardDescription>
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
            disabled={updateMe.isPending}
          />
          <FormInput
            form={form}
            name="email"
            label={t("emailLabel")}
            type="email"
            disabled
            description={t("emailHint")}
          />
          <FormInput
            form={form}
            name="phone"
            label={t("phoneLabel")}
            placeholder="01712345678"
            disabled={updateMe.isPending}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  loading={isSubmitting || updateMe.isPending}
                  loadingText={t("saving")}
                >
                  {t("saveProfile")}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}

function ChangePasswordCard() {
  const t = useTranslations("Profile");
  const changePassword = useChangePassword();

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onSubmit: changePasswordSchema },
    onSubmit: async ({ value }) => {
      try {
        await changePassword.mutateAsync({
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        });
        toast.success("Password updated");
        form.reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to update password"));
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("passwordTitle")}</CardTitle>
        <CardDescription>{t("passwordDescription")}</CardDescription>
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
            name="oldPassword"
            label={t("currentPasswordLabel")}
            type="password"
            placeholder="••••••••"
            disabled={changePassword.isPending}
          />
          <FormInput
            form={form}
            name="newPassword"
            label={t("newPasswordLabel")}
            type="password"
            placeholder={t("newPasswordPlaceholder")}
            disabled={changePassword.isPending}
          />
          <FormInput
            form={form}
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            disabled={changePassword.isPending}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  loading={isSubmitting || changePassword.isPending}
                  loadingText={t("updating")}
                >
                  {t("updatePassword")}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}

export function ProfileView() {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 w-full rounded-xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ProfileDetailsCard
        key={user?.id ?? "guest"}
        name={user?.name ?? ""}
        email={user?.email ?? ""}
        phone={user?.phone ?? ""}
      />
      <ChangePasswordCard />
    </div>
  );
}
