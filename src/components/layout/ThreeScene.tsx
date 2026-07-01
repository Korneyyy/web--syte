"use client"
import { motion } from "framer-motion"

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
        <motion.div
  className="absolute right-[10%] top-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full"
  style={{
    background: 'radial-gradient(ellipse at center, rgb(101, 11, 197), transparent 70%)',
    filter: 'blur(10px)',
  }}
  animate={{
    opacity: [0.7, 1, 0.5],
    scale: [1, 1.2, 1],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full max-w-lg md:max-w-xl lg:max-w-2xl"
        style={{
          backgroundImage: 'url(/hero-devices.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
        }}
      />
    </div>
  )
} 
