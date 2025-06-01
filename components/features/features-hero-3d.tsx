"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import { Vector3, type Mesh, type Group } from "three"
import { useTheme } from "next-themes"

function FeatureShape({ position, color, speed = 1, distort = 1, scale = 1 }) {
  const meshRef = useRef<Mesh>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.3
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 * speed) * 0.1
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={color}
        speed={0.5}
        distort={distort}
        envMapIntensity={isDark ? 0.5 : 1}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function FloatingNest() {
  const groupRef = useRef<Group>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <FeatureShape
          position={new Vector3(0, 0, 0)}
          color={isDark ? "#9333ea" : "#6366f1"}
          scale={1.5}
          distort={0.4}
        />
      </Float>

      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <FeatureShape
          position={new Vector3(-2, 1, -1)}
          color={isDark ? "#4f46e5" : "#3b82f6"}
          scale={1}
          distort={0.2}
        />
      </Float>

      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <FeatureShape
          position={new Vector3(2, -0.5, 1)}
          color={isDark ? "#8b5cf6" : "#a855f7"}
          scale={0.8}
          distort={0.3}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <FeatureShape
          position={new Vector3(0, -1.5, -2)}
          color={isDark ? "#6366f1" : "#ec4899"}
          scale={0.7}
          distort={0.5}
        />
      </Float>

      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1}>
        <FeatureShape
          position={new Vector3(-1.5, -1, 1.5)}
          color={isDark ? "#ec4899" : "#8b5cf6"}
          scale={0.6}
          distort={0.3}
        />
      </Float>
    </group>
  )
}

function Scene() {
  const { camera } = useThree()
  const { theme } = useTheme()

  useEffect(() => {
    camera.position.set(0, 0, 6)
  }, [camera])

  return (
    <>
      <Environment preset={theme === "dark" ? "night" : "sunset"} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <FloatingNest />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export function FeaturesHero3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
