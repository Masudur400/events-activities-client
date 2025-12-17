'use server'

export interface EventTypeResponse {
  success: boolean
  data?: string[]
  error?: string
}

export async function getEventTypes(): Promise<EventTypeResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/event/types`, {
      method: 'GET',
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.message || 'Failed to fetch event types' }
    }

    return { success: true, data: data.data || [] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('getEventTypes error:', err)
    return { success: false, error: err?.message || 'Something went wrong' }
  }
}
