import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className='fixed inset-0 bg-slate-50 z-50 flex items-center justify-center'>
      <div className="relative">
        {/* Lotus Bloom Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500 opacity-80">
            {/* Simple Lotus Motif */}
            <path d="M50 20C50 20 30 40 30 60C30 80 50 80 50 80C50 80 70 80 70 60C70 40 50 20 50 20Z" fill="currentColor" />
            <path d="M50 20C50 20 15 45 15 65C15 85 45 85 50 80C55 85 85 85 85 65C85 45 50 20 50 20Z" fill="currentColor" className="opacity-40" />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 font-serif tracking-[0.3em] uppercase text-xs mt-8 text-center"
        >
          Namaste
        </motion.p>
      </div>
    </div>
  )
}

export default Loader
