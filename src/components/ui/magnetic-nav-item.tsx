"use client"

import { motion } from 'framer-motion'
import { useMagneticCursor } from '@/hooks/use-magnetic-cursor'

interface MagneticNavItemProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function MagneticNavItem({ href, children, className = '' }: MagneticNavItemProps) {
  const magneticCursor = useMagneticCursor({ strength: 0.15, distance: 80 })

  return (
    <motion.a
      {...magneticCursor}
      href={href}
      className={`relative text-gray-300 hover:text-white transition-colors group ${className}`}
      whileHover={{ y: -2 }}
    >
      {children}
      <motion.span
        className="absolute -bottom-2 left-0 w-full h-0.5 bg-ferrari-red"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  )
}