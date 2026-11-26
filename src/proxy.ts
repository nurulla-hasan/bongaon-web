import type { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  isAuthRoute,
  isPrivateRoute,
  isPublicRoute,
} from "@/constants/auth";
import { jwtUtils } from "@/lib/jwt";

const REFRESH_BEFORE_EXPIRY_SECONDS = 5 * 60;
const REFRESH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

interface RefreshedTokens {
  accessToken: string;
  refreshToken?: string;
}

function getBackendBaseUrl(): string {
  const backendOrigin = process.env.API_BACKEND_URL?.trim().replace(/\/+$/, "");
  if (backendOrigin) {
    return `${backendOrigin}/api/v1`;
  }

  const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (publicBase && /^https?:\/\//i.test(publicBase)) {
    return publicBase.replace(/\/+$/, "");
  }

  return "http://localhost:5000/api/v1";
}

function isTokenExpiringSoon(payload: JwtPayload | null): boolean {
  if (!payload?.exp) return false;
  const nowSeconds = Math.floor(Date.now() / 1000);
  return payload.exp - nowSeconds <= REFRESH_BEFORE_EXPIRY_SECONDS;
}

async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshedTokens | null> {
  try {
    const res = await fetch(`${getBackendBaseUrl()}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${REFRESH_COOKIE_NAME}=${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data?.accessToken ? json.data : null;
  } catch {
    return null;
  }
}

function createRouteResponse(
  request: NextRequest,
  session: JwtPayload | null,
): NextResponse {
  const { pathname, search } = request.nextUrl;

  if (isAuthRoute(pathname)) {
    return session
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  if (isPrivateRoute(pathname)) {
    if (!session) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

function applyRefreshedCookies(
  response: NextResponse,
  tokens: RefreshedTokens,
): void {
  const isProd = process.env.NODE_ENV === "production";
  const payload = jwtUtils.verifyToken(tokens.accessToken);
  const accessMaxAge = payload?.exp
    ? Math.max(payload.exp - Math.floor(Date.now() / 1000), 0)
    : undefined;

  response.cookies.set(ACCESS_COOKIE_NAME, tokens.accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
  });

  if (tokens.refreshToken) {
    response.cookies.set(REFRESH_COOKIE_NAME, tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_COOKIE_MAX_AGE_SECONDS,
    });
  }
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  // 1. Verify current access token if present
  let session = jwtUtils.verifyToken(accessToken);
  let refreshedTokens: RefreshedTokens | null = null;

  // 2. Silently refresh token if missing, invalid, or expiring soon
  if (refreshToken && (!session || isTokenExpiringSoon(session))) {
    refreshedTokens = await refreshAccessToken(refreshToken);
    if (refreshedTokens) {
      session = jwtUtils.verifyToken(refreshedTokens.accessToken);
    }
  }

  // 3. Handle auth, private, and public routes
  const response = createRouteResponse(request, session);

  // 4. Persist refreshed cookies if issued
  if (refreshedTokens) {
    applyRefreshedCookies(response, refreshedTokens);
  }

  return response;
}

export default proxy;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|images|.*\\..*).*)",
  ],
};
