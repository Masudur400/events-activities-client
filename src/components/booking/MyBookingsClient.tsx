'use client'
import { useGetMyBookings } from "@/hooks/booking/useMyBookings";
import { BookingTable } from "@/components/booking/BookingTable";
import { Loader2 } from "lucide-react";

export default function MyBookingsClient() {
    const { data, isLoading, isError } = useGetMyBookings();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-yellow-600" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fetching your bookings...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 bg-red-500/5 rounded-[2.5rem] border border-red-500/10">
                <p className="text-red-500 font-black uppercase tracking-widest text-xs">Failed to load bookings!</p>
            </div>
        );
    }

    const bookings = data?.data?.bookings || [];

    return (
        <>
            {bookings.length > 0 ? (
                <BookingTable bookings={bookings} />
            ) : (
                <div className="text-center py-32 bg-white dark:bg-[#0a0a0a] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
                    <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">No bookings found yet</p>
                </div>
            )}
        </>
    );
}