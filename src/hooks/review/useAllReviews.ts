import { publicApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"; 

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await publicApi.get("/api/review/all-reviews"); // আপনার রাউট পাথ অনুযায়ী
      return res.data?.data;
    },
  });
};