import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters." }),
});

export const registerSchema = z.object({
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

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email address." }),
});

export const verifyEmailSchema = z.object({
  otp: z.string().length(6, { error: "Verification code must be 6 digits." }),
});

export const verifyResetOtpSchema = z.object({
  otp: z.string().length(6, { error: "Reset code must be 6 digits." }),
});

export const resetPasswordSchema = z
  .object({
    email: z.email({ error: "Please enter a valid email address." }),
    otp: z.string().length(6, { error: "Reset code must be 6 digits." }),
    password: z
      .string()
      .min(6, { error: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your new password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters." })
    .max(100),
  email: z.email({ error: "Invalid email address." }),
  phone: z.string().trim().max(30),
});

export const changePasswordSchema = z
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
