export type UserRole = "USER" | "SUPER_ADMIN" | "HOST";

// Route pattern config
export type RouteConfig = {
  exact: string[],
  patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forget-password"];
export const publicRoutes = ["/", "/home", "/about", "/event", "/service", "/contact"];

// ডাইনামিক পাবলিক রাউট চেক করার জন্য ফাংশন
export const isPublicRoute = (pathname: string): boolean => {
  // স্ট্যাটিক লিস্টে আছে কি না চেক
  if (publicRoutes.includes(pathname)) return true;

  // ডাইনামিক ইভেন্ট ডিটেইলস রাউট চেক (/event/id)
  const eventDetailPattern = /^\/event\/[a-zA-Z0-9_-]+$/;
  if (eventDetailPattern.test(pathname)) return true;

  return false;
};

// Routes accessible to any logged-in user (reset-password)
export const loggedInAllowedRoutes: RouteConfig = {
  exact: ["/reset-password"],
  patterns: [],
}

// Role-based protected routes
export const userProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard/], // /dashboard/* for USER
}

export const superAdminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/], // /admin/dashboard/*
}

export const hostProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/host/], // /host/dashboard/*
}

// Utility to check exact & pattern routes
export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
}

// export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
//   if (isRouteMatches(pathname, superAdminProtectedRoutes)) return "SUPER_ADMIN";
//   if (isRouteMatches(pathname, hostProtectedRoutes)) return "HOST";
//   if (isRouteMatches(pathname, userProtectedRoutes)) return "USER";
//   if (isRouteMatches(pathname, loggedInAllowedRoutes)) return "COMMON";
//   if (publicRoutes.includes(pathname)) return "COMMON";
//   return null;
// }

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
  if (isRouteMatches(pathname, superAdminProtectedRoutes)) return "SUPER_ADMIN";
  if (isRouteMatches(pathname, hostProtectedRoutes)) return "HOST";
  if (isRouteMatches(pathname, userProtectedRoutes)) return "USER";
  if (isRouteMatches(pathname, loggedInAllowedRoutes)) return "COMMON";
  
  // এখানে publicRoutes.includes এর বদলে নতুন ফাংশনটি দিয়েছি
  if (isPublicRoute(pathname)) return "COMMON"; 
  
  return null;
}


export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "USER") return "/dashboard";
  if (role === "SUPER_ADMIN") return "/admin/dashboard";
  if (role === "HOST") return "/host/dashboard";
  return "/";
}
