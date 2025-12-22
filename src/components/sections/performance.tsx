"use client"

import { useRef } from 'react'

import { motion, useInView } from 'framer-motion'
import { Code, Database, Globe, Zap, Trophy, Users } from 'lucide-react'

import { StatItem } from './stat-item'

const stats = [
  { value: 95, suffix: '%', label: 'Code Quality', icon: Trophy },
  { value: 20, suffix: '+', label: 'Projects Delivered', icon: Code },
  { value: 3, suffix: '+', label: 'Years Experience', icon: Users },
  { value: 20, suffix: '+', label: 'Technologies', icon: Globe },
  { value: 3.27, suffix: ' GPA', label: 'Academic Score', icon: Database },
  { value: 100, suffix: '%', label: 'Commitment', icon: Zap },
]

const technologies = [
  { name: 'Laravel/PHP', level: 95 },
  { name: 'Next.js/Nuxt', level: 90 },
  { name: 'MySQL/Database', level: 92 },
  { name: 'React/Vue.js', level: 88 },
  { name: 'TypeScript/JavaScript', level: 90 },
  { name: 'Git/Version Control', level: 95 },
]

export function Performance() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="performance" className="py-24 bg-gradient-to-b from-ferrari-black to-ferrari-gray">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Performance <span className="text-ferrari-red">Metrics</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Numbers don&apos;t lie. Here&apos;s what I bring to every project - speed, precision, and exceptional results.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              isInView={isInView}
              index={index}
            />
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            Technical <span className="text-ferrari-red">Expertise</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="glass p-6 rounded-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-white">{tech.name}</span>
                  <span className="text-ferrari-red font-bold">{tech.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-ferrari-red to-ferrari-darkred rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tech.level}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Speed Comparison */}
        <motion.div
          className="mt-20 glass-red p-8 rounded-2xl max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-5xl font-bold text-ferrari-red mb-2">2.5s</div>
              <div className="text-gray-400">Industry Average Load Time</div>
            </motion.div>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 speed-line h-px top-1/2" />
              <div className="relative text-5xl font-bold text-white mb-2">VS</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-5xl font-bold text-ferrari-red mb-2">&lt;0.5s</div>
              <div className="text-gray-400">My Optimized Load Time</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}