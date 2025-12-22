import { useState, useEffect } from 'react'

export function useCountUp(end: number, isActive: boolean, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let startTime: number | null = null
    let animationId: number

    const animate = (currentTime: number) => {
      startTime ??= currentTime
      const progress = currentTime - startTime

      const percentage = Math.min(progress / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (progress < duration) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isActive, end, duration])

  return { count }
}