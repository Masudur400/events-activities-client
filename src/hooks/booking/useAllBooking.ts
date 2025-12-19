import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

// hooks/booking/useAllBooking.ts
export const useGetAllBookings = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["all-bookings", page, limit],
    queryFn: async () => {
      const res = await api.get(`/api/booking?page=${page}&limit=${limit}`);
      return res.data; // এটা { success: true, data: [...] } রিটার্ন করে
    },
  });
};