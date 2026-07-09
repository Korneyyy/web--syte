"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const ThreeScene = dynamic(() => import("@/components/layout/ThreeScene"), { ssr: false })

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ThreeScene />
      
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px] hidden md:block" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px] hidden md:block" />
      </div>

      <div className="relative z-10 w-full px-4 lg:pl-16 lg:pr-4 max-w-2xl mx-auto lg:ml-0 lg:mr-auto text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl font-bold leading-tight text-light md:text-5xl lg:text-6xl"
        >
          Разрабатываю сайты,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            которые работают
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg text-light/60 md:text-xl max-w-2xl"
        >
          Современные лендинги, корпоративные сайты и веб-приложения под ключ.
          Быстро, качественно, с душой.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4"
        >
          <Button
            size="lg"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Заказать сайт
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            Портфолио
          </Button>
        </motion.div>

        {/* Device image - mobile/tablet */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="block lg:hidden mt-8 w-full max-w-xs mx-auto lg:mx-0"
          style={{
            aspectRatio: '16 / 10',
            backgroundImage: 'url(/hero-devices.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Device image - desktop */}
      <div
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-full h-full max-w-2xl pointer-events-none"
        style={{
          backgroundImage: 'url(/hero-devices.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
        }}
      />
    </section>
  );
}

