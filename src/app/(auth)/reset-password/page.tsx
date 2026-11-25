import type { Metadata } from "next";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; otp?: string }>;
}) {
  const { email = "", otp = "" } = await searchParams;
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12">
      <ResetPasswordForm email={email} otp={otp} />
    </div>
  );
}
