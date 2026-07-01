"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Palette,
  Zap,
  Smartphone,
  Search,
  HeartHandshake,
} from "lucide-react";
import { whyMeCards } from "@/data";
import { Section } from "@/components/ui/section";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Palette,
  Zap,
  Smartphone,
  Search,
  HeartHandshake,
};

export function WhyMe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section
      id="why-me"
      title="Почему выбирают меня"
      subtitle="Я делаю не просто сайты — я делаю инструменты для вашего бизнеса"
    >
      <div
        ref={ref}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {whyMeCards.map((card, index) => {
          const Icon = iconMap[card.icon];
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              {Icon && (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
              )}
              <h3 className="text-lg font-semibold text-light">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-light/60 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}