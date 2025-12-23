'use client';

import { useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
  tags?: string[];
  link?: string;
}

interface ScrollTimelineProps {
  items: TimelineItem[];
  className?: string;
  title?: string;
  description?: string;
}

function TimelineCard({
  item,
  index,
  isInView,
}: {
  item: TimelineItem;
  index: number;
  isInView: boolean;
}) {
  const Icon = item.icon ?? Calendar;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'relative flex items-start gap-6 md:gap-8',
        isEven ? 'md:flex-row' : 'md:flex-row-reverse md:text-right'
      )}
    >
      {/* Date Badge */}
      <div
        className={cn(
          'flex-shrink-0 flex flex-col items-center',
          isEven ? 'md:items-end' : 'md:items-start'
        )}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 rounded-full bg-ferrari-red/10 border border-ferrari-red/30 text-ferrari-red text-sm font-semibold whitespace-nowrap"
        >
          {item.date}
        </motion.div>
      </div>

      {/* Center Line & Dot */}
      <div className="absolute left-[3.5rem] md:left-1/2 top-0 -translate-x-1/2 h-full hidden md:block">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-ferrari-red via-ferrari-red/50 to-transparent -translate-x-1/2" />

        {/* Glowing Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
          className="relative top-0 left-1/2 -translate-x-1/2"
        >
          <div className="w-4 h-4 bg-ferrari-red rounded-full" />
          <div className="absolute inset-0 w-4 h-4 bg-ferrari-red rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 w-8 h-8 -left-2 -top-2 bg-ferrari-red/20 rounded-full blur-md" />
        </motion.div>
      </div>

      {/* Mobile Dot */}
      <div className="absolute left-10 top-6 md:hidden">
        <div className="w-3 h-3 bg-ferrari-red rounded-full">
          <div className="absolute inset-0 w-3 h-3 bg-ferrari-red rounded-full animate-ping opacity-75" />
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          'flex-1 glass p-6 rounded-2xl relative group transition-all duration-300',
          'hover:shadow-lg hover:shadow-ferrari-red/10',
          isEven ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
        )}
      >
        {/* Connection Arrow */}
        <div
          className={cn(
            'absolute top-8 w-8 h-8 border-t-2 border-l-2 border-ferrari-red/30 hidden md:block',
            isEven ? '-left-4 rotate-45' : '-right-4 -rotate-45'
          )}
        />

        {/* Icon */}
        <div className="inline-flex p-2 rounded-lg bg-ferrari-red/10 mb-4 group-hover:bg-ferrari-red/20 transition-colors">
          <Icon className="w-5 h-5 text-ferrari-red" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-ferrari-red transition-colors">
          {item.title}
        </h3>

        {/* Subtitle */}
        {item.subtitle && (
          <div className="flex items-center gap-2 text-ferrari-red font-medium mb-3">
            <MapPin className="w-4 h-4" />
            <span>{item.subtitle}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + tagIndex * 0.05 + 0.3 }}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-ferrari-red/50 hover:text-ferrari-red transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ferrari-red/0 via-ferrari-red/5 to-ferrari-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function ScrollTimeline({
  items,
  className,
  title,
  description,
}: ScrollTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {/* Header */}
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
      {(title || description) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{description}</p>
          )}
        </motion.div>
      )}

      {/* Timeline Items */}
      <div className="relative max-w-5xl mx-auto">
        {/* Mobile Line */}
        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ferrari-red via-ferrari-red/50 to-transparent md:hidden" />

        <div className="space-y-8 md:space-y-12">
          {items.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </div>
  );
}
