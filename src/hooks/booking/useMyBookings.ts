import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useGetMyBookings = (page = 1, limit = 10) => {
    return useQuery({
        queryKey: ["my-bookings", page, limit],
        queryFn: async () => {
            const res = await api.get(`/api/booking/my-bookings?page=${page}&limit=${limit}`);
            return res.data;
        },
    });
};