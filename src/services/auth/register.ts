/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken"; // ✅ Import kora hoyeche
import { setCookie } from "./tokenHandlers";

type FieldError = {
  field: string;
  message: string;
};

// Role type export kora na thakle ekhane define kora jay ba login file theke import kora jay
export type UserRole = "USER" | "SUPER_ADMIN" | "HOST";

type RegisterState = {
  success?: boolean;
  errors?: FieldError[];
  message?: string;
  redirectTo?: string; // ✅ Redirect path add kora hoyeche
};

// Role wise route decide korar helper function
const getDashboardRoute = (role: UserRole) => {
  if (role === "SUPER_ADMIN") return "/admin/dashboard";
  if (role === "HOST") return "/host/dashboard";
  return "/";
};

export const register = async (
  _currentState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const errors: FieldError[] = [];

    // Frontend validation
    if (!name?.trim()) errors.push({ field: "name", message: "Full name is required" });
    if (!email) errors.push({ field: "email", message: "Email is required" });
    if (!password || password.length < 6)
      errors.push({ field: "password", message: "Password must be at least 6 characters" });
    if (password !== confirmPassword)
      errors.push({ field: "confirmPassword", message: "Passwords do not match" });

    if (errors.length > 0) return { success: false, errors };

    // API call
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    const result = await res.json();

    // Backend validation errors
    if (!res.ok) {
      if (result?.errorSources) {
        const mappedErrors: FieldError[] = result.errorSources.map((err: any) => ({
          field: err.path,
          message: err.message,
        }));
        return { success: false, errors: mappedErrors };
      }
      return { 
        success: false, 
        errors: [{ field: "form", message: result.message || "Registration failed" }] 
      };
    }

    let redirectTo = "/"; // Default redirect

    if (result.data?.accessToken && result.data?.refreshToken) {
      const accessToken = result.data.accessToken;
      const refreshToken = result.data.refreshToken;

      // ✅ Role decode kora (Login er moto)
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET as string
      ) as JwtPayload;

      const role = decoded.role as UserRole;
      redirectTo = getDashboardRoute(role); // Role base path set kora holo

      // Access token cookie
      await setCookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        path: "/",
        sameSite: "none",
      });

      // Refresh token cookie
      await setCookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 60,
        path: "/",
        sameSite: "none",
      });
    }

    return { 
      success: true, 
      redirectTo // ✅ Return e pathiye deya holo
    };
    
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      errors: [
        {
          field: "form",
          message:
            process.env.NODE_ENV === "development"
              ? error.message
              : "Something went wrong. Please try again.",
        },
      ],
    };
  }
};