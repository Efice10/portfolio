"use client"

import type { MouseEvent } from 'react';
import { useState, useRef } from 'react'

interface TiltSettings {
  maxTilt: number
  perspective: number
  scale: number
  speed: number
}

export function use3DHover(settings: Partial<TiltSettings> = {}) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400
  } = settings

  const [transform, setTransform] = useState('')
  const [transition, setTransition] = useState('')
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransform(`
      perspective(${perspective}px)
      scale3d(${scale}, ${scale}, ${scale})
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `)
    setTransition('none')
  }

  const handleMouseLeave = () => {
    setTransform(
      `perspective(${perspective}px) scale3d(1, 1, 1) rotateX(0) rotateY(0)`
    )
    setTransition(`all ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`)
  }

  return {
    ref: elementRef,
    style: {
      transform,
      transition,
      transformStyle: 'preserve-3d' as const
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  }
}