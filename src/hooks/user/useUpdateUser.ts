/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import api from '@/lib/axios'
import { IsActive } from '@/types/userTypes'

interface UpdateUserInput {
  id: string
  payload: {
    isActive?: IsActive
    isVerified?: boolean
    isDeleted?: string
  }
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<any, any, UpdateUserInput>({
    mutationFn: async ({ id, payload }) => {
      const res = await api.patch(`/api/user/${id}`, payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User updated successfully')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  })
}
