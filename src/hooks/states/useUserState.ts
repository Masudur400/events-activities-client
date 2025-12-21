import { privateApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"; 

export const useGetUserState = () => {
  return useQuery({
    queryKey: ["user-state"],
    queryFn: async () => {
      const res = await privateApi.get("/api/state/user");
      return res.data?.data;
    },
  });
};