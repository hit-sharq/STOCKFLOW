'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  glowEffect?: boolean;
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  glowEffect = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? { y: -4, transition: { duration: 0.2 } }
          : undefined
      }
      className={`relative rounded-xl border border-border/50 bg-card/30 backdrop-blur-xl transition-all duration-300 ${
        hover ? 'hover:border-primary/50 hover:shadow-lg' : ''
      } ${glowEffect ? 'hover:shadow-[0_0_30px_rgba(80,127,255,0.2)]' : ''} ${className}`}
    >
      {glowEffect && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
