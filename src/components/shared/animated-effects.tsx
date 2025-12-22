"use client"

import { useEffect, useRef, useState, Children } from 'react'

import { motion } from 'framer-motion'

// Particle Effect Component
export const ParticleField = ({
  count = 20,
  color = 'bg-ferrari-red'
}: {
  count?: number
  color?: string
}) => {
  // Generate deterministic particle positions
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 5 + (i * 4.5) % 90,
    top: 10 + (i * 3.5) % 80,
    xRange: 20 + (i * 2),
    duration: 3 + (i * 0.2) % 2,
    delay: i * 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className={`absolute w-1 h-1 ${color} rounded-full`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.xRange - particle.xRange/2, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated Grid Background
export const AnimatedGrid = ({
  size = 50,
  color = 'rgba(255, 43, 43, 0.1)'
}: {
  size?: number
  color?: string
}) => {
  return (
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`,
      }}
      animate={{ x: [0, size, 0], y: [0, size, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  )
}

// Floating Orb Background
export const FloatingOrbs = ({
  count = 6
}: {
  count?: number
}) => {
  // Use deterministic values to avoid hydration mismatch
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 150 + (i * 40),
    x: 10 + (i * 15),
    y: 20 + (i * 12),
    duration: 15 + (i * 2),
    delay: i * 0.8,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full mix-blend-screen filter blur-xl opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-ferrari-red via-pink-500 to-purple-500 rounded-full" />
        </motion.div>
      ))}
    </div>
  )
}

// Magnetic Wrapper Component
export const MagneticWrapper = ({
  children,
  strength = 0.2
}: {
  children: React.ReactNode
  strength?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * strength, y: y * strength })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Gradient Border Wrapper
export const GradientBorder = ({
  children,
  className = ""
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-ferrari-red via-pink-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
      <div className="relative bg-ferrari-gray rounded-2xl p-0.5">
        {children}
      </div>
    </div>
  )
}

// Text Reveal Animation
export const TextReveal = ({
  text,
  className = ""
}: {
  text: string
  className?: string
}) => {
  return (
    <div className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// Stagger Children Animation Wrapper
export const StaggerContainer = ({
  children,
  stagger = 0.1,
  className = ""
}: {
  children: React.ReactNode
  stagger?: number
  className?: string
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {Children.map(children, child => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Parallax Effect Component
export const ParallaxWrapper = ({
  children,
  speed = 0.5
}: {
  children: React.ReactNode
  speed?: number
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const {scrollY} = window
        const elementY = rect.top + scrollY
        const windowHeight = window.innerHeight
        const elementHeight = rect.height

        if (elementY < scrollY + windowHeight && elementY + elementHeight > scrollY) {
          const speedAdjusted = (scrollY - elementY + windowHeight) * speed
          setOffsetY(speedAdjusted)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} style={{ transform: `translateY(${offsetY}px)` }}>
      {children}
    </div>
  )
}

// Glow on Hover Effect
export const GlowOnHover = ({
  children,
  glowColor = 'rgba(255, 43, 43, 0.5)'
}: {
  children: React.ReactNode
  glowColor?: string
}) => {
  return (
    <motion.div
      className="relative"
      whileHover="hover"
      style={{ cursor: 'pointer' }}
    >
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          boxShadow: `0 0 20px ${glowColor}`,
          opacity: 0
        }}
        variants={{
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  )
}

// Typewriter Effect Hook
export const useTypewriter = (words: string[], speed = 100) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, speed])

  return currentText
}

// Mouse Trail Effect
export const MouseTrail = () => {
  const [, setMousePosition] = useState({ x: 0, y: 0 })
  const trails = useRef<{ x: number; y: number; id: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      trails.current.push({ x: e.clientX, y: e.clientY, id: Date.now() })
      trails.current = trails.current.slice(-10)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {trails.current.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: trail.x - 5,
            top: trail.y - 5,
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.05 }}
        >
          <div className="w-2 h-2 bg-ferrari-red rounded-full" />
        </motion.div>
      ))}
    </>
  )
}