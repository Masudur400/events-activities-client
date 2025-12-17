import api from '@/lib/axios'
import { useQuery } from '@tanstack/react-query' 

export const useEventTypes = () => {
  return useQuery({
    queryKey: ['event-types'],
    queryFn: async () => {
      const res = await api.get('/api/event/types')
      return res.data.data as string[]
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}
