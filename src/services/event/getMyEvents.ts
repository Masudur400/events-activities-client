/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { cookies } from 'next/headers';

export const getMyEvents = async (params: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== undefined)
    );

    const query = new URLSearchParams(filteredParams as Record<string, string>).toString();
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/event/my-events?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });

    const data = await response.json();

    // যদি সার্ভার থেকে success: false আসে বা অন্য কোনো এরর হয়
    if (!response.ok) {
      return { 
        success: false, 
        error: data?.message || data?.error || 'Something went wrong on the server' 
      };
    }

    return data; // এটি সাধারণত { success: true, data: {...}, meta: {...} } রিটার্ন করবে
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error occurred' };
  }
}