"use client"

import { useRef } from 'react'

import { motion, useInView } from 'framer-motion'
import { Code, Database, Cpu, Globe, Sparkles, Briefcase, GraduationCap, Building2 } from 'lucide-react'

import { ScrollTimeline, type TimelineItem } from '@/components/shared'
import { TechStackSection } from '@/components/ui/tech-logos'

const skills = [
  { name: 'Frontend Development', icon: Code, level: 90, description: 'Next.js, Nuxt, Angular, Vue.js, React, TypeScript' },
  { name: 'Backend Development', icon: Database, level: 95, description: 'Laravel 8-12, PHP 8.3, MySQL, RESTful APIs' },
  { name: 'Mobile Development', icon: Globe, level: 85, description: 'Android (Kotlin, Java), Flutter (Dart)' },
  { name: 'DevOps & Cloud', icon: Cpu, level: 80, description: 'Docker, CI/CD, AWS, Ubuntu Server, Git' },
  { name: 'Database & Storage', icon: Database, level: 88, description: 'MySQL, Oracle DB, Firebase, Redis, SQLite' },
]

const careerTimeline: TimelineItem[] = [
  {
    id: '1',
    date: '2024 - Present',
    title: 'Software Developer',
    subtitle: 'TrackerHero - Integrated Operations',
    description: 'Designed, developed, and maintained web applications using Laravel, Nuxt, Next.js, and MySQL. Building scalable solutions for real-time tracking and operations management.',
    icon: Briefcase,
    tags: ['Laravel', 'Next.js', 'MySQL', 'Nuxt'],
  },
  {
    id: '2',
    date: '2023 - 2024',
    title: 'Web App Developer',
    subtitle: 'Digital Dagang Sdn. Bhd. Malaysia',
    description: 'Developed a complete CRM system using Laravel and Angular from scratch. Implemented full-stack features including user management, reporting, and data analytics.',
    icon: Building2,
    tags: ['Laravel', 'Angular', 'CRM', 'REST APIs'],
  },
  {
    id: '3',
    date: '2020 - 2024',
    title: 'Bachelor of Computer Science',
    subtitle: 'Universiti Malaysia Terengganu',
    description: 'Bachelor of Computer Science (Mobile Computing) With Honours - GPA: 3.27. Focused on mobile app development, software engineering principles, and database management.',
    icon: GraduationCap,
    tags: ['Mobile Computing', 'Software Engineering', 'GPA 3.27'],
  },
  {
    id: '4',
    date: '2019 - 2020',
    title: 'Matriculation Certificate',
    subtitle: 'Kedah Matriculation College',
    description: 'Foundation program in physical science with GPA: 3.14. Built strong fundamentals in mathematics, physics, and programming.',
    icon: GraduationCap,
    tags: ['Foundation', 'Physical Science', 'GPA 3.14'],
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-ferrari-gray to-ferrari-black">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            About <span className="text-ferrari-red">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate developer with a love for creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-ferrari-red" />
                The Story
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  I&apos;m a passionate Computer Science graduate from Universiti Malaysia Terengganu, specializing in Mobile Computing. As a Software Developer at TrackerHero, I&apos;ve developed comprehensive web applications using Laravel, Next.js, and MySQL, enhancing functionality and user experience.
                </p>
                <p>
                  My journey in tech began with a curiosity about how things work, leading me to develop expertise in full-stack development, API design, and modern web frameworks. I believe in writing clean, efficient code and creating exceptional digital experiences.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to innovative projects, or continuously learning to improve my skills. I&apos;m always eager to take on new challenges and expand my knowledge.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <motion.div
                          className="w-12 h-12 bg-ferrari-red/10 rounded-lg flex items-center justify-center group-hover:bg-ferrari-red/20 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Icon className="w-6 h-6 text-ferrari-red" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-white font-semibold">{skill.name}</span>
                            <span className="text-ferrari-red text-sm">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-ferrari-red to-ferrari-darkred rounded-full"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                            />
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{skill.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <TechStackSection />
        </motion.div>

        {/* Career Journey Timeline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ScrollTimeline
            items={careerTimeline}
            title="Career Journey"
            description="My professional path through technology and education"
            className="py-8"
          />
        </motion.div>
      </div>
    </section>
  )
}