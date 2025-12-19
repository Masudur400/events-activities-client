'use client'
import { useState } from 'react'
import { Star, X, Loader2 } from 'lucide-react'

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (data: { rating: number; comment: string }) => void;
  isLoading: boolean;
}

export const ReviewModal = ({ onClose, onSubmit, isLoading }: ReviewModalProps) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit({ rating, comment });
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white dark:bg-[#121212] w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black italic text-gray-900 dark:text-white mb-2 uppercase tracking-tight">
            Rate the Event
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
            Your feedback matters to us
          </p>
        </div>
        
        {/* Star Rating Section */}
        <div className="flex gap-2 mb-8 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="outline-none transition-transform hover:scale-110 active:scale-95"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star 
                className={`w-10 h-10 transition-all ${
                  (hover || rating) >= star 
                    ? 'fill-yellow-500 text-yellow-500 shadow-yellow-500/50' 
                    : 'text-gray-200 dark:text-gray-700'
                }`} 
              />
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <div className="mb-8">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
            Your Review
          </label>
          <textarea 
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none transition-all text-sm font-medium resize-none shadow-inner"
          />
        </div>

        {/* Action Button */}
        <button 
          disabled={isLoading || rating === 0}
          onClick={handleSubmit}
          className="w-full lg:px-8 px-4 lg:py-3 py-2 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-lg shadow   hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Post Review'
          )}
        </button>
      </div>
    </div>
  )
}