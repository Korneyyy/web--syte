"use client"
import { motion } from "framer-motion"

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full hidden md:block"
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
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-auto h-full max-w-lg md:max-w-xl lg:max-w-2xl hidden lg:block"
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
