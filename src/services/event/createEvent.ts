/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";

export interface CreateEventResponse {
  success: boolean;
  errors?: Record<string, string>;
}

export async function createEventServerAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return { success: false, errors: { general: 'yor are not authored. please login' } };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/event/create-event`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) { 
      if (result.errorSources) {
        const errorMap = Object.fromEntries(
          result.errorSources.map((err: any) => [err.path.split('.').pop(), err.message])
        );
        return { success: false, errors: errorMap };
      }
      return { success: false, errors: { general: result.message || 'invalid token' } };
    }

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: any) {
    return { success: false, errors: { general: 'connect with server' } };
  }
}