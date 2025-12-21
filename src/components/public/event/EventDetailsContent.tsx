/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, Star, ArrowLeft, Share2, ShieldCheck } from 'lucide-react'
import { TbCurrencyTaka } from "react-icons/tb"
import Avatar from 'react-avatar'
import Link from 'next/link'
import { useCreateReview, useGetReviews } from '@/hooks/review/useReviews'
import { ReviewModal } from '@/components/review/ReviewModal'
import toast from 'react-hot-toast'
import { IUser, Role } from '@/types/userTypes'
import { useMutation } from '@tanstack/react-query'
import { privateApi } from '@/lib/axios'
import { BookingModal } from '@/components/booking/BookingModal'

export const EventDetailsContent = ({ event, user }: { event: any, user: IUser }) => {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);


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


    const { data: response, isLoading: reviewsLoading } = useGetReviews(event?._id);
    const { mutate: submitReview, isPending: isSubmitting } = useCreateReview(event?._id);

    const reviews = response?.data || [];
    const progress = event.maxParticipants > 0 ? (event.bookedParticipants / event.maxParticipants) * 100 : 0;

    const handleReviewSubmit = (reviewData: any) => {
        submitReview({ ...reviewData, eventId: event._id }, {
            onSuccess: () => setIsReviewModalOpen(false)
        });
    };


    const { mutate: handleBooking, isPending: isBookingLoading } = useMutation({
        mutationFn: async (payload: { event: string; guestCount: number }) => {
            const res = await privateApi.post('/api/booking', payload);
            return res.data;
        },
        onSuccess: (res) => {
            if (res.success && res.data.paymentUrl) {
                toast.success("Redirecting to payment gateway...");
                window.location.href = res.data.paymentUrl;
            }
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Something went wrong during booking!");
        }
    });

    const onBookingSubmit = (guestCount: number) => {
        handleBooking({
            event: event._id,
            guestCount: guestCount
        });
    };

    const handleJoinClick = () => {
        if (!user) {
            return toast.error("Please login to join!");
        }
        if (user.role === Role.HOST) {
            return toast.error("Hosts cannot join as a participant!");
        }
        if (user.role === Role.SUPER_ADMIN || user.role === Role.ADMIN) {
            return toast.error("Admins cannot join this event!");
        }
        if (user.role === Role.USER) {
            setIsBookingModalOpen(true);
        }
    };


    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] pb-20">
            {/* Rating modal */}
            {isReviewModalOpen && (
                <ReviewModal onClose={() => setIsReviewModalOpen(false)} onSubmit={handleReviewSubmit} isLoading={isSubmitting} />
            )}

            
            {isBookingModalOpen && (
                <BookingModal
                    event={event}
                    onClose={() => setIsBookingModalOpen(false)}
                    onSubmit={onBookingSubmit}
                    isLoading={isBookingLoading}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link href="/event" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-yellow-600 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to All Events
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative h-[300px] md:h-[550px] w-full rounded-lg overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                            <Image src={event.image} alt={event.eventName} fill className="object-cover" priority />
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                            <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white mb-10 italic">{event.eventName}</h1>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-y border-gray-100 dark:border-gray-800">
                                <InfoBlock label="Date" value={new Date(event.date).toLocaleDateString()} icon={<Calendar className="w-5 h-5 text-yellow-500" />} />
                                <InfoBlock label="Time" value={formatTime(event.startTime)} icon={<Clock className="w-5 h-5 text-yellow-500" />} />
                                <InfoBlock label="Rating" value={`${event.avgRating || 0} (${reviews.length})`} icon={<Star className="w-5 h-5 text-yellow-500 fill-current" />} />
                                <InfoBlock label="Fee" value={event.joiningFee === 0 ? "Free" : event.joiningFee} icon={<TbCurrencyTaka className="w-7 h-7 text-green-500" />} isPrice />
                            </div>

                            <div className="mt-12 mb-20">
                                <h2 className="text-xl md:text-3xl font-bold mb-6 flex items-center gap-3"><span className="w-8 h-1 bg-yellow-500 rounded-full" />About the Event</h2>
                                <p className="text-gray-600 dark:text-gray-400 leading-[1.8] text-lg font-medium whitespace-pre-line">{event.description}</p>
                            </div>

                            <div className="pt-12 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-2xl font-black italic flex items-center gap-3">
                                        <span className="w-8 h-1 bg-yellow-500 rounded-full" /> Community Reviews
                                    </h2>
                                    <button onClick={() => user ? setIsReviewModalOpen(true) : toast.error("Please login first!")} className="px-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                                        Give Review
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {reviewsLoading ? (
                                        <p className="animate-pulse text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center py-10">Loading Reviews...</p>
                                    ) : reviews.length > 0 ? reviews.map((rev: any) => (
                                        <div key={rev._id} className="bg-gray-50/50 dark:bg-gray-800/20 p-6 rounded-3xl border border-transparent hover:border-yellow-500/10 transition-all">
                                            <div className="flex items-center gap-4">
                                                <Avatar src={rev.userId?.picture} name={rev.userId?.name} size="45" className="rounded-full" />
                                                <div>
                                                    <h4 className="font-black text-gray-900 dark:text-white uppercase text-[11px] tracking-wider">{rev.userId?.name}</h4>
                                                    <div className="flex gap-0.5 text-yellow-500 mt-1">
                                                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-gray-300'}`} />)}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-[60px] italic font-medium font-sans">"{rev.comment}"</p>
                                        </div>
                                    )) : <p className="text-center py-10 text-gray-400 uppercase text-[10px] font-black tracking-widest border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl">No reviews yet.</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
                            <div className="relative mb-6">
                                <Avatar src={event.hostId?.picture} name={event.hostId?.name} size="100" className="rounded-4xl shadow-2xl" />
                                <div className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-full border-4 border-white dark:border-gray-900">
                                    <ShieldCheck className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{event.hostId?.name}</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1 mb-8">Official Organizer</p>
                            <Link href='/contact' className='w-full'>
                                <button className="w-full lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50">
                                    Send Message
                                </button>
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-100 dark:border-gray-800 shadow-2xl sticky top-8">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Capacity</p>
                                    <p className="text-3xl font-black text-gray-900 dark:text-white">{event.maxParticipants}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Joined</p>
                                    <p className="text-3xl font-black text-yellow-600">{event.bookedParticipants}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-1">
                                    <div className="h-full bg-yellow-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(234,179,8,0.5)]" style={{ width: `${progress}%` }} />
                                </div>
                                <div className="space-y-3">
                                    <button
                                        onClick={handleJoinClick}
                                        className="w-full lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
                                    >
                                        Join This Event
                                    </button>

                                    <button className="w-full flex items-center justify-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-yellow-600 transition-colors">
                                        <Share2 className="w-4 h-4" /> Share with circle
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

const InfoBlock = ({ label, value, icon, isPrice }: any) => (
    <div className="flex flex-col gap-3">
        <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
        <div className="flex items-center gap-3 font-black text-gray-800 dark:text-gray-200">
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">{icon}</div>
            <span className={isPrice ? "text-2xl text-yellow-600" : "text-sm uppercase tracking-tight"}>{value}</span>
        </div>
    </div>
)