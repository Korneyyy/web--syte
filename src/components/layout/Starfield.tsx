"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    camera.position.z = 0

    // Белые звёзды (1500 шт)
    const starCount = 1500
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200
      positions[i + 1] = (Math.random() - 0.5) * 200
      positions[i + 2] = Math.random() * -200
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.25,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // Цветные звёзды (100 шт)
    const colorCount = 100
    const colorPos = new Float32Array(colorCount * 3)
    const colors = new Float32Array(colorCount * 3)
    for (let i = 0; i < colorCount * 3; i += 3) {
      colorPos[i] = (Math.random() - 0.5) * 300
      colorPos[i + 1] = (Math.random() - 0.5) * 300
      colorPos[i + 2] = Math.random() * -300
      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.35, 0.8, 0.5 + Math.random() * 0.3)
      colors[i] = c.r; colors[i + 1] = c.g; colors[i + 2] = c.b
    }
    const colorGeo = new THREE.BufferGeometry()
    colorGeo.setAttribute("position", new THREE.BufferAttribute(colorPos, 3))
    colorGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    const colorMat = new THREE.PointsMaterial({
      size: 0.45, transparent: true, opacity: 0.9,
      vertexColors: true, blending: THREE.AdditiveBlending,
    })
    const colorStars = new THREE.Points(colorGeo, colorMat)
    scene.add(colorStars)

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const p1 = stars.geometry.attributes.position.array as Float32Array
      const p2 = colorStars.geometry.attributes.position.array as Float32Array
      for (let i = 2; i < p1.length; i += 3) {
        p1[i] += 0.4
        if (p1[i] > 0) { p1[i] = -200; p1[i - 2] = (Math.random() - 0.5) * 200; p1[i - 1] = (Math.random() - 0.5) * 200 }
      }
      for (let i = 2; i < p2.length; i += 3) {
        p2[i] += 0.3
        if (p2[i] > 0) { p2[i] = -300; p2[i - 2] = (Math.random() - 0.5) * 300; p2[i - 1] = (Math.random() - 0.5) * 300 }
      }
      stars.geometry.attributes.position.needsUpdate = true
      colorStars.geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix()
      renderer.setSize(w, h)
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