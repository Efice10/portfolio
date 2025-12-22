"use client"

import { motion } from 'framer-motion'
import { Download, Calendar, Mail, Github, Linkedin } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-ferrari-red to-ferrari-darkred relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Let's collaborate on your next project. I'm always excited to work on challenging and innovative ideas.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Download Resume */}
            <motion.a
              href="/resume.pdf"
              download
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white text-ferrari-red rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Download size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Download Resume</h3>
              <p className="text-white/80 text-sm">Get my detailed CV</p>
            </motion.a>

            {/* Schedule Call */}
            <motion.a
              href="https://calendly.com/farid-iqbal"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white text-ferrari-red rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Schedule a Call</h3>
              <p className="text-white/80 text-sm">Book a 30-minute meeting</p>
            </motion.a>

            {/* Send Message */}
            <motion.a
              href="#contact"
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-white text-ferrari-red rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Send Message</h3>
              <p className="text-white/80 text-sm">Direct contact form</p>
            </motion.a>
          </div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center items-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-white/80">Or connect with me:</span>
            <motion.a
              href="https://github.com/Efice10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/muhd-farid-39b293271"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Linkedin size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function AvailableBanner() {
  return (
    <motion.div
      className="fixed top-20 right-4 z-50 bg-ferrari-red text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <span className="font-semibold">Available for Projects</span>
    </motion.div>
  )
}