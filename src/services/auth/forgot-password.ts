/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

type FieldError = { field: string; message: string };

export async function forgotPassword(_prev: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirmPassword") as string;

  const errors: FieldError[] = [];

  if (!email) errors.push({ field: "email", message: "Email required" });
  if (!password) errors.push({ field: "password", message: "Password required" });
  if (password !== confirm)
    errors.push({ field: "confirmPassword", message: "Password mismatch" });

  if (errors.length) return { errors };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/forget-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword: password }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message?.toLowerCase().includes("email")) {
      return { errors: [{ field: "email", message: data.message }] };
    }
    return { errors: [{ field: "form", message: data.message }] };
  }

  // ✅ Server side cannot call toast
  return { success: true, message: "Password reset successful" };
}
