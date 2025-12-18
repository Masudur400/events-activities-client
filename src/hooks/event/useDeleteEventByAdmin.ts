import api from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query' 

export const useDeleteEventByAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/event/${id}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myEvents'] })
    },
  })
}
