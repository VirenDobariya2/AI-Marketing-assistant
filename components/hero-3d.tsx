"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Environment } from "@react-three/drei"
import type { Mesh, Group } from "three"

function FloatingUI({
  position,
  scale,
  color,
  rotationSpeed = 0.003,
  floating = true,
}: {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  rotationSpeed?: number
  floating?: boolean
}) {
  const ref = useRef<Mesh>(null!)

  useFrame((state) => {
    ref.current.rotation.x += rotationSpeed
    ref.current.rotation.y += rotationSpeed
  })

  return (
    <Float enabled={floating} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </Float>
  )
}

function FloatingSphere({
  position,
  scale,
  color,
  distort = false,
}: {
  position: [number, number, number]
  scale: number
  color: string
  distort?: boolean
}) {
  const ref = useRef<Mesh>(null!)

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
        {distort ? (
          <MeshDistortMaterial color={color} speed={2} distort={0.3} radius={1} />
        ) : (
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
        )}
      </Sphere>
    </Float>
  )
}

function Chart({ position }: { position: [number, number, number] }) {
  const group = useRef<Group>(null!)

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
      <group ref={group} position={position}>
        {/* Chart base */}
        <mesh position={[0, 0, 0]} scale={[2, 0.1, 1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>

        {/* Chart bars */}
        {[0.5, 0, -0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.1 + ((i + 1) * 0.2) / 2, 0]} scale={[0.2, (i + 1) * 0.2, 0.2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#60a5fa" />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function NestStructure({ position }: { position: [number, number, number] }) {
  const group = useRef<Group>(null!)

  useFrame((state) => {
    group.current.rotation.y += 0.005
  })

  return (
    <group ref={group} position={position}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[0, Math.PI * 2 * (i / 4), 0]}>
          <torusGeometry args={[1.5 - i * 0.2, 0.1, 16, 100, Math.PI * 2]} />
          <meshStandardMaterial
            color={`hsl(${210 + i * 15}, 80%, 60%)`}
            emissive={`hsl(${210 + i * 15}, 80%, 30%)`}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  )
}

function Particles({ count = 100, color = "#4f46e5" }) {
  const mesh = useRef<Mesh>(null!)
  const positions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame((state) => {
    mesh.current.rotation.x += 0.001
    mesh.current.rotation.y += 0.001
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

export function Hero3D() {
  return (
    <div className="h-[500px] md:h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        {/* Main elements */}
        <Chart position={[0, 0, 0]} />
        <NestStructure position={[2, -1, -2]} />

        {/* Floating UI elements */}
        <FloatingUI position={[-2, 1, 0]} scale={[1.5, 1, 0.1]} color="#4338ca" />
        <FloatingUI position={[-2.5, 0, -1]} scale={[0.8, 0.8, 0.1]} color="#3b82f6" rotationSpeed={0.002} />

        {/* Floating spheres */}
        <FloatingSphere position={[2, 0.5, 1]} scale={0.4} color="#8b5cf6" />
        <FloatingSphere position={[-1, -1, 0.5]} scale={0.3} color="#3b82f6" />
        <FloatingSphere position={[1.5, -0.5, -1]} scale={0.5} color="#6366f1" distort />

        {/* Background particles */}
        <Particles count={150} color="#6366f1" />

        {/* Environment and controls */}
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          rotateSpeed={0.2}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
