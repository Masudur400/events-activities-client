/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export type GetUserState = {
  success: boolean;
  user: any | null;
};

export const getUserInfo = async (): Promise<GetUserState> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value; 

    if (!accessToken) {
      return { success: false, user: null };
    } 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { success: false, user: null };
    }

    const result = await res.json();

    return {
      success: true,
      user: result.data,
    };
  } catch (error) {
    console.error("getUserInfo error:", error);
    return { success: false, user: null };
  }
};
