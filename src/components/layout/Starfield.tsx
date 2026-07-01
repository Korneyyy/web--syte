"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

function createTexture(size: number, glow = false): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  const c = size / 2
  const g = ctx.createRadialGradient(c, c, 0, c, c, c)
  if (glow) {
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.05, "rgba(255,255,255,0.8)")
    g.addColorStop(0.3, "rgba(255,255,255,0.15)")
    g.addColorStop(1, "rgba(255,255,255,0)")
  } else {
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.3, "rgba(255,255,255,0.85)")
    g.addColorStop(0.7, "rgba(255,255,255,0.1)")
    g.addColorStop(1, "rgba(255,255,255,0)")
  }
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

interface StarParams {
  count: number
  zMin: number
  zMax: number
  spread: number
  size: number
  speed: number
  palette: { prob: number; hue: number; sat: number; lum: number }[]
}

function generateLayer(p: StarParams) {
  const positions = new Float32Array(p.count * 3)
  const colors = new Float32Array(p.count * 3)
  for (let i = 0; i < p.count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * p.spread
    positions[i3 + 1] = (Math.random() - 0.5) * p.spread * 0.5
    positions[i3 + 2] = p.zMin + Math.random() * (p.zMax - p.zMin)
    const r = Math.random()
    let hue = 0, sat = 0, lum = 0, acc = 0
    for (const c of p.palette) {
      acc += c.prob
      if (r <= acc) { hue = c.hue; sat = c.sat; lum = c.lum; break }
    }
    const col = new THREE.Color().setHSL(hue, sat, lum)
    colors[i3] = col.r; colors[i3 + 1] = col.g; colors[i3 + 2] = col.b
  }
  return { positions, colors }
}

function makePoints(
  layer: ReturnType<typeof generateLayer>,
  size: number,
  texture: THREE.CanvasTexture,
  speed: number,
  zMin: number,
  zMax: number
) {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(layer.positions, 3))
  geo.setAttribute("color", new THREE.BufferAttribute(layer.colors, 3))
  const mat = new THREE.PointsMaterial({
    map: texture,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const mesh = new THREE.Points(geo, mat)
  ;(mesh as any)._speed = speed
  ;(mesh as any)._zMin = zMin
  ;(mesh as any)._zMax = zMax
  return mesh
}

const spectralPalette = [
  { prob: 0.30, hue: 0.08, sat: 0.5, lum: 0.65 },
  { prob: 0.20, hue: 0.10, sat: 0.4, lum: 0.75 },
  { prob: 0.25, hue: 0.04, sat: 0.2, lum: 0.85 },
  { prob: 0.15, hue: 0.0, sat: 0.0, lum: 0.95 },
  { prob: 0.08, hue: 0.58, sat: 0.5, lum: 0.8 },
  { prob: 0.02, hue: 0.73, sat: 0.6, lum: 0.75 },
]

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const w = container.clientWidth
    const h = container.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    camera.position.z = 0

    const tex = createTexture(64)
    const glowTex = createTexture(128, true)

    const far = makePoints(
      generateLayer({ count: 1800, zMin: -300, zMax: -80, spread: 400, size: 0.15, speed: 0.3, palette: spectralPalette }),
      0.15, tex, 0.3, -300, -80
    )
    const mid = makePoints(
      generateLayer({ count: 900, zMin: -150, zMax: -30, spread: 300, size: 0.3, speed: 0.55, palette: spectralPalette }),
      0.3, tex, 0.55, -150, -30
    )
    const near = makePoints(
      generateLayer({ count: 200, zMin: -50, zMax: -8, spread: 200, size: 0.65, speed: 1.0, palette: spectralPalette }),
      0.65, tex, 1.0, -50, -8
    )

    scene.add(far, mid, near)

    const glowStars: THREE.Sprite[] = []
    for (let i = 0; i < 10; i++) {
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.8,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.position.set(
        (Math.random() - 0.5) * 250,
        (Math.random() - 0.5) * 120,
        -50 - Math.random() * 200
      )
      sprite.scale.setScalar(1.0 + Math.random() * 2.0)
      ;(sprite as any)._phase = Math.random() * Math.PI * 2
      ;(sprite as any)._speed = 0.3 + Math.random() * 0.3
      // цветной оттенок для ярких
      const c = new THREE.Color().setHSL(
        [0.0, 0.03, 0.08, 0.1, 0.6, 0.7][Math.floor(Math.random() * 6)],
        0.4,
        0.8
      )
      sprite.material.color = c
      scene.add(sprite)
      glowStars.push(sprite)
    }

    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      const t = clock.getElapsedTime()

      for (const mesh of [far, mid, near]) {
        const m = mesh as any
        const pos = mesh.geometry.attributes.position.array as Float32Array
        const speed = m._speed
        const zMin = m._zMin
        const zMax = m._zMax
        const zRange = zMax - zMin
        for (let i = 2; i < pos.length; i += 3) {
          pos[i] += speed * dt * 60
          if (pos[i] > 0) {
            pos[i] = zMin + Math.random() * zRange
            pos[i - 2] = (Math.random() - 0.5) * 400
            pos[i - 1] = (Math.random() - 0.5) * 200
          }
        }
        mesh.geometry.attributes.position.needsUpdate = true
      }

      // пульсация ярких звёзд
      for (const s of glowStars) {
        const spr = s as any
        const phase = spr._phase
        const speed = spr._speed
        spr.material.opacity = 0.4 + 0.5 * (0.5 + 0.5 * Math.sin(t * speed * 2 + phase))
      }

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const ww = container.clientWidth, hh = container.clientHeight
      camera.aspect = ww / hh; camera.updateProjectionMatrix()
      renderer.setSize(ww, hh)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}
