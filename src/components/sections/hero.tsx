"use client"

import { useEffect, useState } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Zap, Award, Target } from 'lucide-react'

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ferrari-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ferrari-black via-gray-900 to-ferrari-black" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(255, 43, 43, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(204, 0, 0, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(255, 43, 43, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Speed Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-ferrari-red to-transparent opacity-30"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-ferrari-red rounded-full"
          animate={{ y: [-20, 20], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-ferrari-red rounded-full"
          animate={{ y: [20, -20], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-2 h-2 bg-ferrari-red rounded-full"
          animate={{ y: [-20, 20], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="block text-white font-ferrari tracking-tighter">MUHAMMAD FARID</span>
            <span className="block text-ferrari-red font-ferrari tracking-tighter">IQBAL AMRAN</span>
          </h1>
          <motion.div
            className="mt-4 text-2xl md:text-3xl text-gray-400 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Full Stack Developer · Web & Mobile Applications · API Specialist
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            className="glass p-6 rounded-lg red-glow"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap className="w-8 h-8 text-ferrari-red mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Optimized performance that delivers exceptional speed</p>
          </motion.div>
          <motion.div
            className="glass p-6 rounded-lg red-glow"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Award className="w-8 h-8 text-ferrari-red mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-2">Award Winning</h3>
            <p className="text-gray-400">Recognized excellence in design and development</p>
          </motion.div>
          <motion.div
            className="glass p-6 rounded-lg red-glow"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Target className="w-8 h-8 text-ferrari-red mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-white mb-2">Precision Focused</h3>
            <p className="text-gray-400">Meticulous attention to every detail</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.button
            className="px-8 py-4 bg-ferrari-red text-white font-semibold rounded-sm hover:bg-ferrari-darkred transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
          <motion.button
            className="px-8 py-4 border border-ferrari-red text-ferrari-red font-semibold rounded-sm hover:bg-ferrari-red hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-ferrari-red" />
      </motion.div>

      {/* Mouse Follow Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 43, 43, 0.1), transparent 40%)`,
        }}
      />
    </section>
  )
}