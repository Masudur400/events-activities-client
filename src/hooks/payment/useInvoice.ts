/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export const useDownloadInvoice = () => {
  return useMutation({
    mutationFn: async (paymentId: string) => {
      const res = await api.get(`/api/payment/invoice/${paymentId}`);
      return res.data; // এখানে data ফিল্ডে সরাসরি URL টা আসবে
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        // ফাইলটি ডাউনলোড বা ওপেন করার জন্য:
        const link = document.createElement("a");
        link.href = data.data; // cloudinary url
        link.setAttribute("download", "invoice.pdf"); // ডাউনলোডের নাম
        link.setAttribute("target", "_blank"); // নতুন ট্যাবে ওপেন
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.success("Invoice opening...");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to get invoice");
    },
  });
};