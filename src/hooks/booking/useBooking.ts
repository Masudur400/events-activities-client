/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios"; 
import toast from "react-hot-toast";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (payload: { event: string; guestCount: number }) => {
      // এখানে পেলোডে ইভেন্ট আইডি এবং গেস্ট কাউন্ট যাচ্ছে
      const response = await api.post("/booking", payload); 
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data.paymentUrl) {
        toast.success("Redirecting to payment...");
        window.location.href = data.data.paymentUrl;
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Booking failed!");
    },
  });
};