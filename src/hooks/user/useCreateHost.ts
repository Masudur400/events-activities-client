import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useCreateHost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => { 
      const res = await api.post('/api/user/create-host', formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hosts'] });
    },
  });
};