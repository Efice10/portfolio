"use client"

import { useEffect, useCallback } from 'react'

export function useKeyboardNavigation() {
  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only handle keys without modifiers (Ctrl, Alt, Shift)
    if (event.ctrlKey || event.altKey || event.metaKey) return

    // Don't handle keys when typing in input fields
    const target = event.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
      return
    }

    switch (event.key.toLowerCase()) {
      // Number keys for navigation
      case '1':
        event.preventDefault()
        navigateToSection('home')
        break
      case '2':
        event.preventDefault()
        navigateToSection('performance')
        break
      case '3':
        event.preventDefault()
        navigateToSection('gallery')
        break
      case '4':
        event.preventDefault()
        navigateToSection('about')
        break
      case '5':
        event.preventDefault()
        navigateToSection('contact')
        break

      // Other shortcuts
      case 'h':
        event.preventDefault()
        navigateToSection('home')
        break
      case 'p':
        event.preventDefault()
        navigateToSection('performance')
        break
      case 'g':
        event.preventDefault()
        navigateToSection('gallery')
        break
      case 'a':
        event.preventDefault()
        navigateToSection('about')
        break
      case 'c':
        event.preventDefault()
        navigateToSection('contact')
        break

      // Arrow keys for project navigation
      case 'arrowleft':
        if (document.activeElement?.closest('[data-project-modal]')) {
          event.preventDefault()
          // Trigger previous project button
          const prevBtn = document.querySelector('[data-nav-prev]')
          if (prevBtn) (prevBtn as HTMLButtonElement).click()
        }
        break
      case 'arrowright':
        if (document.activeElement?.closest('[data-project-modal]')) {
          event.preventDefault()
          // Trigger next project button
          const nextBtn = document.querySelector('[data-nav-next]')
          if (nextBtn) (nextBtn as HTMLButtonElement).click()
        }
        break

      // ESC to close modal
      case 'escape': {
        event.preventDefault()
        const closeBtn = document.querySelector('[data-close-modal]')
        if (closeBtn) (closeBtn as HTMLButtonElement).click()
        break
      }
    }
  }, [navigateToSection])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    navigateToSection
  }
}