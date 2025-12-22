"use client"

import { useState, useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

import { cn } from '@/components/shared/utils'
import { MagneticNavItem } from '@/components/ui/magnetic-nav-item'
import { useEasterEggs } from '@/hooks/use-konami-code'
import { useMagneticCursor } from '@/hooks/use-magnetic-cursor'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Performance', href: '#performance' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const magneticCursor = useMagneticCursor({ strength: 0.2, distance: 50 })
  const { handleLogoClick } = useEasterEggs()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div
              {...magneticCursor}
              className="text-xl md:text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoClick}
              title="Click for a surprise! 😉"
            >
              <span className="text-ferrari-red">FARID</span>
              <span className="text-ferrari-silver ml-2">IQBAL</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <MagneticNavItem key={item.name} href={item.href}>
                  {item.name}
                </MagneticNavItem>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-ferrari-black md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-3xl font-light text-gray-300 hover:text-white flex items-center group"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <ChevronRight
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    size={20}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}