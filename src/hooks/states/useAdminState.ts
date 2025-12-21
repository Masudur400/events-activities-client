 import { privateApi } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query'; 

export const useAdminState = () => {
  return useQuery({
    queryKey: ['admin-state'],
    queryFn: async () => {
      const { data } = await privateApi.get('/api/state/super-admin');
      return data.data;
    },
  });
};