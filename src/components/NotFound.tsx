'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import logo from '../../public/images/logo.png'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <Image
            src={logo} 
            alt="Logo"
            width={90}
            height={90}
            className="drop-shadow-[0_0_20px_rgba(234,179,8,0.7)]"
          />
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-extrabold bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400"
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        {/* Glow Divider */}
        <motion.div
          animate={{ scaleX: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mx-auto mt-6 h-[3px] w-32 bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 rounded-full"
        />

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 font-medium 
            bg-linear-to-br from-yellow-900/30 via-yellow-800/70 to-yellow-900/30 text-white text-lg rounded-2xl shadow transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:from-yellow-900/50 hover:via-yellow-800/90 hover:to-yellow-900/50
              shadow-yellow-500/30"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
