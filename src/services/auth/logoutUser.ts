"use server";

import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandlers";

export const logoutUser = async (redirectPath?: string) => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");

  const loginUrl = redirectPath
    ? `/login?loggedOut=true&redirect=${encodeURIComponent(redirectPath)}`
    : "/login?loggedOut=true";

  redirect(loginUrl);
};
