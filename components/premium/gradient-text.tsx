'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'accent' | 'mix';
}

export function GradientText({
  children,
  className = '',
  variant = 'primary',
}: GradientTextProps) {
  const gradients = {
    primary: 'bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent',
    accent: 'bg-gradient-to-r from-accent via-accent to-accent/60 bg-clip-text text-transparent',
    mix: 'bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent',
  };

  return <span className={`${gradients[variant]} ${className}`}>{children}</span>;
}
