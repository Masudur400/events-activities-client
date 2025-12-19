/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import Avatar from 'react-avatar' 
import { useGetAllBookings } from '@/hooks/booking/useAllBooking'

const ManageBookingTable = () => {
    const [page, setPage] = useState(1)
    const limit = 10;
    const { data: response, isLoading, refetch, isFetching } = useGetAllBookings(page, limit);
    
    const bookings = response?.data || [] 
    const hasMore = bookings.length === limit;

    return (
        <div className="p-6 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            
            {/* Header with Refresh */}
            <div className=" mb-3">
                 
                <button
                    onClick={() => refetch()}
                    className="p-2 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all active:scale-95"
                >
                    <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                            <th className="p-4 border-b font-black text-[10px] uppercase tracking-widest text-gray-400">User</th>
                            <th className="p-4 border-b font-black text-[10px] uppercase tracking-widest text-gray-400">Event Name</th>
                            <th className="p-4 border-b font-black text-[10px] uppercase tracking-widest text-gray-400">Status</th>
                            <th className="p-4 border-b font-black text-[10px] uppercase tracking-widest text-gray-400">Guest</th>
                            <th className="p-4 border-b font-black text-[10px] uppercase tracking-widest text-gray-400">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-900">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-xs font-bold uppercase tracking-widest text-gray-400">Loading...</td>
                            </tr>
                        ) : bookings.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-10 text-center text-xs font-bold uppercase tracking-widest text-gray-400">No data found</td>
                            </tr>
                        ) : (
                            bookings.map((booking: any) => (
                                <tr key={booking._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Avatar name={booking.user?.name} size="30" className="rounded-full" />
                                            <div>
                                                <p className="text-[11px] font-black uppercase">{booking.user?.name}</p>
                                                <p className="text-[10px] text-gray-500">{booking.user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="  font-medium text-gray-700 dark:text-gray-300 tracking-tighter">
                                            {booking.event?.eventName || "N/A"}
                                        </p>
                                        <p className=" text-[10px] font-medium uppercase text-gray-500  tracking-tighter my-2 px-3 py-1 rounded-lg bg-yellow-100 w-fit">
                                            {booking.event?.eventType || "N/A"}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                                            booking.status === 'COMPLETE' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-[11px] font-bold">{booking.guestCount}</td>
                                    <td className="p-4 text-[11px] font-black uppercase">৳{" "}{booking.payment?.amount || 0}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* Pagination Logic Fix */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-[10px] font-black uppercase text-gray-400">
                    Current Page: {page}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={!hasMore} // যদি বর্তমান পেজে ১০টার কম ডেটা থাকে, তাহলে নেক্সট অফ
                        className="p-2 border rounded-lg disabled:opacity-30 hover:bg-gray-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManageBookingTable