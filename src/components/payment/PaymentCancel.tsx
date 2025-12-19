import { XCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

type PaymentCancelProps = {
  transactionId: string;
  amount: string;
  message: string;
};

export const PaymentCancel = ({ transactionId, amount, message }: PaymentCancelProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl max-w-md w-full mx-auto">
      <div className="p-4 bg-red-500/10 rounded-full mb-6">
        <XCircle className="w-16 h-16 text-red-500" />
      </div>

      <h2 className="text-2xl font-black italic text-gray-900 dark:text-white uppercase tracking-tight">
        Payment Cancelled
      </h2>
      
      <p className="text-gray-500 text-sm mt-3 font-medium">
        {message || "The payment process was cancelled at your request."}
      </p>

      <div className="w-full mt-8 space-y-3 bg-gray-50 dark:bg-gray-900/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 text-left">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction ID</span>
          <span className="text-xs font-mono text-gray-900 dark:text-white font-bold">{transactionId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</span>
          <span className="text-sm font-black text-red-500 uppercase">৳{amount}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        <Link 
          href="/dashboard/my-book-events"
          className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> Try Again
        </Link>
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
        >
          <Home className="w-3.5 h-3.5" /> Back Home
        </Link>
      </div>
    </div>
  );
};