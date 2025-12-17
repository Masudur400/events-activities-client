/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/event/useUpdateEvent.ts
import api from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query' 
import toast from 'react-hot-toast'

interface UpdateEventResponse {
  success: boolean
  errors?: Record<string, string>
  data?: any
}

interface UpdateEventInput {
  id: string
  data: FormData
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateEventResponse, any, UpdateEventInput>({
    mutationFn: async ({ id, data }: UpdateEventInput) => {
  // নিশ্চিত করুন যে শুরুতে /api আছে
  const response = await api.patch(`/api/event/my-event/${id}`, data); 
  return response.data;
},
    onSuccess: () => {
      // আপনার ইভেন্ট লিস্টের যে কুয়েরি কী (Query Key) আছে সেটি এখানে দিন
      queryClient.invalidateQueries({ queryKey: ['events'] }); 
      queryClient.invalidateQueries({ queryKey: ['my-events'] });
      toast.success('Event updated successfully!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Update failed';
      toast.error(msg);
    }
  });
}