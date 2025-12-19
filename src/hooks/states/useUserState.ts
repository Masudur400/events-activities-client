import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useGetUserState = () => {
  return useQuery({
    queryKey: ["user-state"],
    queryFn: async () => {
      const res = await api.get("/api/state/user");
      return res.data?.data;
    },
  });
};