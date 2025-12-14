/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { setCookie } from "./tokenHandlers";

type FieldError = {
    field: string;
    message: string;
};

type LoginState = {
    success?: boolean;
    errors?: FieldError[];
};

export const loginUser = async (_currentState: any, formData: FormData): Promise<LoginState> => {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const errors: FieldError[] = [];

        // Frontend validation
        if (!email?.trim()) errors.push({ field: "email", message: "Email is required" });
        if (!password?.trim()) errors.push({ field: "password", message: "Password is required" });

        if (errors.length > 0) return { success: false, errors };

        // API call to backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include", // cookies handle করার জন্য
        });

        // রেসপন্স বডি parse করা হলো
        const result = await res.json();
        console.log(result);

        if (!res.ok) {
            return {
                success: false,
                errors: [{ field: "form", message: result.message || "Login failed" }],
            };
        }

        // 🔴 মূল পরিবর্তন: টোকেনগুলি `result.data` থেকে অ্যাক্সেস করা হচ্ছে
        const accessToken = result.data?.accessToken;
        const refreshToken = result.data?.refreshToken;

        // ✅ Success, টোকেনগুলি `result.data` এর মধ্যে থাকলে সেট করা হবে
        if (accessToken && refreshToken) {
            await setCookie("accessToken", accessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
                sameSite: "strict",
            });

            await setCookie("refreshToken", refreshToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 60, // 60 days
                path: "/",
                sameSite: "strict",
            });
        }

        return { success: true };
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
                            : "Login failed. Please try again.",
                },
            ],
        };
    }
};