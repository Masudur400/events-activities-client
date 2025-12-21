/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/event/useUpdateEvent.ts 
import { privateApi } from '@/lib/axios'
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

export const useUpdateEventByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateEventResponse, any, UpdateEventInput>({
    mutationFn: async ({ id, data }: UpdateEventInput) => { 
  const response = await privateApi.patch(`/api/event/${id}`, data); 
  return response.data;
},
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['events'] }); 
      queryClient.invalidateQueries({ queryKey: ['all-events'] });
      toast.success('Event updated successfully!');
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Update failed';
      toast.error(msg);
    }
  });
}