'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

interface HolographicStatCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  variant?: 'default' | 'accent' | 'success'
  delay?: number
}

function HologramEffect({ delay = 0 }: { delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.1 + Math.sin(state.clock.elapsedTime + delay) * 0.05
    }
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[10, 4, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial
        color="#22c55e"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function HolographicStatCard({
  title,
  value,
  change,
  icon,
  trend,
  variant = 'default',
  delay = 0,
}: HolographicStatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    if (typeof value === 'number') {
      let start = 0
      const end = value
      const duration = 1500
      const increment = end / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(end)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(start))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }
  }, [value])
  
  const variants = {
    default: {
      bgGradient: 'from-background to-background/80',
      borderColor: 'border-border/50',
      accent: 'text-primary',
    },
    accent: {
      bgGradient: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      accent: 'text-primary',
    },
    success: {
      bgGradient: 'from-accent/10 to-accent/5',
      borderColor: 'border-accent/20',
      accent: 'text-accent',
    },
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className={`relative group rounded-2xl bg-gradient-to-br ${variants[variant].bgGradient} border ${variants[variant].borderColor} p-6 backdrop-blur-xl overflow-hidden`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }} />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wider"
          >
            {title}
          </motion.p>
          <motion.h3 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {typeof value === 'number' ? displayValue.toLocaleString() : value}
          </motion.h3>
          {change !== undefined && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 flex items-center gap-2"
            >
              {trend === 'up' && (
                <>
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">+{change}%</span>
                </>
              )}
              {trend === 'down' && (
                <>
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">-{change}%</span>
                </>
              )}
            </motion.div>
          )}
        </div>
        {icon && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`${variants[variant].accent} p-3 rounded-xl bg-background/50 backdrop-blur-sm`}
          >
            {icon}
          </motion.div>
        )}
      </div>
      
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
    </motion.div>
  )
}