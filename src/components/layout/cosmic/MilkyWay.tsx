"use client"
import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 6000

export default function MilkyWay() {
  const ref = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 12
      const spread = (Math.random() - 0.5) * 0.8
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = spread
      pos[i * 3 + 2] = Math.sin(angle) * radius

      const t = (radius - 2) / 12
      const warm = new THREE.Color("#FFD700")
      const cool = new THREE.Color("#4B6CB7")
      const c = warm.clone().lerp(cool, t)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.008
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
      />
    </points>
  )
}