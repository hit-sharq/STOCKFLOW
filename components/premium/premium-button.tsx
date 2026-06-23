'use client';

import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  ...props
}: PremiumButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 active:scale-95',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95',
    outline:
      'border-2 border-primary text-primary hover:bg-primary/5 active:scale-95',
    ghost:
      'text-primary hover:bg-primary/10 active:scale-95',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      }`}
      disabled={loading || props.disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && !loading && icon}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-4 w-4 border-2 border-transparent border-t-current rounded-full"
        />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </motion.button>
  );
}
