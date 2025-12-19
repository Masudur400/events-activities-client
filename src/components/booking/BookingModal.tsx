/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { X, CreditCard, Loader2, Minus, Plus } from 'lucide-react'

interface BookingModalProps {
  event: any;
  onClose: () => void;
  onSubmit: (guestCount: number) => void;
  isLoading: boolean;
}

export const BookingModal = ({ event, onClose, onSubmit, isLoading }: BookingModalProps) => {
  const [guestCount, setGuestCount] = useState(1);

  const increment = () => {
    if (guestCount < (event.maxParticipants - event.bookedParticipants)) {
      setGuestCount(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (guestCount > 1) setGuestCount(prev => prev - 1);
  };

  const totalPrice = event.joiningFee * guestCount;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-[#0f0f0f] w-full max-w-md rounded-lg overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Fixed Header */}
        <div className="shrink-0 h-24 bg-linear-to-br from-yellow-600/20 via-yellow-500/10 to-transparent flex items-center px-8">
          <h2 className="text-xl font-black italic text-gray-900 dark:text-white uppercase tracking-tighter">Confirm Booking</h2>
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-8 pt-4 overflow-y-auto custom-scrollbar">
          {/* Event Info Card */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 mb-8">
            <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-1">Event Name</p>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2">{event.eventName}</h3>
            <p className="text-[10px] font-mono text-gray-400 break-all">ID: {event._id}</p>
          </div>

          {/* Guest Counter */}
          <div className="mb-8">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-1 text-center">Select Guest Count</label>
            <div className="flex items-center justify-between bg-white dark:bg-black border border-gray-100 dark:border-gray-800 p-2 rounded-2xl shadow-inner">
              <button 
                type="button"
                onClick={decrement}
                className="p-3 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-gray-900 dark:text-white">{guestCount}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Guests</span>
              </div>

              <button 
                type="button"
                onClick={increment}
                className="p-3 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-3 mb-8 px-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Fee per person</span>
              <span className="text-gray-900 dark:text-white font-bold">৳{event.joiningFee}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 dark:border-gray-800">
              <span className="text-gray-900 dark:text-white font-black uppercase text-xs tracking-widest">Total Payable</span>
              <span className="text-2xl font-black text-yellow-600">৳{totalPrice}</span>
            </div>
          </div>

          {/* Action Button */}
          <button 
            disabled={isLoading}
            onClick={() => onSubmit(guestCount)}
            className="w-full disabled:opacity-50 flex items-center justify-center gap-3 p-3 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
            ) : (
              <><CreditCard className="w-4 h-4" /> Pay & Confirm Booking</>
            )}
          </button>
          
          <p className="text-[9px] text-center text-gray-400 mt-6 font-bold uppercase tracking-widest leading-relaxed">
            By clicking, you agree to our <br/> Terms & Cancellation Policy
          </p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #eab308;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}