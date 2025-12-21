import { privateApi } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 

export const useCreateHost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => { 
      const res = await privateApi.post('/api/user/create-host', formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hosts'] });
    },
  });
};