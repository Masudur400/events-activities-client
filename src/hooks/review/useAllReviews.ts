import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await api.get("/api/review/all-reviews"); // আপনার রাউট পাথ অনুযায়ী
      return res.data?.data;
    },
  });
};