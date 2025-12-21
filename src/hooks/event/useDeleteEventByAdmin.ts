 
import { privateApi } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query' 

export const useDeleteEventByAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await privateApi.delete(`/api/event/${id}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myEvents'] })
    },
  })
}
