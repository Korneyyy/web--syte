"use client"
import { Canvas } from "@react-three/fiber"
import { PerformanceMonitor, AdaptiveDpr } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Suspense, useState } from "react"
import Nebula from "./Nebula"
import MilkyWay from "./MilkyWay"
import Planets from "./Planets"

export default function CosmicScene() {
  const [degraded, setDegraded] = useState(false)

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 60 }}
        gl={{ alpha: false, antialias: !degraded }}
        dpr={degraded ? [1, 1] : [1, 1.5]}
      >
        <color attach="background" args={["#0A0A14"]} />
        <ambientLight intensity={0.5} />
        <hemisphereLight args={["#1E3A5F", "#0A0A14", 0.6]} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />

        <Suspense fallback={null}>
          <Nebula />
          <MilkyWay />
          <Planets />
        </Suspense>

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={degraded ? 0.3 : 0.8}
          />
        </EffectComposer>

        <PerformanceMonitor
          onDecline={() => setDegraded(true)}
          flipflops={3}
          ms={200}
        />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
