"use client"

import { useEffect, useRef } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
}

export function useSwipeGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50
}: SwipeHandlers) {
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchEndRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.changedTouches[0].screenX,
        y: e.changedTouches[0].screenY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndRef.current = {
        x: e.changedTouches[0].screenX,
        y: e.changedTouches[0].screenY
      }

      const deltaX = touchStartRef.current.x - touchEndRef.current.x
      const deltaY = touchStartRef.current.y - touchEndRef.current.y
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)

      if (isHorizontalSwipe) {
        if (deltaX > threshold && onSwipeLeft) {
          onSwipeLeft()
        } else if (deltaX < -threshold && onSwipeRight) {
          onSwipeRight()
        }
      } else {
        if (deltaY > threshold && onSwipeUp) {
          onSwipeUp()
        } else if (deltaY < -threshold && onSwipeDown) {
          onSwipeDown()
        }
      }
    }

    const element = document.documentElement
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold])
}