"use client"

import { useState, useEffect, useRef } from 'react'

interface MagneticCursorOptions {
  strength: number
  distance: number
}

export function useMagneticCursor(options: Partial<MagneticCursorOptions> = {}) {
  const { strength = 0.3, distance = 100 } = options
  const elementRef = useRef<any>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      if (distance < distance) {
        setPosition({
          x: deltaX * (1 - distance / distance),
          y: deltaY * (1 - distance / distance)
        })
      }

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Reset position after mouse stops
      timeoutRef.current = setTimeout(() => {
        setPosition({ x: 0, y: 0 })
      }, 100)
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [strength, distance])

  return {
    ref: elementRef,
    style: {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)'
    }
  }
}