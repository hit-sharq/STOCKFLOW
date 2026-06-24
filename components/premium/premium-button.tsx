'use client';

import { ButtonHTMLAttributes, ReactNode, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  magnetic?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  magnetic = false,
  onClick,
  disabled,
  className,
}: PremiumButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null!)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    if (!magnetic || !buttonRef.current) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = buttonRef.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const maxDistance = 100
      const force = Math.max(0, 1 - distance / maxDistance)
      
      setPosition({
        x: deltaX * force * 0.2,
        y: deltaY * force * 0.2,
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [magnetic])
  
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'

  const variants = {
    primary:
      'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline:
      'border-2 border-primary text-primary hover:bg-primary/5',
    ghost:
      'text-primary hover:bg-primary/10',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const animationProps = magnetic
    ? {
        animate: { x: position.x, y: position.y },
        transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
      }
    : {}

  return (
    <motion.button
      ref={buttonRef}
      {...animationProps}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className || ''}`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {variant === 'primary' && (
        <>
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </>
      )}
      {icon && iconPosition === 'left' && !loading && icon}
      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="inline-block h-4 w-4 border-2 border-transparent border-t-current rounded-full"
        />
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && !loading && icon}
    </motion.button>
  )
}