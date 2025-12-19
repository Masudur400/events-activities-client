/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { Search, RefreshCw, Calendar, Clock, Users, Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TbCurrencyTaka } from "react-icons/tb"
import Image from 'next/image'
import { useAllEvents } from '@/hooks/event/useAllEvents'
import Avatar from 'react-avatar'
import Link from 'next/link'

interface MyEventsTableProps {
    eventTypes: string[]
}

interface Event {
    _id: string
    eventName: string
    description: string
    eventType: string
    date: string
    startTime: string
    avgRating: number
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
    }
}

const Events: React.FC<MyEventsTableProps> = ({ eventTypes }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '')
    const [selectedType, setSelectedType] = useState(searchParams.get('eventType') || '')
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

    const { data, isLoading, refetch, isFetching } = useAllEvents({
        searchTerm,
        eventType: selectedType,
        page,
        limit: 12,
    })

    const events: Event[] = data?.data || []
    const totalPages = data?.meta?.totalPage || 1


    // Smooth Scroll Effect 
    useEffect(() => {
        const scrollToTop = () => {
            try {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } catch (error) {
                window.scrollTo(0, 0);
            }
        };

        const timer = setTimeout(scrollToTop, 100);
        return () => clearTimeout(timer);
    }, [page]);



    const formatTime = (timeString: string) => {
        if (!timeString) return ''; 
        const [hours, minutes] = timeString.split(':'); 
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes)); 
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // ---------------- URL & Search Logic ----------------
    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams()
            if (searchTerm.trim()) params.set('searchTerm', searchTerm)
            if (selectedType) params.set('eventType', selectedType)
            if (page > 1) params.set('page', page.toString())
            router.replace(params.toString() ? `?${params.toString()}` : window.location.pathname)
        }, 300)
        return () => clearTimeout(handler)
    }, [searchTerm, selectedType, page, router])

    const handleRefresh = async () => {
        setSearchTerm('')
        setSelectedType('')
        setPage(1)
        router.replace(window.location.pathname)
        await refetch()
    }

    // ---------------- Sliding Pagination Logic ----------------
    const getPaginationRange = () => {
        const delta = 2 // active page er age-pore koyta thakbe
        const range = []
        const left = page - delta
        const right = page + delta

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                range.push(i)
            }
        }

        // 5 ta page fix rakhar logic (jodi totalPages >= 5 hoy)
        if (totalPages > 5 && range.length < 5) {
            if (page <= 3) return [1, 2, 3, 4, 5]
            if (page > totalPages - 3) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }
        return range
    }


    return (
        <div className="max-w-[1400px] mx-auto p-4 md:p-6 space-y-8">

            {/* --- Filter Section --- */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
                        className="w-full rounded-lg px-4 py-2.5 pl-10 border shadow text-sm"
                    />
                </div>

                <div className="flex w-full md:w-auto items-center gap-3">
                    <select
                        value={selectedType}
                        onChange={(e) => { setSelectedType(e.target.value); setPage(1) }}
                        className="flex-1 md:flex-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium rounded-lg px-4 py-2.5 text-sm shadow-xs outline-hidden cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className="p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* --- Event Cards Grid --- */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-80 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500">No events found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {events.map((event) => (
                        <Link
                            href={`/event/${event._id}`}
                            key={event._id}
                            className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.eventName}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-yellow-600">
                                    {event.eventType}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-1 gap-3">
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-yellow-600 transition-colors">
                                        {event.eventName}
                                    </h3>
                                    <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-md">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold">{event.avgRating || 0}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-yellow-500" />
                                        <span>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-yellow-500" />
                                        <span>
                                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-yellow-500" />
                                        <span>{event.bookedParticipants}/{event.maxParticipants} Joined</span>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            src={event.hostId.picture}
                                            name={event.hostId.name}
                                            size="24"
                                            className="rounded-full shadow-xs"
                                        />
                                        <span className="text-xs font-medium line-clamp-1">{event.hostId.name}</span>
                                    </div>
                                    <div className="flex items-center font-bold text-yellow-600">
                                        <TbCurrencyTaka className="w-5 h-5" />
                                        <span>{event.joiningFee === 0 ? "Free" : event.joiningFee}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* --- Custom Sliding Pagination --- */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <div className="flex items-center gap-1 bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xs">

                        {/* Previous Button */}
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1 px-2">
                            {getPaginationRange().map((p, idx, arr) => (
                                <div key={p} className="flex items-center">
                                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                                        <span className="px-2 text-gray-400">...</span>
                                    )}
                                    <button
                                        onClick={() => setPage(p)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === p
                                            ? 'px-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow   hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Events