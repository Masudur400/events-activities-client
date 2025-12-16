/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth/login';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    }
    return null;
  };

   
  useEffect(() => {
  if (state && state.success) {
    toast.success('Login successful'); 
     
    const target = state.redirectTo; 
    if (target) router.replace(target);
  }

  if (state && !state.success && state.message) {
    toast.error(state.message);
  }
    if (state && state?.success && state?.redirectTo) {
      toast.success('login successful');
      router.replace(redirect || state?.redirectTo); 
    }
}, [state, router, redirect]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" />
          {
            getFieldError('email') &&
            <FieldDescription className="text-red-600">{getFieldError('email')}
            </FieldDescription>
          }
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} className="pr-10" />
            <button type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {
                showPassword ? <EyeOff size={18} /> : <Eye size={18} />
              }
            </button>
          </div>
          {
            getFieldError('password') &&
            <FieldDescription className="text-red-600">{getFieldError('password')}
            </FieldDescription>
          }
        </Field>

        <Field className="mt-4">
          <Button type="submit" disabled={isPending}
            className='bg-linear-to-br from-yellow-500/30 via-yellow-600/70 to-yellow-500/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:shadow-lg hover:from-yellow-500/50 hover:via-yellow-600/90 hover:to-yellow-500/50'>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>

          {
            getFieldError('form') &&
            <FieldDescription className="text-red-600 text-center mt-2">{getFieldError('form')}
            </FieldDescription>
          }

          <FieldDescription className="px-6 text-center">
            Don&apos;t have an account?
            <Link href="/register" className="text-yellow-700/90 hover:underline">
              Sign up
            </Link>
          </FieldDescription>
          <FieldDescription className="px-6 text-center">
            <Link href="/forget-password" className="text-yellow-700/90 hover:underline">
              Forgot password?
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
