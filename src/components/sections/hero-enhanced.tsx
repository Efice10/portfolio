"use client"

import { useEffect, useState, useRef } from 'react'

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ArrowDown, Sparkles, Code2, Rocket, Star } from 'lucide-react'

import { useClientOnly } from '@/hooks/use-client-only'

// Floating Orbs Background Component
const FloatingOrbs = () => {
  // Generate deterministic values to avoid hydration mismatch
  const orbConfigs = [
    { id: 0, size: 200, x: 20, y: 30, duration: 15, delay: 0 },
    { id: 1, size: 300, x: 70, y: 60, duration: 20, delay: 1 },
    { id: 2, size: 150, x: 50, y: 80, duration: 18, delay: 2 },
    { id: 3, size: 250, x: 80, y: 20, duration: 22, delay: 3 },
    { id: 4, size: 180, x: 10, y: 70, duration: 17, delay: 4 },
    { id: 5, size: 220, x: 40, y: 10, duration: 19, delay: 5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbConfigs.map((orb) => (
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

// Magnetic Button Component
const MagneticButton = ({ children, ...props }: any) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Glitch Text Component
const GlitchText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <motion.div
      className={`relative ${className}`}
      animate={isGlitching ? "glitch" : "normal"}
      variants={{
        glitch: {
          x: [-2, 2, -2, 0],
          opacity: [1, 0.8, 1, 1],
        },
        normal: { x: 0, opacity: 1 },
      }}
      transition={{ duration: 0.3 }}
    >
      {text}
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-ferrari-red opacity-70">{text}</span>
          <span className="absolute top-0 left-0 text-cyan-400 opacity-70">{text}</span>
        </>
      )}
    </motion.div>
  )
}

// Typewriter Component
const TypewriterText = ({ words, className = "" }: { words: string[]; className?: string }) => {
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
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return <span className={className}>{currentText}</span>
}

// 3D Card Component
const FeatureCard3D = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      whileHover={{ z: 50 }}
      className="glass p-8 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:shadow-ferrari-red/20"
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-br from-ferrari-red to-pink-500 rounded-xl flex items-center justify-center mb-6"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
      <motion.div
        className="mt-6 flex items-center text-ferrari-red font-medium"
        whileHover={{ x: 5 }}
      >
        Explore more
        <ArrowDown className="ml-2 w-4 h-4 rotate-90" />
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  useInView(containerRef)
  useClientOnly()

  // Smooth spring animation for mouse follow
  const smoothMouseX = useSpring(mousePosition.x, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mousePosition.y, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: Rocket,
      title: "Lightning Fast",
      description: "Optimized performance that delivers exceptional speed and smooth user experiences",
    },
    {
      icon: Sparkles,
      title: "Award Winning",
      description: "Recognized excellence in design and development with innovative solutions",
    },
    {
      icon: Code2,
      title: "Precision Focused",
      description: "Meticulous attention to every detail with clean, maintainable code",
    },
  ]

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ferrari-black">
      {/* Dynamic Background with Floating Orbs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ferrari-black via-gray-900 to-black" />
        <FloatingOrbs />

        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 43, 43, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 43, 43, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Particle Field */}
      <div className="absolute inset-0">
        {[
          { left: 10, top: 15, duration: 4, delay: 0, xRange: 30 },
          { left: 25, top: 30, duration: 3, delay: 0.5, xRange: 40 },
          { left: 40, top: 10, duration: 5, delay: 1, xRange: 25 },
          { left: 55, top: 25, duration: 4.5, delay: 1.5, xRange: 35 },
          { left: 70, top: 40, duration: 3.5, delay: 0.2, xRange: 45 },
          { left: 85, top: 20, duration: 5.5, delay: 0.8, xRange: 20 },
          { left: 15, top: 50, duration: 4.2, delay: 1.2, xRange: 38 },
          { left: 30, top: 65, duration: 3.8, delay: 0.3, xRange: 42 },
          { left: 45, top: 45, duration: 4.8, delay: 1.8, xRange: 28 },
          { left: 60, top: 60, duration: 3.2, delay: 0.7, xRange: 33 },
          { left: 75, top: 55, duration: 5.2, delay: 1.3, xRange: 37 },
          { left: 90, top: 70, duration: 4.3, delay: 0.4, xRange: 26 },
          { left: 20, top: 80, duration: 3.7, delay: 1.7, xRange: 44 },
          { left: 35, top: 85, duration: 4.9, delay: 0.9, xRange: 31 },
          { left: 50, top: 75, duration: 4.1, delay: 1.1, xRange: 39 },
          { left: 65, top: 90, duration: 5.3, delay: 0.6, xRange: 29 },
          { left: 80, top: 85, duration: 3.9, delay: 1.4, xRange: 36 },
          { left: 95, top: 80, duration: 4.7, delay: 1.6, xRange: 32 },
          { left: 5, top: 35, duration: 4.4, delay: 0.1, xRange: 41 },
          { left: 28, top: 55, duration: 3.6, delay: 1.9, xRange: 27 },
          { left: 58, top: 35, duration: 5.1, delay: 0.5, xRange: 34 },
        ].map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-ferrari-red rounded-full"
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

      {/* Hero Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          {/* Star Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4 text-ferrari-red" />
            <span className="text-sm text-gray-300">Available for Projects</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <GlitchText
              text="MUHAMMAD FARID"
              className="block text-white font-ferrari tracking-tighter mb-2"
            />
            <GlitchText
              text="IQBAL AMRAN"
              className="block text-ferrari-red font-ferrari tracking-tighter"
            />
          </h1>

          <motion.div
            className="text-2xl md:text-4xl text-gray-400 font-light h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <TypewriterText
              words={[
                "Full Stack Developer",
                "Web & Mobile Applications",
                "API Specialist",
                "Vibe Coder",
                "UI/UX Enthusiast",
              ]}
              className="bg-gradient-to-r from-ferrari-red to-pink-500 bg-clip-text text-transparent"
            />
          </motion.div>

            </motion.div>

        {/* 3D Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {features.map((feature, index) => (
            <FeatureCard3D key={index} {...feature} index={index} />
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MagneticButton
            className="group relative px-10 py-4 bg-ferrari-red text-white font-semibold rounded-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-ferrari-red/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>

          <MagneticButton
            className="px-10 py-4 border-2 border-ferrari-red text-ferrari-red font-semibold rounded-lg hover:bg-ferrari-red hover:text-white transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Download Resume
              <motion.div
                className="w-5 h-5 border-2 border-current rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </span>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {['GitHub', 'LinkedIn', 'Twitter'].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-ferrari-red transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <span className="text-xs font-bold">{social[0]}</span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Advanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-ferrari-red/50 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-1 h-3 bg-ferrari-red rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Advanced Mouse Follow Effect with Gradient */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 mix-blend-screen"
        style={{
          background: `radial-gradient(400px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255, 43, 43, 0.15), transparent 40%), radial-gradient(200px circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />
    </section>
  )
}