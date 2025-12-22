import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookie } from "@/services/auth/tokenHandlers";
import { authRoutes, getDefaultDashboardRoute, getRouteOwner, UserRole,isPublicRoute } from "./lib/route-utils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1️⃣ Public pages: anyone can access
  // if (publicRoutes.includes(pathname)) {
  //   return NextResponse.next(); 
  // }
  if (isPublicRoute(pathname)) {
  return NextResponse.next();
}

  // 2️⃣ Auth routes (login/register/forgot-password)
  if (authRoutes.includes(pathname)) {
    const accessToken = await getCookie("accessToken") || null;
    if (accessToken) {
      try {
        const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_SECRET as string) as JwtPayload;
        const role = verifiedToken.role as UserRole;
        // Logged-in user trying to access auth pages -> redirect to dashboard
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(role), request.url));
      } catch {
        // Invalid token -> allow to access auth page
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  // 3️⃣ Get access token for protected pages
  const accessToken = await getCookie("accessToken") || null;
  if (!accessToken) {
    // Not logged-in -> redirect to login with redirect param
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  let userRole: UserRole | null = null;
  try {
    const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_SECRET as string) as JwtPayload;
    userRole = verifiedToken.role as UserRole;
  } catch {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4️⃣ Allow logged-in users to access /reset-password or other "common" routes
  const routeOwner = getRouteOwner(pathname);
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // 5️⃣ Role-based access
  if (routeOwner && routeOwner !== userRole) {
    // Logged-in user trying to access a route not allowed for their role
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
  }

  // 6️⃣ Allowed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
