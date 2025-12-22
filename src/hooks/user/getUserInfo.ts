import { privateApi } from "@/lib/axios";

export const getUserInfo = async () => {
  try {
    const res = await privateApi.get('/api/auth/me');
    return { user: res.data.data };
  } catch (error) {
    return { user: null }; // ✅ redirect না করে null
  }
};
