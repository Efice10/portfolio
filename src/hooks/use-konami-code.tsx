"use client"

import { useEffect, useState } from 'react'

export function useKonamiCode(callback: () => void) {
  const [keys, setKeys] = useState<string[]>([])
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeys = [...keys, e.key].slice(-10)
      setKeys(newKeys)

      if (JSON.stringify(newKeys) === JSON.stringify(konamiCode)) {
        callback()
        setKeys([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keys, callback, konamiCode])
}

export function useEasterEggs() {
  const [secretMode, setSecretMode] = useState(false)

  useKonamiCode(() => {
    setSecretMode(true)
    // Add some fun effects
    document.body.style.animation = 'rainbow 3s linear infinite'
    setTimeout(() => {
      document.body.style.animation = ''
      setSecretMode(false)
    }, 5000)
  })

  const handleLogoClick = () => {
    // Secret action on logo click
    const audio = new Audio('https://www.soundjay.com/misc/sounds/beep-07a.mp3')
    audio.volume = 0.3
    audio.play().catch(() => {}) // Ignore errors if audio doesn't load
  }

  const handleTripleClick = () => {
    // Triple click easter egg
    const clicks = [] as number[]
    return (_e: React.MouseEvent) => {
      clicks.push(Date.now())
      if (clicks.length > 3) clicks.shift()
      if (clicks.length === 3 && clicks[2] - clicks[0] < 500) {
        // Trigger easter egg
        alert('🏎️ Vroom! You found the Ferrari easter egg!')
      }
    }
  }

  return { secretMode, handleLogoClick, handleTripleClick }
}