/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/services/auth/forgot-password";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function ForgotPasswordPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(forgotPassword, null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Password reset successful");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    }
  }, [state, router]);

  const getError = (field: string) =>
    state?.errors?.find((e: any) => e.field === field)?.message;

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input name="email" type="email" placeholder="your@email.com" />
          {getError("email") && <FieldDescription className="text-red-500">{getError("email")}</FieldDescription>}
        </Field>

        <Field>
          <FieldLabel>New Password</FieldLabel>
          <div className="relative">
            <Input name="password" type={showPass ? "text" : "password"} className="pr-10" placeholder="New password" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {getError("password") && <FieldDescription className="text-red-500">{getError("password")}</FieldDescription>}
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <div className="relative">
            <Input name="confirmPassword" type={showConfirm ? "text" : "password"} className="pr-10" placeholder="Confirm password" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {getError("confirmPassword") && <FieldDescription className="text-red-500">{getError("confirmPassword")}</FieldDescription>}
        </Field>

        <Button type="submit" disabled={isPending} className=" w-full bg-linear-to-br from-yellow-500/30 via-yellow-600/70 to-yellow-500/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:shadow-lg hover:from-yellow-500/50 hover:via-yellow-600/90 hover:to-yellow-500/50">
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>

        {getError("form") && <FieldDescription className="text-red-500 text-center mt-3">{getError("form")}</FieldDescription>}

        <p className="text-center mb-2 text-gray-600 dark:text-gray-400">
          Remembered your password?{" "}
          <a href="/login" className="text-yellow-600 hover:underline">Login</a>
        </p>
      </FieldGroup>
    </form>

  );
}
