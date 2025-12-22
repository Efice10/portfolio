"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  icon?: React.ReactNode
  className?: string
}

export function AnimatedInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required,
  icon,
  className = ''
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(Boolean(value))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setHasValue(Boolean(newValue))
  }

  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}

      <motion.input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        className={`
          w-full px-4 py-3 bg-ferrari-gray border border-gray-700 rounded-lg
          text-white placeholder-transparent transition-all duration-200
          ${icon ? 'pl-12' : ''}
          ${error ? 'border-red-500' : ''}
          focus:outline-none focus:border-ferrari-red focus:glow-red
        `}
        id={label.replace(/\s+/g, '-').toLowerCase()}
      />

      <motion.label
        htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${icon ? 'left-12' : ''}
          ${isFocused || hasValue
            ? '-top-2 left-3 text-xs bg-ferrari-gray px-1 text-ferrari-red'
            : 'top-3.5 text-gray-400'
          }
        `}
        animate={{
          scale: (isFocused || hasValue) ? 0.85 : 1,
        }}
      >
        {label}
        {required && <span className="text-ferrari-red ml-1">*</span>}
      </motion.label>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-red-500 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function AnimatedTextarea({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  rows = 4,
  className = ''
}: Omit<AnimatedInputProps, 'type' | 'icon'> & { rows?: number }) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(Boolean(value))

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setHasValue(Boolean(newValue))
  }

  return (
    <div className={`relative ${className}`}>
      <motion.textarea
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused ? placeholder : ''}
        rows={rows}
        className={`
          w-full px-4 py-3 bg-ferrari-gray border border-gray-700 rounded-lg
          text-white placeholder-transparent transition-all duration-200
          resize-none
          ${error ? 'border-red-500' : ''}
          focus:outline-none focus:border-ferrari-red focus:glow-red
        `}
        id={label.replace(/\s+/g, '-').toLowerCase()}
      />

      <motion.label
        htmlFor={label.replace(/\s+/g, '-').toLowerCase()}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${isFocused || hasValue
            ? '-top-2 left-3 text-xs bg-ferrari-gray px-1 text-ferrari-red'
            : 'top-3.5 text-gray-400'
          }
        `}
        animate={{
          scale: (isFocused || hasValue) ? 0.85 : 1,
        }}
      >
        {label}
        {required && <span className="text-ferrari-red ml-1">*</span>}
      </motion.label>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}