"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import {
  Calendar,
  KeyRound,
  LogOut,
  Mail,
  PackageCheck,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { FormInput } from "@/components/common/form-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/error";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { useChangePassword, useLogout, useMe, useUpdateMe } from "@/services";
import type { AuthUser } from "@/types";

type ProfileSection = "account" | "security";

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

function ProfileSidebar({
  user,
  activeSection,
  onSelectSection,
}: {
  user?: AuthUser;
  activeSection: ProfileSection;
  onSelectSection: (section: ProfileSection) => void;
}) {
  const t = useTranslations("Profile");
  const router = useRouter();
  const logout = useLogout();

  const displayName = user?.name || t("namePlaceholder");
  const initials = getInitials(displayName);

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success(t("signedOut"));
      router.push("/auth/login");
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, t("signOutFailed")));
    }
  };

  return (
    <Card className="h-fit">
      <CardContent className="space-y-5 pt-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-14 text-base font-semibold">
            {user?.imageUrl ? (
              <AvatarImage src={user.imageUrl} alt={displayName} />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-foreground">
                {displayName}
              </h2>
              {user?.emailVerified && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  <ShieldCheck className="size-3 text-primary" aria-hidden />
                  {t("verifiedBadge")}
                </Badge>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email || "—"}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <Mail className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span className="truncate">{user?.email || "—"}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span className="truncate">
              {user?.phone?.trim() ? user.phone : t("phoneNotSet")}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span>
              {t("memberSince")}: {formatDate(user?.createdAt)}
            </span>
          </div>
        </div>

        <Separator />

        <nav aria-label={t("title")} className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectSection("account")}
            aria-current={activeSection === "account" ? "page" : undefined}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              activeSection === "account"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <User className="size-4 shrink-0" aria-hidden />
            <span>{t("navAccount")}</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSection("security")}
            aria-current={activeSection === "security" ? "page" : undefined}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              activeSection === "security"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <KeyRound className="size-4 shrink-0" aria-hidden />
            <span>{t("navSecurity")}</span>
          </button>

          <Link
            href="/orders"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <PackageCheck className="size-4 shrink-0" aria-hidden />
            <span>{t("navOrders")}</span>
          </Link>
        </nav>

        <Separator />

        <Button
          type="button"
          variant="outline"
          className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
          loading={logout.isPending}
          onClick={handleLogout}
        >
          <LogOut className="size-4" aria-hidden />
          <span>{t("signOut")}</span>
        </Button>
      </CardContent>
    </Card>
  );
}

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
        toast.success(t("profileUpdated"));
      } catch (err) {
        toast.error(getErrorMessage(err, t("profileUpdateFailed")));
      }
    },
  });

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <CardTitle>{t("accountTitle")}</CardTitle>
        <CardDescription>{t("accountDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              form={form}
              name="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
              disabled={updateMe.isPending}
            />
            <FormInput
              form={form}
              name="phone"
              label={t("phoneLabel")}
              placeholder="01712345678"
              disabled={updateMe.isPending}
            />
          </div>

          <FormInput
            form={form}
            name="email"
            label={t("emailLabel")}
            type="email"
            disabled
            description={t("emailHint")}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <div className="flex justify-end border-t pt-4">
                <Button
                  type="submit"
                  size="lg"
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
        toast.success(t("passwordUpdated"));
        form.reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } catch (err) {
        toast.error(getErrorMessage(err, t("passwordUpdateFailed")));
      }
    },
  });

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <CardTitle>{t("passwordTitle")}</CardTitle>
        <CardDescription>{t("passwordDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <FormInput
            form={form}
            name="oldPassword"
            label={t("currentPasswordLabel")}
            type="password"
            placeholder="••••••••"
            disabled={changePassword.isPending}
          />

          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <div className="flex justify-end border-t pt-4">
                <Button
                  type="submit"
                  size="lg"
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

function GooglePasswordNoticeCard() {
  const t = useTranslations("Profile");

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <CardTitle>{t("passwordTitle")}</CardTitle>
        <CardDescription>{t("passwordDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {t("googlePasswordTitle")}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("googlePasswordDescription")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileView() {
  const { data: user, isLoading } = useMe();
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>("account");

  if (isLoading) {
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-8">
          <Skeleton className="h-88 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <ProfileSidebar
          user={user}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />
      </div>

      <div className="lg:col-span-8">
        {activeSection === "account" ? (
          <ProfileDetailsCard
            key={user?.id ?? "guest"}
            name={user?.name ?? ""}
            email={user?.email ?? ""}
            phone={user?.phone ?? ""}
          />
        ) : user?.hasPassword === false ? (
          <GooglePasswordNoticeCard />
        ) : (
          <ChangePasswordCard />
        )}
      </div>
    </div>
  );
}
