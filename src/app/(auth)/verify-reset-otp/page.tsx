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
  return <VerifyResetOtpForm email={email} />;
}
