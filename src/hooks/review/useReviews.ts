/* eslint-disable @typescript-eslint/no-explicit-any */
import { privateApi, publicApi } from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; 
import toast from 'react-hot-toast';

// ১. ইভেন্ট আইডি দিয়ে রিভিউ নিয়ে আসার হুক
export const useGetReviews = (eventId: string) => {
  return useQuery({
    queryKey: ['reviews', eventId],
    queryFn: async () => {
      const res = await publicApi.get(`/api/review/${eventId}?limit=10`);
      return res.data;
    },
    enabled: !!eventId, // ইভেন্ট আইডি থাকলে তবেই কল হবে
  });
};

// ২. নতুন রিভিউ তৈরি করার হুক
export const useCreateReview = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { rating: number; comment: string; eventId: string }) => {
      const res = await privateApi.post('/api/review/create-review', payload);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Review submitted");
        // রিভিউ লিস্টটা রিফ্রেশ করার জন্য ইনভ্যালিডেট করা
        queryClient.invalidateQueries({ queryKey: ['reviews', eventId] });
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    }
  });
};