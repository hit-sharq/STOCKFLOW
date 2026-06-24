'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function CursorGlow({ 
  children, 
  className,
  glowColor = 'rgba(59, 130, 246, 0.3)' 
}: { 
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove)
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        className="pointer-events-none absolute -inset-4 opacity-0 blur-xl rounded-full"
        style={{
          left: mousePosition.x - 32,
          top: mousePosition.y - 32,
          background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
        }}
        animate={{
          opacity: mousePosition.x > 0 ? 0.6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </div>
  )
}

export function TiltCard({ 
  children, 
  className,
  maxTilt = 10 
}: { 
  children: React.ReactNode
  className?: string
  maxTilt?: number
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null!)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const rotateX = ((e.clientY - centerY) / rect.height) * maxTilt
    const rotateY = ((e.clientX - centerX) / rect.width) * maxTilt
    
    setTilt({ x: rotateX, y: rotateY })
  }
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }
  
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        perspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null!)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return
      
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)
      const maxDistance = 100
      const force = Math.max(0, 1 - distance / maxDistance)
      
      setPosition({
        x: deltaX * force * 0.3,
        y: deltaY * force * 0.3,
      })
    }
    
    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseLeave)
  }, [])
  
  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export function InteractiveGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    let animationFrameId: number
    let time = 0
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gridSize = 50
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)'
      ctx.lineWidth = 1
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        const offset = Math.sin(time + x * 0.01) * 5
        ctx.beginPath()
        ctx.moveTo(x + offset, 0)
        ctx.lineTo(x + offset, canvas.height)
        ctx.stroke()
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        const offset = Math.cos(time + y * 0.01) * 5
        ctx.beginPath()
        ctx.moveTo(0, y + offset)
        ctx.lineTo(canvas.width, y + offset)
        ctx.stroke()
      }
      
      time += 0.02
      animationFrameId = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
    />
  )
}