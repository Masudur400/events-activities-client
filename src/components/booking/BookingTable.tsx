/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CheckCircle2, Clock, XCircle, Download, CreditCard, Calendar, Users, Loader2 } from 'lucide-react';
import { useInitPayment } from '@/hooks/payment/usePayment';
import { useDownloadInvoice } from '@/hooks/payment/useInvoice';  

export const BookingTable = ({ bookings }: { bookings: any[] }) => { 
    const { 
        mutate: handlePayment, 
        isPending: isPaymentPending, 
        variables: activePaymentId 
    } = useInitPayment();

    // ইনভয়েস মিউটেশন হুক
    const { 
        mutate: handleInvoice, 
        isPending: isInvoicePending, 
        variables: activeInvoiceId 
    } = useDownloadInvoice();

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                        <th className="p-5 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Event Info</th>
                        <th className="p-5 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Guests & Date</th>
                        <th className="p-5 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Payment</th>
                        <th className="p-5 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                        <th className="p-5 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {bookings.map((booking) => {
                        // আলাদাভাবে চেক করা হচ্ছে কোন রো-তে লোডিং দেখাবে
                        const isPayLoading = isPaymentPending && activePaymentId === booking._id;
                        const isInvLoading = isInvoicePending && activeInvoiceId === booking.payment?._id;

                        return (
                            <tr key={booking._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-all group">
                                <td className="p-5">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-yellow-600 transition-colors">
                                            {booking.event.eventName}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 italic tracking-tighter">
                                            {booking.event.eventType}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            <Calendar className="w-3.5 h-3.5 text-yellow-600" />
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                            <Users className="w-3.5 h-3.5 text-yellow-600" />
                                            {booking.guestCount} Guests
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex flex-col">
                                        <span className="font-black text-gray-900 dark:text-white text-sm">৳{booking.payment?.amount}</span>
                                        <span className="text-[9px] font-mono text-gray-500">{booking.payment?.transactionId}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <StatusBadge status={booking.status} />
                                </td>
                                <td className="p-5 text-right">
                                    {booking.status === "COMPLETE" ? (
                                        <button 
                                            onClick={() => handleInvoice(booking.payment?._id)}
                                            disabled={isInvoicePending}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                        >
                                            {isInvLoading ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <Download className="w-3.5 h-3.5" />
                                            )}
                                            {isInvLoading ? "Wait..." : "Invoice"}
                                        </button>
                                    ) : (
                                        <button 
                                            disabled={isPaymentPending}
                                            onClick={() => handlePayment(booking._id)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                        >
                                            {isPayLoading ? (
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                                <CreditCard className="w-3.5 h-3.5" />
                                            )}
                                            {isPayLoading ? "Wait..." : "Pay Now"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
        COMPLETE: "bg-green-500/10 text-green-500 border-green-500/20",
        PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        FAILED: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    const icons: any = {
        COMPLETE: <CheckCircle2 className="w-3 h-3" />,
        PENDING: <Clock className="w-3 h-3" />,
        FAILED: <XCircle className="w-3 h-3" />,
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${styles[status] || styles.PENDING}`}>
            {icons[status] || icons.PENDING}
            {status}
        </span>
    );
};