/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./tokenHandlers";

type FieldError = {
  field: string;
  message: string;
};

export type UserRole = "USER" | "SUPER_ADMIN" | "HOST";

export type LoginState = {
  success?: boolean;
  errors?: FieldError[];
  message?: string;
  redirectTo?: string; // ✅ role based redirect path
};

const getDashboardRoute = (role: UserRole) => {
  if (role === "SUPER_ADMIN") return "/admin/dashboard";
  if (role === "HOST") return "/host/dashboard";
  // return "/dashboard";
  return "/";
};

export const loginUser = async (
  _currentState: any,
  formData: FormData
): Promise<LoginState> => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const errors: FieldError[] = [];
    if (!email?.trim()) errors.push({ field: "email", message: "Email is required" });
    if (!password?.trim()) errors.push({ field: "password", message: "Password is required" });

    if (errors.length > 0) {
      return { success: false, errors, message: "Validation failed" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        errors: [{ field: "form", message: result.message || "Login failed" }],
        message: result.message || "Login failed",
      };
    }

    const accessToken = result.data?.accessToken;
    const refreshToken = result.data?.refreshToken;

    if (!accessToken || !refreshToken) {
      return { success: false, message: "Invalid token response" };
    }

    // ✅ Decode role from access token
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET as string
    ) as JwtPayload;

    const role = decoded.role as UserRole;

    await setCookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "none",
    });

    await setCookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
      path: "/",
      sameSite: "none",
    });

    return {
      success: true,
      message: "Login successful",
      redirectTo: getDashboardRoute(role), // ✅ role based route
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login failed. Please try again.",
    };
  }
};
