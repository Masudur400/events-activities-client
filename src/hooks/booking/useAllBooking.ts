import { privateApi } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query"; 

// hooks/booking/useAllBooking.ts
export const useGetAllBookings = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["all-bookings", page, limit],
    queryFn: async () => {
      const res = await privateApi.get(`/api/booking?page=${page}&limit=${limit}`);
      return res.data; // এটা { success: true, data: [...] } রিটার্ন করে
    },
  });
};