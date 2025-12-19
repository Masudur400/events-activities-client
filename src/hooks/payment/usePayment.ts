/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export const useInitPayment = () => {
  return useMutation({
    mutationFn: async (bookingId: string) => {
      // তোমার এন্ডপয়েন্ট অনুযায়ী POST রিকোয়েস্ট
      const res = await api.post(`/api/payment/init-payment/${bookingId}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data.paymentUrl) {
        toast.success("Redirecting to SSLCommerz...");
        // সরাসরি পেমেন্ট গেটওয়েতে রিডাইরেক্ট
        window.location.href = data.data.paymentUrl;
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Payment initialization failed!");
    },
  });
};