"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface SuccessAnimationProps {
  show: boolean
  message?: string
}

export function SuccessAnimation({ show, message = 'Success!' }: SuccessAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: 0.1,
            }}
          >
            <Check size={20} />
          </motion.div>
          <span className="font-medium">{message}</span>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-1 bg-green-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-ferrari-red rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export function PulseButton({
  children,
  loading,
  className = '',
  ...props
}: {
  children: React.ReactNode
  loading?: boolean
  className?: string
  [key: string]: any
}) {
  return (
    <motion.button
      {...props}
      className={`
        relative overflow-hidden
        ${loading ? 'cursor-not-allowed' : ''}
        ${className}
      `}
      whileHover={{ scale: loading ? 1 : 1.05 }}
      whileTap={{ scale: loading ? 1 : 0.95 }}
      disabled={loading}
    >
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <LoadingDots />
        </motion.div>
      )}
      {!loading && (
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}