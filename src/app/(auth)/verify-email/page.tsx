import type { Metadata } from "next";
import { VerifyEmailForm } from "./_components/verify-email-form";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email = "" } = await searchParams;
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-12">
      <VerifyEmailForm email={email} />
    </div>
  );
}
