"use client"

import { motion } from 'framer-motion'

const techStack = [
  { name: 'Laravel', icon: '🐘', level: 95 },
  { name: 'PHP', icon: '🐘', level: 90 },
  { name: 'Next.js', icon: '▲', level: 90 },
  { name: 'React', icon: '⚛️', level: 88 },
  { name: 'Nuxt.js', icon: '🟢', level: 85 },
  { name: 'Vue.js', icon: '💚', level: 82 },
  { name: 'MySQL', icon: '🐬', level: 92 },
  { name: 'PostgreSQL', icon: '🐘', level: 85 },
  { name: 'MongoDB', icon: '🍃', level: 80 },
  { name: 'Docker', icon: '🐳', level: 75 },
  { name: 'Git', icon: '📦', level: 95 },
  { name: 'AWS', icon: '☁️', level: 70 },
  { name: 'TypeScript', icon: '📘', level: 90 },
  { name: 'JavaScript', icon: '🟨', level: 95 },
  { name: 'Tailwind CSS', icon: '🎨', level: 90 },
  { name: 'Figma', icon: '🎨', level: 80 },
]

interface TechLogosProps {
  limit?: number
  className?: string
}

export function TechLogos({ limit = techStack.length, className = '' }: TechLogosProps) {
  return (
    <div className={`flex flex-wrap gap-6 ${className}`}>
      {techStack.slice(0, limit).map((tech, index) => (
        <motion.div
          key={tech.name}
          className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:glow-red transition-all duration-300 cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -5 }}
          title={`${tech.name} - ${tech.level}% proficiency`}
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">
            {tech.icon}
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">{tech.name}</span>
            <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-full bg-ferrari-red rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${tech.level}%` }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function TechStackSection() {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-white text-center mb-8">
        Tech Stack
      </h3>
      <TechLogos limit={16} className="justify-center" />
    </div>
  )
}