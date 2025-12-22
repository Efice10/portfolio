'use client';

import {
  AnimatedHero,
  AnimatedHeroBadge,
  AnimatedHeroButtons,
  AnimatedHeroContent,
  AnimatedHeroDescription,
  AnimatedHeroTitle,
  AnimatedHeroFeatures,
  AnimatedButton,
  AnimatedFeatureItem,
  AnimatedSection,
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedCard,
  AnimatedIcon,
} from '@/components/ui/animated-landing';

interface LandingPageClientProps {
  children: React.ReactNode;
}

export function LandingPageClient({ children }: LandingPageClientProps) {
  return <>{children}</>;
}

// Export all animated components for use in the page
export {
  AnimatedHero,
  AnimatedHeroBadge,
  AnimatedHeroButtons,
  AnimatedHeroContent,
  AnimatedHeroDescription,
  AnimatedHeroTitle,
  AnimatedHeroFeatures,
  AnimatedButton,
  AnimatedFeatureItem,
  AnimatedSection,
  AnimatedSectionHeader,
  AnimatedCardGrid,
  AnimatedCard,
  AnimatedIcon,
};