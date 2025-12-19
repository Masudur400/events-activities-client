/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

export async function getSingleEvent(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/event/${id}`, {
      method: 'GET',
      cache: 'no-store', // Always fresh data fetch korbe
    })

    const data = await res.json()

    if (!res.ok) {
      return { success: false, error: data.message || 'Failed to fetch event' }
    }

    return { success: true, data: data.data }
  } catch (err: any) {
    console.error('getSingleEvent error:', err)
    return { success: false, error: err?.message || 'Something went wrong' }
  }
}