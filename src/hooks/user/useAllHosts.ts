import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import api from '@/lib/axios'
import { IUser } from '@/types/userTypes'

interface GetHostsParams {
  searchTerm?: string
  page?: number
  limit?: number
}

interface HostResponse {
  success: boolean
  data: IUser[]
  meta: {
    page: number
    limit: number
    total: number
    totalPage: number
  }
}

export const useAllHosts = ({ searchTerm = '', page = 1, limit = 10 }: GetHostsParams) => {
  return useQuery<HostResponse, Error>({
    queryKey: ['hosts', searchTerm, page, limit],
    queryFn: async () => {
      const res = await api.get<HostResponse>('/api/user/all-hosts', {
        params: { searchTerm, page, limit },
      })
      return res.data
    },
    keepPreviousData: true,  
  } as UseQueryOptions<HostResponse, Error>)  
}
