'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative w-28 h-28"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: 'linear',
        }}
      >
        {/* Soft base ring */}
        <div className="absolute inset-0 rounded-full border-[5px] border-yellow-500/20" />

        {/* Moving golden arc */}
        <motion.div
          className="absolute inset-0 rounded-full border-[5px] border-transparent border-t-yellow-400 border-r-yellow-600"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            ease: 'linear',
          }}
        />

        {/* Glow center */}
        <motion.div
          className="absolute inset-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full shadow-[0_0_18px_rgba(234,179,8,0.9)]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}
