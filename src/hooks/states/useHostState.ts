// hooks/state/useHostState.ts
import { privateApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"; 

export const useHostState = () => {
  return useQuery({
    queryKey: ["host-state"],
    queryFn: async () => {
      const res = await privateApi.get("/api/state/host");  
      return res.data.data;
    },
  });
};