import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin/login" || pathname === "/admin/login/";
  const hasAccessTokenCookie = Boolean(request.cookies.get("sb-access-token")?.value);
  const hasRefreshTokenCookie = Boolean(request.cookies.get("sb-refresh-token")?.value);
  const hasAuthCookie = hasAccessTokenCookie || hasRefreshTokenCookie;

  console.log("[middleware][admin]", {
    pathname,
    isAdminLoginRoute,
    hasAuthCookie,
    redirecting: false,
    redirectTo: null
  });

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Hard-safe route: never redirect /admin/login from middleware.
  // Any uncertain auth state should be resolved by server-side admin checks.
  if (isAdminLoginRoute) {
    return NextResponse.next();
  }

  // For protected admin routes, only redirect when clearly unauthenticated.
  if (!hasAuthCookie) {
    const redirectTo = new URL("/admin/login", request.url);
    console.log("[middleware][admin]", {
      pathname,
      isAdminLoginRoute,
      hasAuthCookie,
      redirecting: true,
      redirectTo: redirectTo.toString()
    });
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
