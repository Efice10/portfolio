"use client"

import { motion } from 'framer-motion'

export function LoadingSkeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={className}
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass rounded-lg overflow-hidden">
      <LoadingSkeleton className="h-64 bg-gray-800" />
      <div className="p-6 space-y-4">
        <LoadingSkeleton className="h-4 w-3/4 bg-gray-800 rounded" />
        <LoadingSkeleton className="h-3 w-full bg-gray-800 rounded" />
        <LoadingSkeleton className="h-3 w-full bg-gray-800 rounded" />
        <div className="flex gap-2">
          <LoadingSkeleton className="h-6 w-20 bg-gray-800 rounded-full" />
          <LoadingSkeleton className="h-6 w-20 bg-gray-800 rounded-full" />
          <LoadingSkeleton className="h-6 w-20 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="text-center p-4 bg-ferrari-red/10 rounded-lg">
      <LoadingSkeleton className="h-8 w-16 mx-auto mb-2 bg-gray-800 rounded" />
      <LoadingSkeleton className="h-4 w-20 mx-auto bg-gray-800 rounded" />
    </div>
  )
}