import type { Metadata } from "next";
import { VerifyResetOtpForm } from "./_components/verify-reset-otp-form";

export const metadata: Metadata = {
  title: "Verify Reset OTP",
};

export default async function VerifyResetOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12">
      <VerifyResetOtpForm email={email} />
    </div>
  );
}
