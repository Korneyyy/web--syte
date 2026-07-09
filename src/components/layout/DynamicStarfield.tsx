"use client"

import dynamic from "next/dynamic"

const Starfield = dynamic(() => import("@/components/layout/Starfield"), { ssr: false })

export default function DynamicStarfield() {
  return <Starfield />
}
