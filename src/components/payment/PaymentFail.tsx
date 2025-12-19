import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

type PaymentFailProps = {
  transactionId: string;
  amount: string;
  message: string;
};

export const PaymentFail = ({ transactionId, amount, message }: PaymentFailProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-red-100 dark:border-red-900/20 shadow-2xl max-w-md w-full mx-auto relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
      
      <div className="p-4 bg-red-50 dark:bg-red-500/5 rounded-full mb-6">
        <AlertCircle className="w-16 h-16 text-red-600 animate-pulse" />
      </div>

      <h2 className="text-2xl font-black italic text-gray-900 dark:text-white uppercase tracking-tight leading-none">
        Payment Failed
      </h2>
      
      <p className="text-gray-500 text-xs mt-4 font-semibold px-4">
        {message || "We couldn't process your payment. This could be due to insufficient funds or a technical error."}
      </p>

      {/* Details Box */}
      <div className="w-full mt-8 space-y-4 bg-gray-50 dark:bg-gray-900/40 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-left">
        <div className="flex justify-between items-start">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Reference ID</span>
          <span className="text-[11px] font-mono text-gray-900 dark:text-white font-bold break-all ml-4 uppercase">
            {transactionId}
          </span>
        </div>
        
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-800" />

        <div className="flex justify-between items-center">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Failed Amount</span>
          <span className="text-lg font-black text-gray-900 dark:text-white">
            ৳{amount}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full mt-8">
        <Link 
          href="/dashboard/my-book-events"
          className="flex items-center justify-center gap-2 py-4 px-6 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> Try Payment Again
        </Link>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 py-4 px-6 border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>

      <p className="mt-6 text-[9px] text-gray-400 font-medium">
        If your money was deducted, it will be refunded within 5-7 working days.
      </p>
    </div>
  );
};