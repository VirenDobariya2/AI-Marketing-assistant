"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D } from "@react-three/drei"
import { useTheme } from "next-themes"

function PricingCube({ position, size, color, rotationSpeed = 0.01 }) {
  const meshRef = useRef()

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotationSpeed
    meshRef.current.rotation.y += rotationSpeed * 1.5
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

function PricingText({ position, text, color }) {
  const textRef = useRef()

  useFrame(({ clock }) => {
    if (!textRef.current) return
    textRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.1
  })

  return (
    <Text3D ref={textRef} position={position} font="/fonts/Inter_Bold.json" size={0.5} height={0.1} curveSegments={12}>
      {text}
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </Text3D>
  )
}

function PricingScene() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <>
      <Environment preset={isDark ? "night" : "sunset"} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <PricingCube
          position={[0, 0, 0]}
          size={[1, 1, 1]}
          color={isDark ? "#9333ea" : "#6366f1"}
          rotationSpeed={0.005}
        />
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
        <PricingCube
          position={[-2, 1, -1]}
          size={[0.8, 0.8, 0.8]}
          color={isDark ? "#4f46e5" : "#3b82f6"}
          rotationSpeed={0.007}
        />
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <PricingCube
          position={[2, -0.5, 1]}
          size={[0.6, 0.6, 0.6]}
          color={isDark ? "#8b5cf6" : "#a855f7"}
          rotationSpeed={0.01}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        <PricingText position={[0, -1.5, 0]} text="$" color={isDark ? "#f9fafb" : "#1e293b"} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export function PricingHero3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PricingScene />
      </Canvas>
    </div>
  )
}
