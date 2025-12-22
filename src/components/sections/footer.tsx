"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Efice10', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/muhd-farid-39b293271', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:muhdfarid109.mf@gmail.com', label: 'Email' },
]

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="relative py-12 bg-ferrari-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-ferrari-gray to-ferrari-black" />
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => {
            // Use a deterministic but varied rotation based on index
            const rotations = [0, 1.5, -2, 3, -1, 2.5, -3, 4, -4.5, 1, -1.5, 3.5, -2.5, 0.5, -3.5, 2, -0.5, 4.5, -2, 1.5];
            return (
              <div
                key={i}
                className="absolute w-px h-full bg-ferrari-red"
                style={{
                  left: `${5 * i}%`,
                  transform: `rotate(${rotations[i]}deg)`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">MUHAMMAD FARID</span>
              <span className="text-ferrari-red ml-2">IQBAL</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Full Stack Developer specializing in Laravel, Next.js, and modern web technologies. Building exceptional digital experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="w-10 h-10 bg-ferrari-red/10 rounded-full flex items-center justify-center text-gray-400 hover:text-ferrari-red hover:bg-ferrari-red/20 transition-all"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-ferrari-red transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>muhdfarid109.mf@gmail.com</p>
              <p>+60-1162562534</p>
              <p>Cyberjaya, Selangor</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © 2024 Muhammad Farid Iqbal. All rights reserved.
              <motion.span
                className="text-ferrari-red"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.span>
            </p>
            <p className="text-gray-400 text-sm">
              Built with Next.js, Laravel &{' '}
              <span className="text-ferrari-red font-semibold">passion</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating Speed Line */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ferrari-red to-transparent opacity-30"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </footer>
  )
}