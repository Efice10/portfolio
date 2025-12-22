"use client"

import { motion } from 'framer-motion'

import { useCountUp } from '@/components/hooks/use-count-up'

interface StatItemProps {
  value: number
  suffix: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  isInView: boolean
  index: number
}

export function StatItem({ value, suffix, label, icon: Icon, isInView, index }: StatItemProps) {
  const { count } = useCountUp(value, isInView, 2000 + index * 200)

  return (
    <motion.div
      className="text-center group"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -10 }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 bg-ferrari-red/10 rounded-lg flex items-center justify-center group-hover:bg-ferrari-red/20 transition-colors"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        <Icon className="w-8 h-8 text-ferrari-red" />
      </motion.div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  )
}