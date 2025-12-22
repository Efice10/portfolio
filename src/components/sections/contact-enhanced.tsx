"use client"

import { useRef } from 'react'

import { motion, useScroll, useTransform , useInView } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Calendar
} from 'lucide-react'

// Floating Input Component - commented out due to React hooks usage in non-component
/*
const _FloatingInput = ({
  type,
  label,
  value,
  onChange,
  icon: Icon,
  required = false,
  error = ''
}: {
  type: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon: React.ComponentType<{ size?: number; className?: string }>
  required?: boolean
  error?: string
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    setHasValue(value.length > 0)
  }, [value])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <Icon
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors z-10 ${
            isFocused || hasValue ? 'text-ferrari-red' : 'text-gray-500'
          }`}
          size={20}
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-4 py-4 bg-transparent border-2 rounded-xl transition-all focus:outline-none ${
            error
              ? 'border-red-500'
              : isFocused
              ? 'border-ferrari-red'
              : 'border-gray-700'
          } text-white placeholder-transparent peer`}
          placeholder={label}
          required={required}
        />
        <motion.label
          className={`absolute left-12 transition-all pointer-events-none ${
            isFocused || hasValue
              ? 'text-xs text-ferrari-red -top-2 bg-ferrari-gray px-2'
              : 'text-gray-500 top-1/2 transform -translate-y-1/2'
          }`}
          animate={{
            y: isFocused || hasValue ? -24 : 0,
            fontSize: isFocused || hasValue ? 12 : 16
          }}
        >
          {label}
          {required && <span className="text-ferrari-red ml-1">*</span>}
        </motion.label>
      </div>
      {error && (
        <motion.p
          className="mt-2 text-red-500 text-sm flex items-center gap-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle size={14} />
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
*/

// Floating Textarea Component - commented out due to React hooks usage in non-component
/*
const _FloatingTextarea = ({
  label,
  value,
  onChange,
  icon: Icon,
  required = false,
  error = ''
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  icon: React.ComponentType<{ size?: number; className?: string }>
  required?: boolean
  error?: string
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setHasValue(value.length > 0)
  }, [value])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <Icon
          className={`absolute left-4 top-4 transition-colors z-10 ${
            isFocused || hasValue ? 'text-ferrari-red' : 'text-gray-500'
          }`}
          size={20}
        />
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className={`w-full pl-12 pr-4 py-4 bg-transparent border-2 rounded-xl transition-all focus:outline-none resize-none ${
            error
              ? 'border-red-500'
              : isFocused
              ? 'border-ferrari-red'
              : 'border-gray-700'
          } text-white placeholder-transparent peer`}
          placeholder={label}
          required={required}
        />
        <motion.label
          className={`absolute left-12 transition-all pointer-events-none ${
            isFocused || hasValue
              ? 'text-xs text-ferrari-red -top-2 bg-ferrari-gray px-2'
              : 'text-gray-500 top-4'
          }`}
          animate={{
            y: isFocused || hasValue ? -8 : 0,
            fontSize: isFocused || hasValue ? 12 : 16
          }}
        >
          {label}
          {required && <span className="text-ferrari-red ml-1">*</span>}
        </motion.label>
      </div>
      {error && (
        <motion.p
          className="mt-2 text-red-500 text-sm flex items-center gap-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle size={14} />
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
*/

// Social Link Button Component
const SocialLinkButton = ({
  icon: Icon,
  href,
  label,
  color
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  href: string
  label: string
  color: string
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative glass p-4 rounded-xl hover:scale-105 transition-all"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity`} />
      <Icon size={24} className="relative z-10 group-hover:scale-110 transition-transform" />
      <motion.span
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 whitespace-nowrap"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        {label}
      </motion.span>
    </motion.a>
  )
}

// Contact Info Card Component
const ContactInfoCard = ({
  icon: Icon,
  title,
  value,
  color
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  value: string
  color: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="glass p-6 rounded-xl group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ x: 10 }}
    >
      <motion.div
        className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all`}
      >
        <Icon size={24} className="text-white" />
      </motion.div>
      <h4 className="text-sm text-gray-400 mb-1">{title}</h4>
      <p className="text-white font-medium">{value}</p>
    </motion.div>
  )
}

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  useTransform(scrollYProgress, [0, 1], [0, -50])

  /*
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errorState, setErrorState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrorState(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }
  */

  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errorState[name as keyof typeof errorState]) {
      setErrorState(prev => ({ ...prev, [name]: '' }))
    }
  }
*/

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'muhammadfarid.iqbal@example.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+60 12-345 6789',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kuala Lumpur, Malaysia',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Efice10',
      label: 'GitHub',
      color: 'from-gray-600 to-gray-800'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/muhammadfarid-iqbal',
      label: 'LinkedIn',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/farid_dev',
      label: 'Twitter',
      color: 'from-sky-500 to-blue-500'
    }
  ]

  return (
    <section ref={containerRef} id="contact" className="py-24 min-h-screen relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-ferrari-red/5 rounded-full blur-3xl"
          animate={{ x: [0, -200, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 200, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-4 h-4 text-ferrari-red" />
            <span className="text-sm text-gray-300">Get In Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let&apos;s <span className="text-ferrari-red">Connect</span>
          </h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind? Let&apos;s discuss how we can bring your ideas to life with innovative solutions.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="text-ferrari-red" />
                Let&apos;s Work Together
              </h3>
              <p className="text-gray-400 mb-8">
                I&apos;m always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfoCard key={index} {...info} />
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4 relative">
                {socialLinks.map((link, index) => (
                  <div key={link.label} className="relative" style={{ zIndex: socialLinks.length - index }}>
                    <SocialLinkButton {...link} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Let's Connect Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="glass rounded-2xl p-12 text-center">
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-ferrari-red to-pink-500 rounded-3xl flex items-center justify-center mb-6 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Mail size={40} className="text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Connect?</h3>
              <p className="text-gray-400 mb-8 max-w-md">
                I&apos;m excited to hear about your project ideas and explore how we can work together to bring them to life.
              </p>

              <div className="flex gap-4 justify-center">
                <motion.a
                  href="mailto:muhammadfarid.iqbal@example.com"
                  className="px-8 py-4 bg-gradient-to-r from-ferrari-red to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-ferrari-red/25 transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  Email Me
                </motion.a>

                <motion.a
                  href="https://calendly.com/your-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 glass border border-ferrari-red/30 text-ferrari-red font-semibold rounded-xl hover:bg-ferrari-red hover:text-white transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar size={20} />
                  Schedule a Call
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}