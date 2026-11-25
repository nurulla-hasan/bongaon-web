export const ACCESS_COOKIE_NAME = "accessToken";
export const REFRESH_COOKIE_NAME = "refreshToken";

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/verify-email",
  "/forgot-password",
  "/verify-reset-otp",
  "/reset-password",
] as const;

export const PRIVATE_ROUTES = [
  "/profile",
  "/account",
  "/my-orders",
] as const;

export const PUBLIC_ROUTES = [
  "/",
  "/auth/success",
  "/products",
  "/cart",
  "/checkout",
  "/order-success",
  "/orders",
  "/about",
  "/contact",
] as const;

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isPrivateRoute(pathname: string): boolean {
  return PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isPublicRoute(pathname: string): boolean {
  if (pathname === "/") return true;
  return PUBLIC_ROUTES.some(
    (route) => route !== "/" && (pathname === route || pathname.startsWith(`${route}/`)),
  );
}
