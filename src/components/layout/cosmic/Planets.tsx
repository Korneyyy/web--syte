"use client"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function GasGiant() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.1
  })
  return (
    <group position={[6, 0.5, -8]}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshPhysicalMaterial
          color="#D4A853"
          roughness={0.6}
          metalness={0.1}
          emissive="#8B6914"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.8, 3, 64]} />
        <meshBasicMaterial
          color="#C8A05E"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export default function Planets() {
  return <GasGiant />
}
