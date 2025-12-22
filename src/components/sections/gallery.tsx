"use client"

import { useState, useRef } from 'react'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react'

import { ProjectCard3D } from '@/components/ui/project-card-3d'
import { useSwipeGestures } from '@/hooks/use-swipe-gestures'

// Helper function to wrap values (from popmotion)
function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const projects = [
  {
    id: 1,
    title: 'PropKira - Property Management',
    category: 'Full Stack',
    description: 'Cloud-based property and accounting management platform with automated billing and financial reports',
    tech: ['Laravel', 'React', 'MySQL', 'RESTful APIs'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/propkira',
    live: 'https://demo.propkira.com',
    featured: true,
    stats: { users: '500+', performance: '99.9%' }
  },
  {
    id: 2,
    title: 'PropKita Property System',
    category: 'Full Stack',
    description: 'Property management system with SSO integration and bi-directional data sync with PropKira',
    tech: ['Laravel', 'Next.js', 'MySQL', 'SSO Integration'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/propkita',
    live: 'https://demo.propkita.com',
    featured: true,
    stats: { properties: '1000+', transactions: '10M+' }
  },
  {
    id: 3,
    title: 'Customer Relationship Management',
    category: 'Full Stack',
    description: 'Complete CRM system developed from scratch for customer data and sales lead management',
    tech: ['Laravel', 'Angular', 'MySQL', 'PHP'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/crm-system',
    live: 'https://crm-demo.farid.dev',
    featured: true,
    stats: { leads: '5000+', conversion: '45%' }
  },
  {
    id: 4,
    title: 'ForceHero - Security Guard System',
    category: 'Full Stack',
    description: 'Security guard recruitment and management system for PDRM with multi-level approval workflows',
    tech: ['Laravel', 'Next.js', 'MySQL', 'Role-Based Access'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/forcehero',
    live: 'https://forcehero.pdrm.gov.my',
    featured: true,
    stats: { guards: '2000+', deployments: '15' }
  },
  {
    id: 5,
    title: 'MBPJ Chatbot',
    category: 'Full Stack',
    description: 'Chatbot with analytics dashboard for MBPJ website with SSO integration and usage tracking',
    tech: ['Laravel', 'Next.js', 'Firebase', 'REST APIs'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/mbpj-chatbot',
    live: 'https://mbpj.gov.my/chatbot',
    featured: true,
    stats: { queries: '50K+/day', satisfaction: '95%' }
  },
  {
    id: 6,
    title: 'E-Rupabumi Asset Management',
    category: 'Full Stack',
    description: 'Web system for managing MBPJ trees, park equipment, and city assets with mobile API support',
    tech: ['Laravel', 'JavaScript', 'jQuery', 'MySQL'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/e-rupabumi',
    live: 'https://erupabumi.mpkj.gov.my',
    featured: true,
    stats: { assets: '10K+', inspections: '500/month' }
  },
  {
    id: 7,
    title: 'eStrategic Planning System',
    category: 'Full Stack',
    description: 'Dashboard system to document MBPJ annual programs with role-based access control and SSO',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'RESTful APIs'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/estrategic',
    live: 'https://strategic.mpkj.gov.my',
    featured: false,
    stats: { programs: '200+', users: '150+' }
  },
  {
    id: 8,
    title: 'MesraGaji HR System',
    category: 'Frontend',
    description: 'HR system with role-based access control for employee advance payments and loan requests',
    tech: ['Nuxt 2', 'Vuetify', 'API Integration'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/mesra-gaji',
    live: 'https://mesra-gaji.gov.my',
    featured: false,
    stats: { employees: '1000+', requests: '500/month' }
  },
  {
    id: 9,
    title: 'E-Tempahan Booking System',
    category: 'Full Stack',
    description: 'Online booking and reservation platform for MPKlang facilities including halls and sports courts',
    tech: ['PHP', 'SQL', 'HTML', 'CSS'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/e-tempahan',
    live: 'https://tempahan.mpkj.gov.my',
    featured: false,
    stats: { bookings: '5000/month', revenue: 'RM50K/month' }
  },
  {
    id: 10,
    title: 'E-Lesen Fleet Registration',
    category: 'Full Stack',
    description: 'Fleet registration module with multi-level application and approval workflows',
    tech: ['Laravel', 'MySQL', 'Workflows'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/e-lesen',
    live: 'https://elesen.jpj.gov.my',
    featured: false,
    stats: { vehicles: '5000+', renewals: '1000/month' }
  },
  {
    id: 11,
    title: 'MesraHR Reports Module',
    category: 'Backend',
    description: 'Bug fixes and improvements for HR report generation and data presentation modules',
    tech: ['PHP', 'Laravel', 'Reporting'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/mesra-reports',
    live: '#',
    featured: false,
  },
  {
    id: 12,
    title: 'IJSPS Journal System',
    category: 'DevOps',
    description: 'Deployed and configured Ubuntu Server VM with XFCE for lightweight GUI experience',
    tech: ['Ubuntu Server', 'XFCE', 'System Admin'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/ijsps',
    live: 'https://journal.ijsps.org',
    featured: false,
  },
  {
    id: 13,
    title: 'E-Commerce Mobile App',
    category: 'Mobile',
    description: 'E-Commerce application developed for In-Tech 2021 competition using Construct 3 and Firebase',
    tech: ['Construct 3', 'Firebase', 'Airtable', 'Bravo Studio'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/ecommerce-app',
    live: '#',
    featured: false,
    stats: { rank: 'Top 10', downloads: '1K+' }
  },
  {
    id: 14,
    title: 'Android Development Projects',
    category: 'Mobile',
    description: 'Multiple Android applications developed using Kotlin and Java for various clients',
    tech: ['Android', 'Kotlin', 'Java', 'Android SDK'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/android-apps',
    live: 'https://play.google.com/store/apps/dev?id=farid.dev',
    featured: false,
    stats: { apps: '5+', downloads: '10K+' }
  },
  {
    id: 15,
    title: 'Flutter Applications',
    category: 'Mobile',
    description: 'Cross-platform mobile applications developed using Flutter and Dart',
    tech: ['Flutter', 'Dart', 'Cross-Platform'],
    image: '/api/placeholder/800/600',
    github: 'https://github.com/Efice10/flutter-apps',
    live: 'https://flutter.farid.dev',
    featured: false,
    stats: { apps: '3+', platforms: 'iOS, Android' }
  },
]

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'DevOps']

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [, setDirection] = useState(0)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const displayProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6)
  const hasMoreProjects = filteredProjects.length > 6

  const projectIndex = selectedProject !== null
    ? filteredProjects.findIndex(p => p.id === selectedProject)
    : 0

  const paginate = (newDirection: number) => {
    if (selectedProject !== null) {
      const newIndex = wrap(0, filteredProjects.length, projectIndex + newDirection)
      setSelectedProject(filteredProjects[newIndex].id)
      setDirection(newDirection)
    }
  }

  // Add swipe gestures for mobile
  useSwipeGestures({
    onSwipeLeft: () => paginate(1),
    onSwipeRight: () => paginate(-1),
    threshold: 30
  })

  return (
    <section id="gallery" ref={containerRef} className="py-24 bg-ferrari-gray">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Project <span className="text-ferrari-red">Showcase</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my latest work - precision-engineered solutions that push boundaries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-ferrari-red text-white'
                  : 'glass text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y, perspective: '1000px' }}
        >
          {displayProjects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project.id)}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Show More Button */}
        {hasMoreProjects && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="group inline-flex items-center gap-3 px-8 py-4 glass border border-ferrari-red/30 text-ferrari-red font-semibold rounded-lg hover:bg-ferrari-red hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllProjects ? 'Show Less' : `Show More (${filteredProjects.length - 6} more projects)`}
              <motion.div
                animate={{ rotate: showAllProjects ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-ferrari-gray rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                role="document"
              >
                {filteredProjects.map((project, idx) => (
                  idx === projectIndex && (
                    <div key={project.id}>
                      <div className="relative h-96 bg-gradient-to-br from-ferrari-red/20 to-ferrari-black" data-project-modal>
                        <button
                          onClick={() => setSelectedProject(null)}
                          data-close-modal
                          className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-ferrari-red transition-colors z-10"
                        >
                          <X size={20} />
                        </button>
                        {projectIndex > 0 && (
                          <button
                            onClick={() => paginate(-1)}
                            data-nav-prev
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-ferrari-red transition-colors"
                          >
                            <ChevronLeft size={20} />
                          </button>
                        )}
                        {projectIndex < filteredProjects.length - 1 && (
                          <button
                            onClick={() => paginate(1)}
                            data-nav-next
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-ferrari-red transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        )}
                      </div>
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-ferrari-red text-sm font-semibold mb-2">
                              {project.category}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">
                              {project.title}
                            </h3>
                          </div>
                          <div className="flex gap-4">
                            <motion.a
                              href={project.github}
                              className="w-10 h-10 bg-ferrari-red/10 rounded-full flex items-center justify-center text-ferrari-red hover:bg-ferrari-red hover:text-white transition-all"
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.8 }}
                              aria-label={`View ${project.title} on GitHub`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github size={20} />
                            </motion.a>
                            <motion.a
                              href={project.live}
                              className="w-10 h-10 bg-ferrari-red/10 rounded-full flex items-center justify-center text-ferrari-red hover:bg-ferrari-red hover:text-white transition-all"
                              whileHover={{ scale: 1.1 }}
                              aria-label={`View live demo of ${project.title}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={20} />
                            </motion.a>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-6">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-4 py-2 bg-ferrari-red/10 text-ferrari-red text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <motion.button
                          className="w-full py-3 bg-ferrari-red text-white font-semibold rounded-sm hover:bg-ferrari-darkred transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Live Project
                        </motion.button>
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}