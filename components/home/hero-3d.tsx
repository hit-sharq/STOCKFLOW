'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.6

    let animationFrameId: number

    // 3D Cube data
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ]

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ]

    let rotation = { x: 0.5, y: 0.8, z: 0 }

    const rotateX = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [point[0], point[1] * cos - point[2] * sin, point[1] * sin + point[2] * cos]
    }

    const rotateY = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [point[0] * cos + point[2] * sin, point[1], -point[0] * sin + point[2] * cos]
    }

    const rotateZ = (point: number[], angle: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [point[0] * cos - point[1] * sin, point[0] * sin + point[1] * cos, point[2]]
    }

    const project = (point: number[], scale: number) => {
      const x = (point[0] * scale) / (point[2] + 5) + canvas.width / 2
      const y = (point[1] * scale) / (point[2] + 5) + canvas.height / 2
      return [x, y]
    }

    const animate = (time: number) => {
      // Smooth rotation
      rotation.x += 0.003
      rotation.y += 0.005

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw cube
      const projectedVertices = vertices.map((vertex) => {
        let point = [...vertex] as number[]
        point = rotateX(point, rotation.x)
        point = rotateY(point, rotation.y)
        point = rotateZ(point, rotation.z)
        return project(point, 100)
      })

      // Draw edges with gradient
      edges.forEach(([start, end]) => {
        const gradient = ctx.createLinearGradient(
          projectedVertices[start][0],
          projectedVertices[start][1],
          projectedVertices[end][0],
          projectedVertices[end][1]
        )
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.8)')
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0.8)')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(projectedVertices[start][0], projectedVertices[start][1])
        ctx.lineTo(projectedVertices[end][0], projectedVertices[end][1])
        ctx.stroke()
      })

      // Draw vertices
      projectedVertices.forEach((vertex) => {
        ctx.fillStyle = 'rgba(37, 99, 235, 0.9)'
        ctx.beginPath()
        ctx.arc(vertex[0], vertex[1], 4, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.6
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 -z-10"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </motion.div>
  )
}
