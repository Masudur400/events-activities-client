/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { privateApi } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';  
import toast from 'react-hot-toast';

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await privateApi.delete(`/api/review/${reviewId}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Review deleted successfully'); 
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete review';
      toast.error(message);
    },
  });
};