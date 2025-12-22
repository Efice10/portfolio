"use client"

import { useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, User } from 'lucide-react'

import { AnimatedInput, AnimatedTextarea } from '@/components/ui/animated-input'
import { PulseButton, SuccessAnimation } from '@/components/ui/success-animation'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  /*
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
*/

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'muhdfarid109.mf@gmail.com', href: 'mailto:muhdfarid109.mf@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+60-1162562534', href: 'tel:+601162562534' },
    { icon: MapPin, label: 'Location', value: 'Cyberjaya, Selangor, Malaysia', href: '#' },
  ]

  return (
    <section id="contact" className="py-24 bg-ferrari-black">
      <SuccessAnimation show={isSubmitted} message="Message sent successfully!" />
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s <span className="text-ferrari-red">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to build something extraordinary together? Let&apos;s discuss your next project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-red p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <AnimatedInput
                    label="Your Name"
                    value={formData.name}
                    onChange={(value) => setFormData({ ...formData, name: value })}
                    required
                    icon={<User size={18} />}
                    placeholder="John Doe"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <AnimatedInput
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(value) => setFormData({ ...formData, email: value })}
                    required
                    icon={<Mail size={18} />}
                    placeholder="john@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <AnimatedTextarea
                    label="Message"
                    value={formData.message}
                    onChange={(value) => setFormData({ ...formData, message: value })}
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <PulseButton
                  type="submit"
                  loading={isSubmitted}
                  className="w-full py-4 bg-ferrari-red text-white font-semibold rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </PulseButton>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-ferrari-red/10 rounded-lg flex items-center justify-center group-hover:bg-ferrari-red/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Icon className="w-6 h-6 text-ferrari-red" />
                      </motion.div>
                      <div>
                        <div className="text-sm text-gray-400">{item.label}</div>
                        <div className="text-white group-hover:text-ferrari-red transition-colors">
                          {item.value}
                        </div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            <motion.div
              className="glass p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Availability</h3>
              <div className="space-y-3 text-gray-300">
                <p>I&apos;m currently open to new opportunities and interesting projects. Whether you need a full-stack developer, UI/UX consultation, or have a startup idea, I&apos;d love to hear from you.</p>
                <p className="text-ferrari-red font-semibold">Typical response time: Within 24 hours</p>
              </div>
            </motion.div>

            <motion.div
              className="relative h-48 bg-gradient-to-br from-ferrari-red/10 to-ferrari-black rounded-2xl p-8 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="absolute inset-0 speed-line" />
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2">Let&apos;s Build</h4>
                <h4 className="text-2xl font-bold text-ferrari-red mb-4">Something Amazing</h4>
                <p className="text-gray-300">Together, we can create digital experiences that leave a lasting impression.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}