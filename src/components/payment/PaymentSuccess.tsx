'use client'
import { CheckCircle, Download, Home, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useDownloadInvoice } from "@/hooks/payment/useInvoice";

type PaymentSuccessProps = {
    transactionId: string;
    amount: string;
    message: string;
    paymentId?: string;
};

export const PaymentSuccess = ({ transactionId, amount, message, paymentId }: PaymentSuccessProps) => {
    const { mutate: downloadInvoice, isPending } = useDownloadInvoice();
    const handleDownload = () => {
        if (paymentId || transactionId) {
            downloadInvoice(paymentId || transactionId);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl max-w-md w-full mx-auto relative overflow-hidden">
            {/* Decorative Golden Blur */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 blur-[100px] rounded-full" />

            <div className="p-4 bg-green-500/10 rounded-full mb-6 relative">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full -z-10 animate-pulse" />
            </div>

            <h2 className="text-2xl font-black italic text-gray-900 dark:text-white uppercase tracking-tight">
                Payment Success!
            </h2>

            <p className="text-gray-500 text-[11px] mt-3 font-bold uppercase tracking-widest opacity-80">
                {message || "Your transaction has been processed successfully."}
            </p>

            {/* Payment Receipt Style Box */}
            <div className="w-full mt-8 relative">
                <div className="absolute -left-2 -right-2 top-1/2 h-1 border-t border-dashed border-gray-200 dark:border-gray-800 z-10" />

                <div className="bg-gray-50 dark:bg-gray-900/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-left space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Amount Paid</span>
                        <span className="text-xl font-black text-gray-900 dark:text-white">৳{amount}</span>
                    </div>

                    <div className="pt-6 flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Transaction ID</span>
                            <span className="text-[10px] font-mono text-gray-900 dark:text-white font-bold mt-1 uppercase">
                                {transactionId}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Status</span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 mt-1 uppercase">
                                Verified
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full mt-8">
                <Link
                    href="/dashboard/my-book-events"
                    className="group flex items-center justify-center gap-2  text-[10px] font-black uppercase tracking-widest shadow-yellow-500/10 w-full lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
                >
                    View My Bookings <ArrowRight className="w-4 h-4 transition-transform" />
                </Link>


                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
                >
                    <Home className="w-3.5 h-3.5" /> Home
                </Link>


            </div>

            <p className="mt-8 text-[9px] text-gray-400 font-medium italic">
                A confirmation email has been sent to your registered address.
            </p>
        </div>
    );
};