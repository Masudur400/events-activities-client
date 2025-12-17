import api from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'

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
  totalPages: number
  totalItems: number
}

export interface MyEventsResponse {
  success: boolean
  statusCode: number
  message: string
  data: {
    meta: Meta
    data: Event[] // আসল অ্যারে এখানে
  }
}

interface GetMyEventsParams {
  searchTerm?: string
  eventType?: string
  page?: number
  limit?: number
}

export const useMyEvents = (params: GetMyEventsParams) => {
  return useQuery<MyEventsResponse>({
    queryKey: ['my-events', params],
    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== "" && v !== undefined)
      ).toString()

      const res = await api.get(`/api/event/my-events?${query}`, {
        withCredentials: true,
      })

      // ✅ টাইপ কাস্টিং
      return res.data as MyEventsResponse
    },
    staleTime: 60 * 1000,
  })
}
