import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  AuthUser,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  ResetPasswordPayload,
  UpdateMePayload,
  VerifyEmailPayload,
  VerifyResetOtpPayload,
} from "@/types";

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient<ApiResponse<AuthUser>>("/auth/register", {
      method: "POST",
      body: payload,
    }),

  verifyEmail: (payload: VerifyEmailPayload) =>
    apiClient<ApiResponse<null>>("/auth/verify-email", {
      method: "POST",
      body: payload,
    }),

  resendOtp: (payload: ForgotPasswordPayload) =>
    apiClient<ApiResponse<null>>("/auth/resend-otp", {
      method: "POST",
      body: payload,
    }),

  login: (payload: LoginPayload) =>
    apiClient<ApiResponse<LoginResponse>>("/auth/login", {
      method: "POST",
      body: payload,
    }),

  logout: () =>
    apiClient<ApiResponse<null>>("/auth/logout", {
      method: "POST",
    }),

  getMe: () => apiClient<ApiResponse<{ user: AuthUser }>>("/auth/me"),

  updateMe: (payload: UpdateMePayload) =>
    apiClient<ApiResponse<{ user: AuthUser }>>("/auth/me", {
      method: "PATCH",
      body: payload,
    }),

  changePassword: (payload: ChangePasswordPayload) =>
    apiClient<ApiResponse<null>>("/auth/change-password", {
      method: "POST",
      body: payload,
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiClient<ApiResponse<null>>("/auth/forgot-password", {
      method: "POST",
      body: payload,
    }),

  resendResetOtp: (payload: ForgotPasswordPayload) =>
    apiClient<ApiResponse<null>>("/auth/resend-reset-otp", {
      method: "POST",
      body: payload,
    }),

  verifyResetOtp: (payload: VerifyResetOtpPayload) =>
    apiClient<ApiResponse<null>>("/auth/verify-reset-otp", {
      method: "POST",
      body: payload,
    }),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient<ApiResponse<null>>("/auth/reset-password", {
      method: "POST",
      body: payload,
    }),
};
