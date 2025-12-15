/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

 
import { setCookie } from "./tokenHandlers" 

type FieldError = {
  field: string
  message: string
}

type RegisterState = {
  success?: boolean
  errors?: FieldError[]
}

export const register = async (
  _currentState: RegisterState | null,
  formData: FormData
): Promise<RegisterState> => {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    const errors: FieldError[] = []

    // Frontend validation
    if (!name?.trim()) errors.push({ field: "name", message: "Full name is required" })
    if (!email) errors.push({ field: "email", message: "Email is required" })
    if (!password || password.length < 6)
      errors.push({ field: "password", message: "Password must be at least 6 characters" })
    if (password !== confirmPassword)
      errors.push({ field: "confirmPassword", message: "Passwords do not match" })

    if (errors.length > 0) return { success: false, errors }

    // API call to create user using normal fetch
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",  
    })

    const result = await res.json()

    // Backend validation errors
    if (!res.ok && result?.errorSources) {
      const mappedErrors: FieldError[] = result.errorSources.map((err: any) => ({
        field: err.path,
        message: err.message,
      }))
      return { success: false, errors: mappedErrors }
    }

     
    if (result.data?.accessToken && result.data?.refreshToken) {
      const accessToken = result.data.accessToken
      const refreshToken = result.data.refreshToken

      // Access token cookie
      await setCookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "none",
      })

      // Refresh token cookie
      await setCookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 60, // 60 days
        path: "/",
        sameSite: "none",
      })
    }

    return { success: true }
  } catch (error: any) {
    console.log(error)
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
    }
  }
}
