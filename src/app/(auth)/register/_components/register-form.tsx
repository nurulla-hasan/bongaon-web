"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
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
import { useRegister } from "@/services";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100),
  email: z.email({ error: "Please enter a valid email address." }),
  phone: z.string().trim(),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." })
    .max(100),
});

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await registerMutation.mutateAsync({
          name: value.name,
          email: value.email,
          password: value.password,
          ...(value.phone ? { phone: value.phone } : {}),
        });
        toast.success(res.message || "Verification OTP sent to your email");
        router.push(`/verify-email?email=${encodeURIComponent(value.email)}`);
      } catch (err) {
        toast.error(getErrorMessage(err, "Registration failed"));
      }
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Join Bongaon Bazar for faster checkout and order tracking.
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
          className="space-y-4"
        >
          <FormInput
            form={form}
            name="name"
            label="Full Name"
            placeholder="e.g. Rashedul Islam"
            autoComplete="name"
            disabled={registerMutation.isPending}
          />

          <FormInput
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={registerMutation.isPending}
          />

          <FormInput
            form={form}
            name="phone"
            label="Phone Number (Optional)"
            placeholder="01712345678"
            autoComplete="tel"
            disabled={registerMutation.isPending}
          />

          <FormInput
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Minimum 6 characters"
            autoComplete="new-password"
            disabled={registerMutation.isPending}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isSubmitting || registerMutation.isPending}
                loadingText="Creating account..."
              >
                Create Account
              </Button>
            )}
          </form.Subscribe>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
