// hooks/state/useHostState.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useHostState = () => {
  return useQuery({
    queryKey: ["host-state"],
    queryFn: async () => {
      const res = await api.get("/api/state/host");  
      return res.data.data;
    },
  });
};