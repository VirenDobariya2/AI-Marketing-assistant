"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useScroll, useTransform, motion, useSpring } from "framer-motion"

interface SmoothScrollProps {
  children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Set up scroll container
  useEffect(() => {
    const contentElement = contentRef.current
    const scrollerElement = scrollerRef.current

    if (!contentElement || !scrollerElement) return

    const updateHeight = () => {
      const contentHeight = contentElement.getBoundingClientRect().height
      scrollerElement.style.height = `${contentHeight}px`
    }

    // Update height initially and on resize
    updateHeight()
    window.addEventListener("resize", updateHeight)

    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  // Get scroll progress
  const { scrollYProgress } = useScroll()

  // Make it smoother with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 100,
    mass: 0.5,
  })

  // Transform the scroll progress to Y position
  const y = useTransform(smoothProgress, [0, 1], [0, -100], {
    clamp: false,
  })

  return (
    <div ref={scrollerRef} className="relative w-full">
      <motion.div
        ref={contentRef}
        style={{ y: `${y}%` }}
        className="fixed top-0 left-0 right-0 origin-top will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
