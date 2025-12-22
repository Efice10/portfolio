"use client"

import { useEffect, useState } from 'react'

export function SkipToMain() {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocused(true)
      }
    }

    const handleMouseDown = () => {
      setIsFocused(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return (
    <a
      href="#main"
      className={`
        fixed top-4 left-4 z-[9999] bg-ferrari-red text-white px-4 py-2 rounded-lg
        font-semibold transition-all duration-300
        ${isFocused
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full focus:opacity-100 focus:translate-y-0'
        }
      `}
      onClick={(e) => {
        e.preventDefault()
        const main = document.getElementById('main')
        if (main) {
          main.focus()
          main.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      Skip to main content
    </a>
  )
}

export function AccessibilityAnnouncer() {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    const announcePageChange = () => {
      setAnnouncement('Page content loaded')
      setTimeout(() => setAnnouncement(''), 1000)
    }

    window.addEventListener('load', announcePageChange)
    return () => window.removeEventListener('load', announcePageChange)
  }, [])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcement}
    </div>
  )
}