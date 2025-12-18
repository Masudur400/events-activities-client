/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Search, RefreshCw, Eye, Calendar, Clock, Users, Tag, User, Mail, Phone, MapPin, Shield, Check, Star } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { TbCurrencyTaka } from "react-icons/tb";
import Image from 'next/image'
import { useAllEvents } from '@/hooks/event/useAllEvents'
import Avatar from 'react-avatar';

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
        email: string
        phone: string
        bio: string
        role: string
        address: string
        isActive: string
        isVerified: boolean
    }
}

const ExploreEventsTable: React.FC<MyEventsTableProps> = ({ eventTypes }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '')
    const [selectedType, setSelectedType] = useState(searchParams.get('eventType') || '')
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [showModal, setShowModal] = useState(false)

    const { data, isLoading, refetch, isFetching } = useAllEvents({
        searchTerm,
        eventType: selectedType,
        page,
        limit: 10,
    })

    const events: Event[] = data?.data || []
    const totalPages = data?.meta?.totalPage || 1
    const total = data?.meta
    const totalEvents = (total as any)?.total

    
    // ---------------- URL Update ---------------- 
useEffect(() => {
    const handler = setTimeout(() => {
        const params = new URLSearchParams() 
        if (searchTerm.trim()) {
            params.set('searchTerm', searchTerm)
        } 
        if (selectedType) {
            params.set('eventType', selectedType)
        } 
        if (page > 1) {
            params.set('page', page.toString())
        } 
        const queryString = params.toString()
        router.replace(queryString ? `?${queryString}` : window.location.pathname)
    }, 700)   
    return () => clearTimeout(handler)
}, [searchTerm, selectedType, page, router])  


    // ---------------- Handlers ----------------
    const handleFilterChange = () => setPage(1)

    const handleRefresh = async () => {
        setSearchTerm('')
        setSelectedType('')
        await refetch()
    }

    const openModal = (event: Event) => {
        setSelectedEvent(event)
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedEvent(null)
        setShowModal(false)
    }

    // ---------------- Render ----------------
    return (
        <div className="p-6 rounded-xl shadow-sm border border-gray-100 dark:border-yellow-700 w-full">

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="relative w-full md:w-1/2 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search events by title..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            handleFilterChange()
                        }}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all text-sm"
                    />
                </div>
                <div className="w-full md:w-auto flex items-center gap-3">
                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value)
                            handleFilterChange()
                        }}
                        className="border-2 bg-linear-to-r from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 font-medium rounded-lg lg:px-8 px-2 py-2 shadow-md hover:shadow-lg text-sm text-white dark:bg-gray-900"
                    >
                        <option value="" className='text-[12px] text-black dark:text-white'>All Events</option>
                        {eventTypes.map((type) => (
                            <option key={type} value={type} className='text-[12px] text-black dark:text-white dark:bg-gray-900'>{type}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleRefresh}
                        disabled={isFetching}
                        className="p-2.5 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95 disabled:opacity-50"
                        title="Refresh Data"
                    >
                        <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <p className='text-lg mb-4'>Total Events ({totalEvents})</p>

            {/* Table */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-900">
                            <th className="p-4 border-b font-semibold text-sm text-left">Image</th>
                            <th className="p-4 border-b font-semibold text-sm text-left">Event Name & Type</th>
                            <th className="p-4 border-b font-semibold text-sm text-left">Host</th>
                            <th className="p-4 border-b font-semibold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center p-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-400 text-sm">Fetching events...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : events.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center p-20 text-gray-400">No events found.</td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-900 transition-colors group">
                                    <td className="p-4">
                                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-sm">
                                            <Image src={event.image} alt={event.eventName} fill className="object-cover border-2" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="font-semibold line-clamp-1">{event.eventName}</p>
                                            <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 text-[10px] font-bold uppercase rounded-md w-fit tracking-wider">
                                                {event.eventType}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="">
                                                <Avatar
                                                    src={event?.hostId?.picture}
                                                    name={event?.hostId?.name}
                                                    size='40'
                                                    className='rounded-full'
                                                />
                                            </div>
                                            <span className="font-medium">{event.hostId.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => openModal(event)}
                                                className="p-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-5 gap-4">
                <p className="text-sm">
                    Showing page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
                </p>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        disabled={page <= 1 || isLoading}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 border rounded-md  dark:hover:bg-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        disabled={page >= totalPages || isLoading}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedEvent && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-100 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-md shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative animate-in zoom-in duration-300">

                        {/* Close */}
                        <button
                            className="absolute top-4 right-4 z-10 px-3 py-2 bg-gray-300 dark:bg-gray-900 dark:text-white hover:bg-white rounded-full shadow-md transition-all active:scale-90"
                            onClick={closeModal}
                        >
                            ✕
                        </button>

                        <div className="overflow-y-auto max-h-[90vh]">
                            {/* Event Image & Info */}
                            <div className="relative h-64 w-full">
                                <Image src={selectedEvent.image} alt={selectedEvent.eventName} fill className="object-cover rounded-t-md" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent rounded-t-3xl" />
                                <div className="absolute bottom-4 left-6 text-white">
                                    <span className="px-3 py-1 bg-yellow-500 rounded-md text-[10px] font-bold uppercase tracking-widest">
                                        {selectedEvent.eventType}
                                    </span>
                                    <h2 className="text-2xl font-bold">{selectedEvent.eventName}</h2>
                                </div>
                            </div>

                            {/* Event Stats */}
                            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    <Calendar className="w-5 h-5 text-yellow-500 dark:text-yellow-600" />
                                    <div>
                                        <p className="text-[10px] dark:text-white uppercase tracking-wider">Date</p>
                                        <p className="font-semibold dark:text-white">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    <Clock className="w-5 h-5 text-green-500" />
                                    <div>
                                        <p className="text-[10px] dark:text-white uppercase tracking-wider">Time</p>
                                        <p className="font-semibold dark:text-white">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    <TbCurrencyTaka className="w-5 h-5 text-blue-500" />
                                    <div>
                                        <p className="text-[10px] dark:text-white uppercase tracking-wider">Joining Fee</p>
                                        <p className="font-semibold dark:text-white flex gap-1 items-center">
                                            <TbCurrencyTaka />
                                            {selectedEvent.joiningFee}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    <Users className="w-5 h-5 text-purple-500" />
                                    <div>
                                        <p className="text-[10px] dark:text-white  tracking-wider">Participants- {selectedEvent.bookedParticipants}</p>
                                        <p className="text-[10px] dark:text-white   tracking-wider">Max Participant- {selectedEvent.maxParticipants}</p>
                                        <p className="text-[10px] dark:text-white   tracking-wider">Min Participant- {selectedEvent.minParticipants}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    <div>
                                        <p className="text-[10px] dark:text-white uppercase tracking-wider">Rating</p>
                                        <p className="font-semibold dark:text-white flex gap-2 items-center">
                                            {selectedEvent?.avgRating || 0} <Star className='w-4 h-4 text-yellow-500' />
                                            ({selectedEvent.totalReviews} reviews)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition">
                                    <Tag className="w-5 h-5 text-orange-500" />
                                    <div>
                                        <p className="text-[10px] dark:text-white uppercase tracking-wider">Status</p>
                                        <p className="font-semibold dark:text-white">{selectedEvent.status}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Event Description */}
                            <div className="mb-6 px-2">
                                <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                                    <Users className="w-4 h-4" /> About Event
                                </h4>
                                <p className="text-sm leading-relaxed">{selectedEvent.description}</p>
                            </div>

                            {/* Host Info */}
                            <div className="bg-gray-50 dark:bg-gray-800 dark:border-gray-950 rounded-2xl p-6 border border-gray-100 space-y-4">
                                <h4 className="text-xs font-bold dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <User className="w-3 h-3" /> Event Host
                                </h4>
                                <div className="flex items-start gap-4">
                                    {/* <Image src={selectedEvent.hostId.picture} alt={selectedEvent.hostId.name} width={60} height={60} className="rounded-full border-4 border-white shadow-md object-cover" /> */}
                                    <Avatar
                                        src={selectedEvent.hostId.picture}
                                        name={selectedEvent.hostId.name}
                                        size='60'
                                        className='rounded-full border'
                                    />
                                    <div className="flex-1 space-y-1">
                                        <h5 className="font-bold dark:text-whit">{selectedEvent.hostId.name}</h5>
                                        <p className="text-xs dark:text-whit italic">{selectedEvent.hostId.bio}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] dark:text-whit">
                                            <p className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedEvent.hostId.email}</p>
                                            <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedEvent.hostId.phone}</p>
                                            <p className="sm:col-span-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedEvent.hostId.address}</p>
                                            <p className="flex items-center gap-1"><Shield className="w-3 h-3" /> Role: {selectedEvent.hostId.role}</p>
                                            <p>Status: <span className='font-medium'>{selectedEvent.hostId.isActive}</span></p>
                                            <p className="flex items-center gap-1"><Check className="w-3 h-3" /> Verified: {selectedEvent.hostId.isVerified ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ExploreEventsTable
