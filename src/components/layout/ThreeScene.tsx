"use client"
import { motion } from "framer-motion"

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full hidden md:block"
        style={{
          background: 'radial-gradient(ellipse at center, rgb(101, 11, 197), transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  )
} 
