"use client"

import { useRef } from 'react'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface Project {
  id: number
  title: string
  category: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
  featured?: boolean
  stats?: { [key: string]: string }
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  projectIndex?: number
  totalProjects?: number
  paginate?: (direction: number) => void
}

export function ProjectModal({ project, onClose, projectIndex = 0, totalProjects = 1, paginate }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useScroll({
    target: modalRef,
    offset: ['start center', 'end center']
  })

  // const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  // const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [20, 10, 20])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${project.id}`}
          aria-describedby={`modal-description-${project.id}`}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0, borderRadius: 20 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 10 }}
            exit={{ scale: 0.8, opacity: 0, borderRadius: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-ferrari-gray to-ferrari-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-ferrari-red/20"
            onClick={(e) => e.stopPropagation()}
            role="document"
            style={{ borderRadius: '10px' }}
          >
            <div className="relative h-64 md:h-96 bg-gradient-to-br from-ferrari-red/20 to-ferrari-black overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-ferrari-red/20 rounded-full mb-4">
                    <span className="text-ferrari-red text-2xl font-bold">{project.title.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-ferrari-red text-sm">{project.category}</p>
                </div>
              </div>

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-ferrari-red rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-ferrari-red transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              {paginate && projectIndex > 0 && (
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-ferrari-red transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {paginate && projectIndex < totalProjects - 1 && (
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-ferrari-red transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <p id={`modal-description-${project.id}`} className="text-gray-300 text-lg">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-ferrari-red/10 text-ferrari-red text-sm rounded-full border border-ferrari-red/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-ferrari-red/5 rounded-lg">
                      <div className="text-ferrari-red font-bold">{value}</div>
                      <div className="text-xs text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href={project.github}
                  className="flex-1 py-3 px-6 bg-ferrari-red text-white font-semibold rounded-lg hover:bg-ferrari-darkred transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={20} />
                  View Code
                </motion.a>
                <motion.a
                  href={project.live}
                  className="flex-1 py-3 px-6 border border-ferrari-red text-ferrari-red font-semibold rounded-lg hover:bg-ferrari-red hover:text-white transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                  View Live Project
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}