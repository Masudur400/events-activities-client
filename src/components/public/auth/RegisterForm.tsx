/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { register } from "@/services/auth/register";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(register, null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const getFieldError = (fieldName: string) => {
    if (!state || !state.errors) return null;
    const error = state.errors.find(
      (err: any) => err.field === fieldName
    );
    return error ? error.message : null;
  };

  return (
    <form action={formAction}>
      <FieldGroup>
        <div>
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name" className="mt-2">
              Full Name
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
            {getFieldError("name") && (
              <FieldDescription className="text-red-600 mt-1">
                {getFieldError("name")}
              </FieldDescription>
            )}
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email" className="mt-2">
              Email
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
            />
            {getFieldError("email") && (
              <FieldDescription className="text-red-600 mt-1">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password" className="mt-2">
              Password
            </FieldLabel>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {getFieldError("password") && (
              <FieldDescription className="text-red-600 mt-1">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword" className="mt-2">
              Confirm Password
            </FieldLabel>

            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((p) => !p)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {getFieldError("confirmPassword") && (
              <FieldDescription className="text-red-600 mt-1">
                {getFieldError("confirmPassword")}
              </FieldDescription>
            )}
          </Field>
        </div>

        {/* Submit */}
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className="bg-linear-to-br from-yellow-500/30 via-yellow-600/70 to-yellow-500/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:shadow-lg hover:from-yellow-500/50 hover:via-yellow-600/90 hover:to-yellow-500/50">
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            {getFieldError("form") && (
              <FieldDescription className="text-red-600 mt-2 text-center">
                {getFieldError("form")}
              </FieldDescription>
            )}

            <FieldDescription className="px-6 text-center mt-2">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-700/90 dark:text-yellow-600 hover:underline"
              >
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
