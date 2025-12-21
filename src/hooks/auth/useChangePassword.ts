/* eslint-disable @typescript-eslint/no-explicit-any */
import { privateApi } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query'; 
import toast from 'react-hot-toast';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await privateApi.post('/api/auth/change-password', data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password changed successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to change password');
    },
  });
};