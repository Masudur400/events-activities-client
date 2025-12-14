/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { loginUser } from '@/services/auth/login';
import { Eye, EyeOff } from 'lucide-react';
import { useActionState, useState } from 'react';

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState(false);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    }
    return null;
  };

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" name="email" type="email" placeholder="m@example.com" />
            {getFieldError('email') && 
            <FieldDescription className="text-red-600">{getFieldError('email')}
            </FieldDescription>
            }
          </Field>

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
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending} className='bg-linear-to-br from-yellow-500/30 via-yellow-600/70 to-yellow-500/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:shadow-lg hover:from-yellow-500/50 hover:via-yellow-600/90 hover:to-yellow-500/50'>
              {isPending ? 'Logging in...' : 'Login'}
              </Button>

            {getFieldError('form') && <FieldDescription className="text-red-600 text-center mt-2">{getFieldError('form')}</FieldDescription>}


            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-yellow-700/90 dark:text-yellow-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="/forgot-password"
                className="text-yellow-700/90 dark:text-yellow-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>

          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
