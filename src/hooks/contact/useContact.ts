/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { publicApi } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query'; 
import toast from 'react-hot-toast';

export const useContact = () => {
  return useMutation({
    mutationFn: async (contactData: { name: string; email: string; subject: string; message: string }) => {
      const { data } = await publicApi.post('/api/contact/send', contactData);
      return data;
    },
    onSuccess: () => {
      toast.success('Message sent successfully! We will get back to you soon.');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to send message';
      toast.error(message);
    },
  });
};