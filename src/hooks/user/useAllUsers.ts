/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { IsActive } from '@/types/userTypes'

export interface User {
  _id?: string
  name: string
  email: string
  bio?: string | null | undefined
  role: string
  phone?: string | null
  picture?: string
  address?: string | null
  isDeleted: boolean
  isActive?: IsActive
  isVerified: boolean
  createdAt: string
  updatedAt: string
} 

interface AllUsersResponse {
  success: boolean
  statusCode: number
  message: string
  data: User[]
  meta: {
    page: number       // current page
    limit: number      // items per page
    total: number      // total items
    totalPage: number  // total pages
  }
}


interface GetAllUsersParams {
  searchTerm?: string
  page?: number
  limit?: number
}

export const useAllUsers = (params: GetAllUsersParams) => {
  return useQuery<AllUsersResponse>({
    queryKey: ['all-users', params],
    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== undefined)
      ).toString()
      const res = await api.get(`/api/user/all-users?${query}`, { withCredentials: true })
      return res.data
    },
    staleTime: 60 * 1000,
  })
}
