"use client"

import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact-enhanced'
import { Footer } from '@/components/sections/footer'
import { Gallery } from '@/components/sections/gallery-enhanced'
import { Hero } from '@/components/sections/hero-enhanced'
import { Navigation } from '@/components/sections/navigation'
import { Performance } from '@/components/sections/performance-enhanced'
import { CallToAction, AvailableBanner } from '@/components/ui/call-to-action'
import { ParticleBackground } from '@/components/ui/particle-background'
import { SkipToMain, AccessibilityAnnouncer } from '@/components/ui/skip-navigation'
import { useKeyboardNavigation } from '@/hooks/use-keyboard-navigation'

export default function Home() {
  useKeyboardNavigation()

  return (
    <>
      <SkipToMain />
      <AccessibilityAnnouncer />
      <ParticleBackground />
      <Navigation />
      <AvailableBanner />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Performance />
        <Gallery />
        <About />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  )
}