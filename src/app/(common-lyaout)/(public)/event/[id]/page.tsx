import { Metadata } from 'next'
import { notFound } from 'next/navigation'  
import { EventDetailsContent } from '@/components/public/event/EventDetailsContent'
import { getSingleEvent } from '@/services/event/getSingleEvent'
import { getUserInfo } from '@/services/auth/getUserInfo'

interface Props {
  params: Promise<{ id: string }>
}

// SEO-r jonno Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> { 
    const { id } = await params
    const response = await getSingleEvent(id)
    return { 
        title: response?.data?.eventName ? `${response.data.eventName} | Explore Events` : 'Event Details' 
    }
}

export default async function EventDetailsPage({ params }: Props) {
    const { user } = await getUserInfo(); 
    // Next.js 15+ standard: params await korte hoy
    const { id } = await params
    
    // Server action call kore data ana
    const response = await getSingleEvent(id)

    // Jodi data na thake ba success false hoy tobe 404 page dekhabe
    if (!response?.success || !response.data) {
        notFound()
    }

    // UI Component-e data pass kora holo
    return <EventDetailsContent event={response.data} user={user} />
}