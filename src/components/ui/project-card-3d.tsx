"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { use3DHover } from '@/hooks/use-3d-hover'

interface ProjectCard3DProps {
  project: {
    id: number
    title: string
    category: string
    description: string
    tech: string[]
    featured: boolean
  }
  onClick: () => void
  delay: number
}

export function ProjectCard3D({ project, onClick, delay }: ProjectCard3DProps) {
  const [isHovered, setIsHovered] = useState(false)
  const card3D = use3DHover({
    maxTilt: 10,
    perspective: 1000,
    scale: 1.02,
    speed: 300
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ z: 50 }}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        {...card3D}
        className="glass rounded-lg overflow-hidden hover:glow-red transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-ferrari-red/20 to-ferrari-black">
          {/* 3D depth effect layers */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"
               style={{
                 transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
                 opacity: isHovered ? 0.2 : 0.4
               }} />

          {project.featured && (
            <div
              className="absolute top-4 right-4 px-3 py-1 bg-ferrari-red text-white text-sm font-semibold rounded-full z-10"
              style={{ transform: 'translateZ(30px)' }}
            >
              Featured
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 bg-ferrari-red rounded-full flex items-center justify-center"
              style={{ transform: 'translateZ(40px)' }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <ExternalLink className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-ferrari-red/30 to-transparent opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(10px)' }}
          />
        </div>

        <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
          <div className="text-ferrari-red text-sm font-semibold mb-2">
            {project.category}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-ferrari-red/10 text-ferrari-red text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}