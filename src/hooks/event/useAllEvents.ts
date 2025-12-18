/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/lib/axios'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

interface Event {
  _id: string
  eventName: string
  description: string
  eventType: string
  date: string
  avgRating: number
  startTime: string
  endTime: string
  image: string
  joiningFee: number
  minParticipants: number
  maxParticipants: number
  status: string
  totalReviews: number
  bookedParticipants: number
  hostId: {
    _id: string
    name: string
    picture: string
    email: string
    phone: string
    bio: string
    role: string
    address: string
    isActive: string
    isVerified: boolean
  }
}

interface Meta {
  page: number
  limit: number
  total: number
  totalPage: number
}

export interface AllEventsResponse {
  success: boolean
  statusCode: number
  message: string
  data: Event[]      // root-level array
  meta: Meta         // root-level meta
}


interface GetAllEventsParams {
  searchTerm?: string
  eventType?: string
  page?: number
  limit?: number
}

export const useAllEvents = (params: GetAllEventsParams) => {
  return useQuery<AllEventsResponse>({
    queryKey: ['all-events', params],

    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(params).filter(
          ([_, value]) => value !== '' && value !== undefined
        ) as [string, string][]
      ).toString()

      const res = await api.get(`/api/event/all-events?${query}`, {
        withCredentials: true,
      })

      return res.data
    },

     
    placeholderData: keepPreviousData,

    staleTime: 60 * 1000,
  })
}
